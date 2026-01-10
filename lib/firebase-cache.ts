/**
 * Firebase Cache Layer
 *
 * This file contains all cached Firebase queries using Next.js 15's Cache Components.
 * Each function uses the 'use cache' directive and cacheTag for selective invalidation.
 *
 * Cache durations:
 * - subjects, topics, badges: 1 hour (rarely change)
 * - notes: 30 minutes (moderate changes)
 * - users: 5 minutes (frequent updates)
 */

import { cacheTag, cacheLife } from "next/cache";
import { initAdmin } from "@/components/firebase/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";
import {
  nexSubject,
  nexTopic,
  nexNoteAbout,
  nexNoteData,
  NexeraUser,
  nexBadge,
} from "@/components/types";

// =========================================
//  SUBJECTS
// =========================================

/**
 * Get all subjects (cached for 1 hour)
 */
export async function getCachedSubjects(): Promise<nexSubject[]> {
  "use cache";
  cacheTag("subjects");
  cacheLife({ stale: 3600, revalidate: 7200, expire: 14400 }); // 1hr stale, 2hr revalidate, 4hr expire

  try {
    console.log("📖 Firebase Read: Fetching all subjects");

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db.collection("nexSubjects").get();

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as nexSubject)
    );
  } catch (error) {
    console.error("❌ Firebase Error (getCachedSubjects):", error);
    return []; // Return empty array on quota/error during build
  }
}

/**
 * Get a single subject by slug (cached for 1 hour)
 */
export async function getCachedSubjectBySlug(
  slug: string
): Promise<nexSubject | null> {
  "use cache";
  cacheTag("subjects", `subject-${slug}`);
  cacheLife({ stale: 3600, revalidate: 7200, expire: 14400 }); // 1hr stale, 2hr revalidate, 4hr expire

  try {
    console.log(`📖 Firebase Read: Fetching subject by slug: ${slug}`);

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db
      .collection("nexSubjects")
      .where("slug", "==", slug)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as nexSubject;
  } catch (error) {
    console.error("❌ Firebase Error (getCachedSubjectBySlug):", error);
    return null;
  }
}

/**
 * Get subjects by Creator ID (cached for 1 hour)
 */
export async function getCachedSubjectsByUserId(
  userId: string
): Promise<nexSubject[]> {
  "use cache";
  cacheTag("subjects", `subjects-user-${userId}`);
  cacheLife({ stale: 3600, revalidate: 7200, expire: 14400 });

  try {
    console.log(`📖 Firebase Read: Fetching subjects for user: ${userId}`);

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db
      .collection("nexSubjects")
      .where("createdBy", "==", userId)
      .get();

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as nexSubject)
    );
  } catch (error) {
    console.error("❌ Firebase Error (getCachedSubjectsByUserId):", error);
    return [];
  }
}

// =========================================
//  TOPICS
// =========================================

/**
 * Get all topics (cached for 1 hour)
 */
export async function getCachedTopics(): Promise<nexTopic[]> {
  "use cache";
  cacheTag("topics");
  cacheLife({ stale: 3600, revalidate: 7200, expire: 14400 }); // 1hr stale, 2hr revalidate, 4hr expire

  try {
    console.log("📖 Firebase Read: Fetching all topics");

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db.collection("nexNoteTopics").get();

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as nexTopic)
    );
  } catch (error) {
    console.error("❌ Firebase Error (getCachedTopics):", error);
    return []; // Return empty array on quota/error during build
  }
}

/**
 * Get topics by subject ID (cached for 1 hour)
 */
export async function getCachedTopicsBySubject(
  subjectId: string
): Promise<nexTopic[]> {
  "use cache";
  cacheTag("topics", `topics-subject-${subjectId}`);
  cacheLife({ stale: 3600, revalidate: 7200, expire: 14400 }); // 1hr stale, 2hr revalidate, 4hr expire

  try {
    console.log(`📖 Firebase Read: Fetching topics for subject: ${subjectId}`);

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db
      .collection("nexNoteTopics")
      .where("subjectID", "==", subjectId)
      .get();

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as nexTopic)
    );
  } catch (error) {
    console.error("❌ Firebase Error (getCachedTopicsBySubject):", error);
    return [];
  }
}

/**
 * Get topics by Creator ID (cached for 1 hour)
 */
export async function getCachedTopicsByUserId(
  userId: string
): Promise<nexTopic[]> {
  "use cache";
  cacheTag("topics", `topics-user-${userId}`);
  cacheLife({ stale: 3600, revalidate: 7200, expire: 14400 });

  try {
    console.log(`📖 Firebase Read: Fetching topics for user: ${userId}`);

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db
      .collection("nexNoteTopics")
      .where("createdBy", "==", userId)
      .get();

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as nexTopic)
    );
  } catch (error) {
    console.error("❌ Firebase Error (getCachedTopicsByUserId):", error);
    return [];
  }
}

