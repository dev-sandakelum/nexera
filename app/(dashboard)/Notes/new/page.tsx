import {
  getCachedSubjects,
  getCachedTopics,
  getCachedNotes,
} from "@/lib/firebase-cache";
import NotesSubjectCreator from "@/components/page/notes/notes_subject_creator";
import React from "react";

export default async function page() {
  // All queries are now cached
  const [subjects, topics, notes] = await Promise.all([
    getCachedSubjects(),
    getCachedTopics(),
    getCachedNotes(),
  ]);
  return (
    <NotesSubjectCreator
      nexSubjects={subjects}
      nexTopics={topics}
      nexNotes={notes}
    />
  );
}
