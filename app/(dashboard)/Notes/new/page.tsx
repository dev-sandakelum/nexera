import {
  getCachedSubjects,
  getCachedTopics,
  getCachedNotes,
} from "@/lib/firebase-cache";
import NotesSubjectCreator from "@/components/page/notes/notes_subject_creator";
import React from "react";

export default async function page() {
  // Handle potential connection errors during build
  let subjects: Awaited<ReturnType<typeof getCachedSubjects>> = [];
  let topics: Awaited<ReturnType<typeof getCachedTopics>> = [];
  let notes: Awaited<ReturnType<typeof getCachedNotes>> = [];
  
  try {
    // All queries are now cached
    [subjects, topics, notes] = await Promise.all([
      getCachedSubjects(),
      getCachedTopics(),
      getCachedNotes(),
    ]);
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