// =========================================
//  NOTES
// =========================================

/**
 * Get all notes (cached for 30 minutes)
 */
export async function getCachedNotes(): Promise<nexNoteAbout[]> {
  "use cache";
  cacheTag("notes");
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 }); // 30min stale, 1hr revalidate, 2hr expire

  try {
    console.log("📖 Firebase Read: Fetching all notes");

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db.collection("management_notes").get();

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as nexNoteAbout)
    );
  } catch (error) {
    console.error("❌ Firebase Error (getCachedNotes):", error);
    return []; // Return empty array on quota/error during build
  }
}

/**
 * Get notes by topic IDs (cached for 30 minutes)
 */
export async function getCachedNotesByTopicIds(
  topicIds: string[]
): Promise<nexNoteAbout[]> {
  "use cache";
  // Create a deterministic tag from the topic IDs
  const sortedIds = [...topicIds].sort().join(",");
  cacheTag("notes", `notes-topics-${sortedIds}`);
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 }); // 30min stale, 1hr revalidate, 2hr expire

  if (topicIds.length === 0) return [];

  try {
    console.log(`📖 Firebase Read: Fetching notes for ${topicIds.length} topics`);

    await initAdmin();
    const db = getFirestore();

    // Firestore 'in' query supports max 10 items, so we batch if needed
    const batches: Promise<nexNoteAbout[]>[] = [];

    for (let i = 0; i < topicIds.length; i += 10) {
      const batch = topicIds.slice(i, i + 10);
      batches.push(
        db
          .collection("management_notes")
          .where("topicID", "in", batch)
          .get()
          .then((snapshot) =>
            snapshot.docs.map(
              (doc) =>
                ({
                  id: doc.id,
                  ...doc.data(),
                } as nexNoteAbout)
            )
          )
      );
    }

    const results = await Promise.all(batches);
    return results.flat();
  } catch (error) {
    console.error("❌ Firebase Error (getCachedNotesByTopicIds):", error);
    return [];
  }
}

/**
 * Get notes by Published User ID (cached for 30 minutes)
 */
export async function getCachedNotesByUserId(
  userId: string
): Promise<nexNoteAbout[]> {
  "use cache";
  cacheTag("notes", `notes-user-${userId}`);
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 });

  try {
    console.log(`📖 Firebase Read: Fetching notes for user: ${userId}`);

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db
      .collection("management_notes")
      .where("publishedBy", "==", userId)
      .get();

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as nexNoteAbout)
    );
  } catch (error) {
    console.error("❌ Firebase Error (getCachedNotesByUserId):", error);
    return [];
  }
}

/**
 * Get a single note by slug (cached for 30 minutes)
 */
export async function getCachedNoteBySlug(
  slug: string
): Promise<nexNoteAbout | null> {
  "use cache";
  cacheTag("notes", `note-slug-${slug}`);
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 });

  try {
    console.log(`📖 Firebase Read: Fetching note by slug: ${slug}`);

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db
      .collection("management_notes")
      .where("slug", "==", slug)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as nexNoteAbout;
  } catch (error) {
    console.error("❌ Firebase Error (getCachedNoteBySlug):", error);
    return null;
  }
}

// =========================================
//  NOTE DATA
// =========================================

/**
 * Get note data by ID (cached for 30 minutes)
 */
export async function getCachedNoteDataById(
  noteId: string
): Promise<nexNoteData | null> {
  "use cache";
  cacheTag("note-data", `note-data-${noteId}`);
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 }); // 30min stale, 1hr revalidate, 2hr expire

  try {
    console.log(`📖 Firebase Read: Fetching note data for ID: ${noteId}`);

    await initAdmin();
    const db = getFirestore();
    const doc = await db.collection("nexNotePart2").doc(noteId).get();

    if (!doc.exists) return null;

    return {
      noteId: doc.id,
      ...doc.data(),
    } as nexNoteData;
  } catch (error) {
    console.error("❌ Firebase Error (getCachedNoteDataById):", error);
    return null;
  }
}

/**
 * Get all note data (cached for 30 minutes)
 */
export async function getCachedNoteData(): Promise<nexNoteData[]> {
  "use cache";
  cacheTag("note-data");
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 }); // 30min stale, 1hr revalidate, 2hr expire

  try {
    console.log("📖 Firebase Read: Fetching all note data");

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db.collection("nexNotePart2").get();

    return snapshot.docs.map(
      (doc) =>
        ({
          noteId: doc.id,
          ...doc.data(),
        } as nexNoteData)
    );
  } catch (error) {
    console.error("❌ Firebase Error (getCachedNoteData):", error);
    return [];
  }
}

