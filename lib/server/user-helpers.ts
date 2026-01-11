// lib/server/user-helpers.ts
"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { unstable_noStore } from "next/cache";
import { initAdmin } from "@/components/firebase/firebaseAdmin";
import { getCachedUserByEmail } from "@/lib/firebase-cache";
import { revalidateUsers } from "@/lib/revalidate";
import { NexeraUser } from "@/components/types";
import { getFirestore } from "firebase-admin/firestore";
import { nexBadges } from "@/public/json/badges";

/**
 * In-memory map to deduplicate concurrent user creation requests.
 * Key: email, Value: Promise resolving to the created/existing user.
 * This prevents race conditions within the same server instance.
 */
const pendingUserCreations = new Map<string, Promise<NexeraUser>>();

/**
 * Generates a deterministic user ID from email.
 * This ensures the same email always produces the same document ID,
 * preventing duplicate documents at the database level.
 */
function generateDeterministicUserId(email: string): string {
  // Use a simple hash for deterministic ID generation
  // Format: "user_" + base64 encoded email (URL-safe)
  const normalizedEmail = email.toLowerCase().trim();
  const base64 = Buffer.from(normalizedEmail).toString("base64url");
  // Firestore doc IDs can't have certain chars, base64url is safe
  return `user_${base64}`;
}

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
 * Gets or creates a user atomically using Firestore transactions.
 * Uses deterministic document ID based on email to guarantee uniqueness.
 * SERVER-ONLY function
 */
async function getOrCreateUserAtomic(
  email: string,
  name: string,
  clerkProfilePicture: string
): Promise<NexeraUser> {
  // Access headers to make this dynamic (required for Next.js 15+)
  await headers();

  await initAdmin();
  const db = getFirestore();
  
  // Generate deterministic ID from email - same email = same document ID
  const userId = generateDeterministicUserId(email);
  const userRef = db.collection("TestUsers").doc(userId);

  // Use Firestore transaction for atomic check-and-create
  return await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(userRef);

    // If user already exists, return them (no duplicate created)
    if (doc.exists) {
      console.log(`User already exists: ${userId}`);
      return {
        id: doc.id,
        ...doc.data(),
      } as NexeraUser;
    }

    // User doesn't exist - create new user
    console.log(`Creating new user with deterministic ID: ${userId}`);

    // Upload profile picture
    let profilePicture = "";
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
        profilePicture = clerkProfilePicture;
      }
    }

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

    transaction.set(userRef, newUser);
    console.log(`User ${userId} created successfully`);
    return newUser;
  });
}

/**
 * Creates a new user in Firebase (legacy function for backwards compatibility)
 * @deprecated Use getOrCreateUserAtomic instead for duplicate-safe creation
 * SERVER-ONLY function
 */
export async function createNewUser(
  email: string,
  name: string,
  clerkProfilePicture: string
): Promise<NexeraUser> {
  // Delegate to the atomic version
  return getOrCreateUserAtomic(email, name, clerkProfilePicture);
}

/**
 * Gets user data from Firebase, creates new user if doesn't exist.
 * Uses atomic operations and request deduplication to prevent duplicates.
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

    if (user) {
      console.log(`User found in cache: ${user.id}`);
      return user;
    }

    // User not in cache - need to get or create atomically
    // Check if there's already a pending creation for this email (deduplication)
    const existingPromise = pendingUserCreations.get(email);
    if (existingPromise) {
      console.log(`Waiting for existing creation promise for: ${email}`);
      return await existingPromise;
    }

    // No pending creation - start atomic get-or-create
    console.log(`Starting atomic get-or-create for: ${email}`);
    const creationPromise = getOrCreateUserAtomic(
      email,
      clerkUser.fullName || "No Name",
      clerkUser.imageUrl || ""
    );

    // Add to pending map to deduplicate concurrent requests
    pendingUserCreations.set(email, creationPromise);

    try {
      user = await creationPromise;
      console.log(`User ready: ${user.id}`);
      return user;
    } finally {
      // Clean up pending map
      pendingUserCreations.delete(email);
    }
  } catch (error) {
    console.error("Error in getUserFromClerk:", error);
    // Silently return null during prerendering
    return null;
  }
}
