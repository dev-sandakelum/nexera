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

import { cacheTag, cacheLife } from 'next/cache';
import { initAdmin } from '@/components/firebase/firebaseAdmin';
import { getFirestore } from 'firebase-admin/firestore';
import { 
  nexSubject, 
  nexTopic, 
  nexNoteAbout, 
  NexeraUser, 
  nexBadge 
} from '@/components/types';

// =========================================
//  SUBJECTS
// =========================================

/**
 * Get all subjects (cached for 1 hour)
 */
export async function getCachedSubjects(): Promise<nexSubject[]> {
  'use cache';
  cacheTag('subjects');
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 }); // 30min stale, 1hr revalidate, 2hr expire

  console.log('📖 Firebase Read: Fetching all subjects');
  
  await initAdmin();
  const db = getFirestore();
  const snapshot = await db.collection('nexSubjects').get();
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as nexSubject));
}

/**
 * Get a single subject by slug (cached for 1 hour)
 */
export async function getCachedSubjectBySlug(slug: string): Promise<nexSubject | null> {
  'use cache';
  cacheTag('subjects', `subject-${slug}`);
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 });

  console.log(`📖 Firebase Read: Fetching subject by slug: ${slug}`);
  
  await initAdmin();
  const db = getFirestore();
  const snapshot = await db.collection('nexSubjects').where('slug', '==', slug).get();
  
  if (snapshot.empty) return null;
  
  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as nexSubject;
}

// =========================================
//  TOPICS
// =========================================

/**
 * Get all topics (cached for 1 hour)
 */
export async function getCachedTopics(): Promise<nexTopic[]> {
  'use cache';
  cacheTag('topics');
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 });

  console.log('📖 Firebase Read: Fetching all topics');
  
  await initAdmin();
  const db = getFirestore();
  const snapshot = await db.collection('nexNoteTopics').get();
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as nexTopic));
}

/**
 * Get topics by subject ID (cached for 1 hour)
 */
export async function getCachedTopicsBySubject(subjectId: string): Promise<nexTopic[]> {
  'use cache';
  cacheTag('topics', `topics-subject-${subjectId}`);
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 });

  console.log(`📖 Firebase Read: Fetching topics for subject: ${subjectId}`);
  
  await initAdmin();
  const db = getFirestore();
  const snapshot = await db.collection('nexNoteTopics').where('subjectID', '==', subjectId).get();
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as nexTopic));
}

// =========================================
//  NOTES
// =========================================

/**
 * Get all notes (cached for 30 minutes)
 */
export async function getCachedNotes(): Promise<nexNoteAbout[]> {
  'use cache';
  cacheTag('notes');
  cacheLife({ stale: 900, revalidate: 1800, expire: 3600 }); // 15min stale, 30min revalidate, 1hr expire

  console.log('📖 Firebase Read: Fetching all notes');
  
  await initAdmin();
  const db = getFirestore();
  const snapshot = await db.collection('management_notes').get();
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as nexNoteAbout));
}

/**
 * Get notes by topic IDs (cached for 30 minutes)
 */
export async function getCachedNotesByTopicIds(topicIds: string[]): Promise<nexNoteAbout[]> {
  'use cache';
  // Create a deterministic tag from the topic IDs
  const sortedIds = [...topicIds].sort().join(',');
  cacheTag('notes', `notes-topics-${sortedIds}`);
  cacheLife({ stale: 900, revalidate: 1800, expire: 3600 });

  if (topicIds.length === 0) return [];

  console.log(`📖 Firebase Read: Fetching notes for ${topicIds.length} topics`);
  
  await initAdmin();
  const db = getFirestore();
  
  // Firestore 'in' query supports max 10 items, so we batch if needed
  const batches: Promise<nexNoteAbout[]>[] = [];
  
  for (let i = 0; i < topicIds.length; i += 10) {
    const batch = topicIds.slice(i, i + 10);
    batches.push(
      db.collection('management_notes')
        .where('topicID', 'in', batch)
        .get()
        .then((snapshot) => 
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          } as nexNoteAbout))
        )
    );
  }
  
  const results = await Promise.all(batches);
  return results.flat();
}