// =========================================
//  USERS
// =========================================

/**
 * Get all users (cached for 5 minutes)
 */
export async function getCachedUsers(): Promise<NexeraUser[]> {
  "use cache";
  cacheTag("users");
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 }); // 30min stale, 1hr revalidate, 2hr expire

  try {
    console.log("📖 Firebase Read: Fetching all users");

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db.collection("TestUsers").get();

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as NexeraUser)
    );
  } catch (error) {
    console.error("❌ Firebase Error (getCachedUsers):", error);
    return []; // Return empty array on quota/error during build
  }
}

/**
 * Get all users with minimal data (id and name only) - for display purposes
 */
export async function getCachedUsersMinimal(): Promise<
  { id: string; name: string }[]
> {
  "use cache";
  cacheTag("users", "users-minimal");
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 });

  try {
    console.log("📖 Firebase Read: Fetching all users (minimal)");

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db.collection("TestUsers").get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name as string,
    }));
  } catch (error) {
    console.error("❌ Firebase Error (getCachedUsersMinimal):", error);
    return [];
  }
}

/**
 * Get a single user by ID (cached for 5 minutes)
 */
export async function getCachedUserById(
  id: string
): Promise<NexeraUser | null> {
  "use cache";
  cacheTag("users", `user-${id}`);
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 }); // 30min stale, 1hr revalidate, 2hr expire

  try {
    console.log(`📖 Firebase Read: Fetching user by ID: ${id}`);

    await initAdmin();
    const db = getFirestore();
    const doc = await db.collection("TestUsers").doc(id).get();

    if (!doc.exists) return null;

    return {
      id: doc.id,
      ...doc.data(),
    } as NexeraUser;
  } catch (error) {
    console.error("❌ Firebase Error (getCachedUserById):", error);
    return null;
  }
}

/**
 * Get a single user by email (cached for 5 minutes)
 * Note: This is a query, so it's more expensive than ID-based lookup
 */
export async function getCachedUserByEmail(
  email: string
): Promise<NexeraUser | null> {
  "use cache";
  cacheTag("users", `user-email-${email}`);
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 }); // 30min stale, 1hr revalidate, 2hr expire

  try {
    console.log(`📖 Firebase Read: Fetching user by email: ${email}`);

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db
      .collection("TestUsers")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as NexeraUser;
  } catch (error) {
    console.error("❌ Firebase Error (getCachedUserByEmail):", error);
    return null;
  }
}

// =========================================
//  BADGES
// =========================================

/**
 * Get all badges (cached for 1 hour)
 */
export async function getCachedBadges(): Promise<nexBadge[]> {
  "use cache";
  cacheTag("badges");
  cacheLife({ stale: 14400, revalidate: 28800, expire: 57600 }); // 4hr stale, 8hr revalidate, 16hr expire

  try {
    console.log("📖 Firebase Read: Fetching all badges");

    await initAdmin();
    const db = getFirestore();
    const snapshot = await db.collection("nexBadges").get();

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as nexBadge)
    );
  } catch (error) {
    console.error("❌ Firebase Error (getCachedBadges):", error);
    return []; // Return empty array on quota/error during build
  }
}

/**
 * Get badges by IDs (cached for 1 hour)
 */
export async function getCachedBadgesByIds(
  badgeIds: string[]
): Promise<nexBadge[]> {
  "use cache";
  const sortedIds = [...badgeIds].sort().join(",");
  cacheTag("badges", `badges-${sortedIds}`);
  cacheLife({ stale: 14400, revalidate: 28800, expire: 57600 }); // 4hr stale, 8hr revalidate, 16hr expire

  if (badgeIds.length === 0) return [];

  try {
    console.log(`📖 Firebase Read: Fetching ${badgeIds.length} badges`);

    await initAdmin();
    const db = getFirestore();

    // Firestore 'in' query supports max 10 items
    const batches: Promise<nexBadge[]>[] = [];

    for (let i = 0; i < badgeIds.length; i += 10) {
      const batch = badgeIds.slice(i, i + 10);
      batches.push(
        db
          .collection("nexBadges")
          .where("__name__", "in", batch)
          .get()
          .then((snapshot) =>
            snapshot.docs.map(
              (doc) =>
                ({
                  id: doc.id,
                  ...doc.data(),
                } as nexBadge)
            )
          )
      );
    }

    const results = await Promise.all(batches);
    return results.flat();
  } catch (error) {
    console.error("❌ Firebase Error (getCachedBadgesByIds):", error);
    return [];
  }
}
