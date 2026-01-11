"use server";

import { initAdmin } from "@/components/firebase/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Get count of documents in each collection
 * Server action for fetching cache statistics
 */
export async function getCacheCounts(): Promise<{
  subjects: number;
  topics: number;
  notes: number;
  users: number;
  badges: number;
}> {
  try {
    await initAdmin();
    const db = getFirestore();

    // Run counts in parallel
    const [subjects, topics, notes, users, badges] = await Promise.all([
      db.collection("nexSubjects").count().get(),
      db.collection("nexNoteTopics").count().get(),
      db.collection("management_notes").count().get(),
      db.collection("TestUsers").count().get(),
      db.collection("nexBadges").count().get(),
    ]);

    return {
      subjects: subjects.data().count,
      topics: topics.data().count,
      notes: notes.data().count,
      users: users.data().count,
      badges: badges.data().count,
    };
  } catch (error) {
    console.error("❌ Firebase Error (getCacheCounts):", error);
    return { subjects: 0, topics: 0, notes: 0, users: 0, badges: 0 };
  }
}