// =========================================
//  USERS
// =========================================

/**
 * Get all users (cached for 5 minutes)
 */
export async function getCachedUsers(): Promise<NexeraUser[]> {
  'use cache';
  cacheTag('users');
  cacheLife({ stale: 150, revalidate: 300, expire: 600 }); // 2.5min stale, 5min revalidate, 10min expire

  console.log('📖 Firebase Read: Fetching all users');
  
  await initAdmin();
  const db = getFirestore();
  const snapshot = await db.collection('TestUsers').get();
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as NexeraUser));
}

/**
 * Get all users with minimal data (id and name only) - for display purposes
 */
export async function getCachedUsersMinimal(): Promise<{ id: string; name: string }[]> {
  'use cache';
  cacheTag('users', 'users-minimal');
  cacheLife({ stale: 150, revalidate: 300, expire: 600 });

  console.log('📖 Firebase Read: Fetching all users (minimal)');
  
  await initAdmin();
  const db = getFirestore();
  const snapshot = await db.collection('TestUsers').get();
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name as string,
  }));
}

/**
 * Get a single user by ID (cached for 5 minutes)
 */
export async function getCachedUserById(id: string): Promise<NexeraUser | null> {
  'use cache';
  cacheTag('users', `user-${id}`);
  cacheLife({ stale: 150, revalidate: 300, expire: 600 });

  console.log(`📖 Firebase Read: Fetching user by ID: ${id}`);
  
  await initAdmin();
  const db = getFirestore();
  const doc = await db.collection('TestUsers').doc(id).get();
  
  if (!doc.exists) return null;
  
  return {
    id: doc.id,
    ...doc.data(),
  } as NexeraUser;
}

/**
 * Get a single user by email (cached for 5 minutes)
 * Note: This is a query, so it's more expensive than ID-based lookup
 */
export async function getCachedUserByEmail(email: string): Promise<NexeraUser | null> {
  'use cache';
  cacheTag('users', `user-email-${email}`);
  cacheLife({ stale: 150, revalidate: 300, expire: 600 });

  console.log(`📖 Firebase Read: Fetching user by email: ${email}`);
  
  await initAdmin();
  const db = getFirestore();
  const snapshot = await db.collection('TestUsers').where('email', '==', email).get();
  
  if (snapshot.empty) return null;
  
  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as NexeraUser;
}

// =========================================
//  BADGES
// =========================================

/**
 * Get all badges (cached for 1 hour)
 */
export async function getCachedBadges(): Promise<nexBadge[]> {
  'use cache';
  cacheTag('badges');
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 });

  console.log('📖 Firebase Read: Fetching all badges');
  
  await initAdmin();
  const db = getFirestore();
  const snapshot = await db.collection('nexBadges').get();
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as nexBadge));
}

/**
 * Get badges by IDs (cached for 1 hour)
 */
export async function getCachedBadgesByIds(badgeIds: string[]): Promise<nexBadge[]> {
  'use cache';
  const sortedIds = [...badgeIds].sort().join(',');
  cacheTag('badges', `badges-${sortedIds}`);
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 });

  if (badgeIds.length === 0) return [];

  console.log(`📖 Firebase Read: Fetching ${badgeIds.length} badges`);
  
  await initAdmin();
  const db = getFirestore();
  
  // Firestore 'in' query supports max 10 items
  const batches: Promise<nexBadge[]>[] = [];
  
  for (let i = 0; i < badgeIds.length; i += 10) {
    const batch = badgeIds.slice(i, i + 10);
    batches.push(
      db.collection('nexBadges')
        .where('__name__', 'in', batch)
        .get()
        .then((snapshot) =>
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          } as nexBadge))
        )
    );
  }
  
  const results = await Promise.all(batches);
  return results.flat();
}
