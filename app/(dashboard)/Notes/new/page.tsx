import { initAdmin } from "@/components/firebase/firebaseAdmin";
import NotesSubjectCreator from "@/components/page/notes/notes_subject_creator";
import { nexNoteAbout, nexSubject, nexTopic } from "@/components/types";
import { getFirestore } from "firebase-admin/firestore";
import React from "react";

export default async function page() {
  await initAdmin();
  const db = getFirestore();
  const subjectSnapshot = await db.collection("nexSubjects").get();
  const topicSnapshot = await db.collection("nexNoteTopics").get();
  const noteSnapshot = await db.collection("management_notes").get();

  const subjects: nexSubject[] = subjectSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as nexSubject)
  );
  const topics: nexTopic[] = topicSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as nexTopic)
  );
  const notes: nexNoteAbout[] = noteSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as nexNoteAbout)
  );
  return (
    <NotesSubjectCreator
      nexSubjects={subjects}
      nexTopics={topics}
      nexNotes={notes}
    />
  );
}
