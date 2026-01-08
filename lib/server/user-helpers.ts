// lib/server/user-helpers.ts
"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { unstable_noStore } from 'next/cache';
import { initAdmin } from "@/components/firebase/firebaseAdmin";
import { getCachedUserByEmail } from "@/lib/firebase-cache";
import { revalidateUsers } from "@/lib/revalidate";
import { NexeraUser } from "@/components/types";
import { getFirestore } from "firebase-admin/firestore";

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
 * Creates a new user in Firebase
 * SERVER-ONLY function
 */
export async function createNewUser(
  email: string,
  name: string,
  clerkProfilePicture: string
): Promise<NexeraUser> {
  // Access headers to make this dynamic (required for crypto.randomUUID in Next.js 15+)
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
      badges: [{id : 'nex_004'}],
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

    await initAdmin();
    const db = getFirestore();
    const userRef = db.collection("TestUsers").doc(newUser.id);
    await userRef.set(newUser);

    // Note: Cache revalidation removed to prevent "unsupported during render" error
    // The new user is returned directly, so no cache revalidation needed in this flow

    console.log(`User ${userId} created successfully`);
    return newUser;
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
}

/**
 * Gets user data from Firebase, creates new user if doesn't exist
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

    // Initialize Firebase Admin
    await initAdmin();

    // Try to get existing user (cached query)
    let user = await getCachedUserByEmail(email);

    // If user doesn't exist, create new user
    if (!user) {
      console.log(`Creating new user for email: ${email}`);
      user = await createNewUser(
        email,
        clerkUser.fullName || "No Name",
        clerkUser.imageUrl || ""
      );
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