import {
  getCachedSubjectsByUserId,
  getCachedTopicsByUserId,
  getCachedNotesByUserId,
} from "@/lib/mongodb-cache";
import NotesSubjectCreator from "@/components/page/notes/notes_subject_creator";
import React from "react";
import { getUserFromClerk } from "@/lib/server/user-helpers";

export default async function page() {
  // Handle potential connection errors during build
  let subjects: Awaited<ReturnType<typeof getCachedSubjectsByUserId>> = [];
  let topics: Awaited<ReturnType<typeof getCachedTopicsByUserId>> = [];
  let notes: Awaited<ReturnType<typeof getCachedNotesByUserId>> = [];
  
  try {
    const user = await getUserFromClerk();
    
    if (user) {
      // Fetch only data relevant to the current user
      [subjects, topics, notes] = await Promise.all([
        getCachedSubjectsByUserId(user.id),
        getCachedTopicsByUserId(user.id),
        getCachedNotesByUserId(user.id),
      ]);
    }
  } catch (error) {
    console.error('Failed to fetch data (will retry at runtime):', error);
    // Return empty arrays - component will handle empty state
  }
  
  return (
    <NotesSubjectCreator
      nexSubjects={subjects}
      nexTopics={topics}
      nexNotes={notes}
    />
  );
}
