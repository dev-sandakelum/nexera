import {
  getCachedSubjects,
  getCachedTopics,
  getCachedNotes,
} from "@/lib/firebase-cache";
import NotesSubjectCreator from "@/components/page/notes/notes_subject_creator";
import React from "react";
import { getUserFromClerk } from "@/lib/server/user-helpers";
import { nexNoteAbout, nexSubject, nexTopic } from "@/components/types";

export default async function page() {
  // Handle potential connection errors during build
  let subjects: nexSubject[] = [];
  let topics: nexTopic[] = [];
  let notes: nexNoteAbout[] = [];
  
  try {
    const user = await getUserFromClerk();
    
    if (user) {
      // Fetch only data relevant to the current user
      [subjects, topics, notes] = await Promise.all([
        // getCachedSubjectsByUserId(user.id),
        getCachedSubjects(),
        getCachedTopics(),
        getCachedNotes(),
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
