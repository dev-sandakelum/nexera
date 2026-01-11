/**
 * MongoDB Cache Layer
 *
 * This file contains all cached MongoDB queries using Next.js 15's Cache Components.
 * Each function uses the 'use cache' directive and cacheTag for selective invalidation.
 *
 * Cache durations:
 * - subjects, topics, badges: 1 hour (rarely change)
 * - notes: 30 minutes (moderate changes)
 * - users: 5 minutes (frequent updates)
 */

import { cacheTag, cacheLife } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import Subject from "@/lib/models/Subject";
import Topic from "@/lib/models/Topic";
import Note from "@/lib/models/Note";
import NoteData from "@/lib/models/NoteData";
import Badge from "@/lib/models/Badge";
import type {
  nexSubject,
  nexTopic,
  nexNoteAbout,
  nexNoteData,
  NexeraUser,
  nexBadge,
} from "@/components/types";

// Helper to recursively remove _id from objects and arrays
function sanitizeMongoObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeMongoObject);
  }
  if (obj !== null && typeof obj === "object") {
    // If it has a toJSON method (like a Mongoose doc), call it first
    if (typeof obj.toJSON === "function") {
      obj = obj.toJSON();
    }
    
    // Destructure to remove _id
    const { _id, ...rest } = obj;
    
    // Recursively sanitize all properties
    const sanitized: any = {};
    for (const key in rest) {
      sanitized[key] = sanitizeMongoObject(rest[key]);
    }
    
    // Ensure id is present if _id was present (and id is missing)
    if (!sanitized.id && _id) {
       sanitized.id = _id.toString();
    }
    
    return sanitized;
  }
  return obj;
}

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
    console.log("📖 MongoDB Read: Fetching all subjects");

    await connectDB();
    const subjects = await Subject.find().lean<nexSubject[]>();

    return subjects.map((sub) => ({
      ...sub,
      id: (sub as any)._id?.toString() || sub.id,
      _id: undefined,
    })) as nexSubject[];
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedSubjects):", error);
    return []; // Return empty array on error during build
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
    console.log(`📖 MongoDB Read: Fetching subject by slug: ${slug}`);

    await connectDB();
    const subject = await Subject.findOne({ slug }).lean<nexSubject>();

    if (!subject) return null;

    return {
      ...subject,
      id: (subject as any)._id?.toString() || subject.id,
      _id: undefined,
    } as nexSubject;
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedSubjectBySlug):", error);
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
    console.log(`📖 MongoDB Read: Fetching subjects for user: ${userId}`);

    await connectDB();
    const subjects = await Subject.find({ createdBy: userId }).lean<nexSubject[]>();

    return subjects.map((sub) => ({
      ...sub,
      id: (sub as any)._id?.toString() || sub.id,
      _id: undefined,
    })) as nexSubject[];
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedSubjectsByUserId):", error);
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
    console.log("📖 MongoDB Read: Fetching all topics");

    await connectDB();
    const topics = await Topic.find().lean<nexTopic[]>();

    return topics.map((topic) => ({
      ...topic,
      id: (topic as any)._id?.toString() || topic.id,
      _id: undefined,
    })) as nexTopic[];
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedTopics):", error);
    return []; // Return empty array on error during build
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
    console.log(`📖 MongoDB Read: Fetching topics for subject: ${subjectId}`);

    await connectDB();
    const topics = await Topic.find({ subjectID: subjectId }).lean<nexTopic[]>();

    return topics.map((topic) => ({
      ...topic,
      id: (topic as any)._id?.toString() || topic.id,
      _id: undefined,
    })) as nexTopic[];
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedTopicsBySubject):", error);
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
    console.log(`📖 MongoDB Read: Fetching topics for user: ${userId}`);

    await connectDB();
    const topics = await Topic.find({ createdBy: userId }).lean<nexTopic[]>();

    return topics.map((topic) => ({
      ...topic,
      id: (topic as any)._id?.toString() || topic.id,
      _id: undefined,
    })) as nexTopic[];
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedTopicsByUserId):", error);
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
    console.log("📖 MongoDB Read: Fetching all notes");

    await connectDB();
    const notes = await Note.find().lean<nexNoteAbout[]>();

    return notes.map((note) => ({
      ...note,
      id: (note as any)._id?.toString() || note.id,
      _id: undefined,
    })) as nexNoteAbout[];
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedNotes):", error);
    return []; // Return empty array on error during build
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
    console.log(`📖 MongoDB Read: Fetching notes for ${topicIds.length} topics`);

    await connectDB();
    const notes = await Note.find({ topicID: { $in: topicIds } }).lean<nexNoteAbout[]>();

    return notes.map((note) => ({
      ...note,
      id: (note as any)._id?.toString() || note.id,
      _id: undefined,
    })) as nexNoteAbout[];
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedNotesByTopicIds):", error);
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
    console.log(`📖 MongoDB Read: Fetching notes for user: ${userId}`);

    await connectDB();
    const notes = await Note.find({ publishedBy: userId }).lean<nexNoteAbout[]>();

    return notes.map((note) => ({
      ...note,
      id: (note as any)._id?.toString() || note.id,
      _id: undefined,
    })) as nexNoteAbout[];
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedNotesByUserId):", error);
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
    console.log(`📖 MongoDB Read: Fetching note by slug: ${slug}`);

    await connectDB();
    const note = await Note.findOne({ slug }).lean<nexNoteAbout>();

    if (!note) return null;

    return {
      ...note,
      id: (note as any)._id?.toString() || note.id,
      _id: undefined,
    } as nexNoteAbout;
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedNoteBySlug):", error);
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
    console.log(`📖 MongoDB Read: Fetching note data for ID: ${noteId}`);

    await connectDB();
    const noteData = await NoteData.findOne({ noteId }).lean<nexNoteData>();

    if (!noteData) return null;

    return {
      ...noteData,
      _id: undefined,
    } as nexNoteData;
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedNoteDataById):", error);
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
    console.log("📖 MongoDB Read: Fetching all note data");

    await connectDB();
    const noteData = await NoteData.find().lean<nexNoteData[]>();

    return noteData.map((data) => ({
      ...data,
      _id: undefined,
    })) as nexNoteData[];
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedNoteData):", error);
    return [];
  }
}

