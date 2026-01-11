// lib/server/user-helpers.ts
"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { unstable_noStore } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { getCachedUserByEmail } from "@/lib/mongodb-cache";
import { revalidateUsers } from "@/lib/revalidate";
import { NexeraUser } from "@/components/types";
import { nexBadges } from "@/public/json/badges";

/**
 * Fetches an image from a URL and uploads it to Supabase
 * SERVER-ONLY function
 */
async function uploadProfilePictureFromUrl(
  imageUrl: string,
  userId: string
): Promise<string> {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase using server-side approach
    const { createClient } = await import("@supabase/supabase-js");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for server
    );

    const fileName = `profile_pic3/${userId}/avatar.png`;

    const { data, error } = await supabase.storage
      .from("users")
      .upload(fileName, buffer, {
        contentType: blob.type || "image/png",
        upsert: true,
      });

    if (error) {
      console.error("Error uploading to Supabase:", error);
      return "";
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("users")
      .getPublicUrl(fileName);

    return urlData.publicUrl || "";
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return "";
  }
}

/**
 * Creates a new user in MongoDB
 * SERVER-ONLY function
 */
export async function createNewUser(
  email: string,
  name: string,
  clerkProfilePicture: string
): Promise<NexeraUser> {
  // Access headers to make this dynamic
  await headers();

  const userId = crypto.randomUUID();
  let profilePicture = "";

  // Try to upload Clerk profile picture to Supabase if it exists
  if (clerkProfilePicture && clerkProfilePicture.startsWith("http")) {
    console.log(`Uploading profile picture for user ${userId}...`);
    profilePicture = await uploadProfilePictureFromUrl(
      clerkProfilePicture,
      userId
    );

    if (profilePicture) {
      console.log(`Successfully uploaded profile picture: ${profilePicture}`);
    } else {
      console.log(`Failed to upload, using Clerk URL as fallback`);
      profilePicture = clerkProfilePicture; // Fallback to Clerk URL
    }
  }

  try {
    const newUser: NexeraUser = {
      email,
      name: name || "No Name",
      profilePicture,
      password: "",
      joinedAt: new Date().toISOString(),
      bio: "",
      badges: [
        {
          id: "nexStart",
        },
      ],
      academic: {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        studyingYear: 0,
        graduationYear: 0,
      },
      data: {
        notes: { favorites: [], uploads: [] },
        projects: { favorites: [], contributions: [] },
        applications: { favorites: [], uploads: [] },
      },
      headline: "",
      id: userId,
      location: "",
      status: "active",
      lastLogin: new Date().toISOString(),
    };

    // Save to MongoDB
    await connectDB();
    const createdUser = new User(newUser);
    await createdUser.save();

    console.log(`User ${userId} created successfully in MongoDB`);
    return newUser;
  } catch (error: any) {
    // Handle duplicate key error (E11000) - race condition
    if (error.code === 11000) {
      console.log(`Duplicate key error for ${email}. User already exists. Fetching existing user...`);
      await connectDB();
      const existingUser = await User.findOne({ email }).lean();
      
      if (existingUser) {
        // Serialize the user object for Next.js (Client Components)
        // Convert _id to string if needed, ensure id exists, and remove _id (ObjectId)
        const serializedUser = {
          ...existingUser,
          id: existingUser.id || (existingUser._id ? existingUser._id.toString() : ""),
          _id: undefined, // Remove _id to avoid "Only plain objects" error
        };
        
        // Remove _id key completely
        delete (serializedUser as any)._id;

        return serializedUser as unknown as NexeraUser;
      }
    }

    console.error("Error creating new user:", error);
    throw error;
  }
}

/**
 * Gets user data from MongoDB, creates new user if doesn't exist
 * SERVER-ONLY function
 */
export async function getUserFromClerk(): Promise<NexeraUser | null> {
  unstable_noStore(); // Opt out of caching for auth functions
  try {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    const clerkUser = await currentUser();

    if (!clerkUser?.primaryEmailAddress?.emailAddress) {
      return null;
    }

    const email = clerkUser.primaryEmailAddress.emailAddress;

    // Try to get existing user (cached query from MongoDB)
    let user = await getCachedUserByEmail(email);

    // If user doesn't exist in cache, try one more time directly from DB before creating
    if (!user) {
        await connectDB();
        user = await User.findOne({ email }).lean<NexeraUser>();

        if(user){
             return {
                ...user,
                id: (user as any)._id?.toString() || user.id,
                _id: undefined,
            } as NexeraUser;
        }
    }

    // If still no user, create new user
    if (!user) {
      console.log(`Creating new user for email: ${email}`);
      try {
        user = await createNewUser(
          email,
          clerkUser.fullName || "No Name",
          clerkUser.imageUrl || ""
        );
      } catch (error: any) {
        // Handle race condition/duplicate key error
        if (error.code === 11000 || error.message?.includes("E11000")) {
          console.log("User already exists (race condition), fetching from DB...");
          await connectDB();
          const existingUser = await User.findOne({ email }).lean<NexeraUser>();
          if (existingUser) {
            return {
              ...existingUser,
              id: (existingUser as any)._id?.toString() || existingUser.id,
              _id: undefined,
            } as NexeraUser;
          }
        }
        throw error;
      }
    } else {
      console.log(`User found: ${user.id}`);
    }
    console.log(user);
    return user;
  } catch (error) {
    // Silently return null during prerendering
    return null;
  }
}
