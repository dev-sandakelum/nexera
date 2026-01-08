/**
 * Cache Revalidation Helpers
 * 
 * This file contains functions to invalidate cached data when mutations occur.
 * Call these functions after any data modification (create, update, delete).
 * 
 * Usage:
 * - After creating/updating/deleting a note: await revalidateNotes()
 * - After user profile update: await revalidateUsers()
 * - Nuclear option (clear everything): await revalidateAll()
 * 
 * Note: Using { expire: 0 } for immediate invalidation.
 * This ensures the very next request fetches fresh data (critical for CRUD apps).
 */

'use server';

import { revalidateTag } from 'next/cache';

// =========================================
//  SUBJECTS
// =========================================

/**
 * Revalidate all subject-related caches
 * Call after creating, updating, or deleting a subject
 */
export async function revalidateSubjects(slug?: string): Promise<void> {
  console.log('🔄 Cache Revalidation: Clearing subjects cache');
  
  // { expire: 0 } forces immediate expiration (no stale data served)
  revalidateTag('subjects', { expire: 0 });
  
  if (slug) {
    revalidateTag(`subject-${slug}`, { expire: 0 });
  }
}

// =========================================
//  TOPICS
// =========================================

/**
 * Revalidate all topic-related caches
 * Call after creating, updating, or deleting a topic
 */
export async function revalidateTopics(subjectId?: string): Promise<void> {
  console.log('🔄 Cache Revalidation: Clearing topics cache');
  
  revalidateTag('topics', { expire: 0 });
  
  if (subjectId) {
    revalidateTag(`topics-subject-${subjectId}`, { expire: 0 });
  }
}

// =========================================
//  NOTES
// =========================================

/**
 * Revalidate all note-related caches
 * Call after creating, updating, or deleting a note
 */
export async function revalidateNotes(topicIds?: string[]): Promise<void> {
  console.log('🔄 Cache Revalidation: Clearing notes cache');
  
  revalidateTag('notes', { expire: 0 });
  
  if (topicIds && topicIds.length > 0) {
    const sortedIds = [...topicIds].sort().join(',');
    revalidateTag(`notes-topics-${sortedIds}`, { expire: 0 });
  }
}

// =========================================
//  USERS
// =========================================

/**
 * Revalidate all user-related caches
 * Call after user profile updates, badge changes, etc.
 */
export async function revalidateUsers(userId?: string, email?: string): Promise<void> {
  console.log('🔄 Cache Revalidation: Clearing users cache');
  
  revalidateTag('users', { expire: 0 });
  revalidateTag('users-minimal', { expire: 0 });
  
  if (userId) {
    revalidateTag(`user-${userId}`, { expire: 0 });
  }
  
  if (email) {
    revalidateTag(`user-email-${email}`, { expire: 0 });
  }
}

// =========================================
//  BADGES
// =========================================

/**
 * Revalidate all badge-related caches
 * Call after creating, updating, or deleting a badge
 */
export async function revalidateBadges(badgeIds?: string[]): Promise<void> {
  console.log('🔄 Cache Revalidation: Clearing badges cache');
  
  revalidateTag('badges', { expire: 0 });
  
  if (badgeIds && badgeIds.length > 0) {
    const sortedIds = [...badgeIds].sort().join(',');
    revalidateTag(`badges-${sortedIds}`, { expire: 0 });
  }
}

// =========================================
//  UTILITY
// =========================================

/**
 * Nuclear option: Revalidate ALL caches
 * Use sparingly - only when you need to clear everything
 */
export async function revalidateAll(): Promise<void> {
  console.log('🔄 Cache Revalidation: Clearing ALL caches');
  
  revalidateTag('subjects', { expire: 0 });
  revalidateTag('topics', { expire: 0 });
  revalidateTag('notes', { expire: 0 });
  revalidateTag('users', { expire: 0 });
  revalidateTag('users-minimal', { expire: 0 });
  revalidateTag('badges', { expire: 0 });
}

/**
 * Immediately expire a specific tag
 */
export async function expireTagImmediately(tag: string): Promise<void> {
  console.log(`🔄 Cache Revalidation: Immediately expiring tag: ${tag}`);
  revalidateTag(tag, { expire: 0 });
}