// =========================================
//  USERS
// =========================================

/**
 * Get all users (cached for 30 minutes)
 */
export async function getCachedUsers(): Promise<NexeraUser[]> {
  "use cache";
  cacheTag("users");
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 }); // 30min stale, 1hr revalidate, 2hr expire

  try {
    console.log("📖 MongoDB Read: Fetching all users");

    await connectDB();
    const users = await User.find().lean<NexeraUser[]>();

    return users.map(user => sanitizeMongoObject(user)) as NexeraUser[];
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedUsers):", error);
    return []; // Return empty array on error during build
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
    console.log("📖 MongoDB Read: Fetching all users (minimal)");

    await connectDB();
    const users = await User.find().select("name").lean();

    return users.map((user) => ({
      id: user.id || user._id?.toString() || "",
      name: user.name,
    }));
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedUsersMinimal):", error);
    return [];
  }
}

/**
 * Get a single user by ID (cached for 30 minutes)
 */
export async function getCachedUserById(
  id: string
): Promise<NexeraUser | null> {
  "use cache";
  cacheTag("users", `user-${id}`);
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 }); // 30min stale, 1hr revalidate, 2hr expire

  try {
    console.log(`📖 MongoDB Read: Fetching user by ID: ${id}`);

    await connectDB();
    const user = await User.findById(id).lean<NexeraUser>();

    if (!user) return null;

    return sanitizeMongoObject(user) as NexeraUser;
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedUserById):", error);
    return null;
  }
}

/**
 * Get a single user by email (cached for 30 minutes)
 * Note: This is a query, so it's more expensive than ID-based lookup
 */
export async function getCachedUserByEmail(
  email: string
): Promise<NexeraUser | null> {
  "use cache";
  cacheTag("users", `user-email-${email}`);
  cacheLife({ stale: 1800, revalidate: 3600, expire: 7200 }); // 30min stale, 1hr revalidate, 2hr expire

  try {
    console.log(`📖 MongoDB Read: Fetching user by email: ${email}`);

    await connectDB();
    const user = await User.findOne({ email }).lean<NexeraUser>();

    if (!user) return null;

    return sanitizeMongoObject(user) as NexeraUser;
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedUserByEmail):", error);
    return null;
  }
}

// =========================================
//  BADGES
// =========================================

/**
 * Get all badges (cached for 4 hours)
 */
export async function getCachedBadges(): Promise<nexBadge[]> {
  "use cache";
  cacheTag("badges");
  cacheLife({ stale: 14400, revalidate: 28800, expire: 57600 }); // 4hr stale, 8hr revalidate, 16hr expire

  try {
    console.log("📖 MongoDB Read: Fetching all badges");

    await connectDB();
    const badges = await Badge.find().lean<nexBadge[]>();

    return badges.map((badge) => ({
      ...badge,
      id: (badge as any)._id?.toString() || badge.id,
      _id: undefined,
    })) as nexBadge[];
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedBadges):", error);
    return []; // Return empty array on error during build
  }
}

/**
 * Get badges by IDs (cached for 4 hours)
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
    console.log(`📖 MongoDB Read: Fetching ${badgeIds.length} badges`);

    await connectDB();
    const badges = await Badge.find({ _id: { $in: badgeIds } }).lean<nexBadge[]>();

    return badges.map((badge) => ({
      ...badge,
      id: (badge as any)._id?.toString() || badge.id,
      _id: undefined,
    })) as nexBadge[];
  } catch (error) {
    console.error("❌ MongoDB Error (getCachedBadgesByIds):", error);
    return [];
  }
}
