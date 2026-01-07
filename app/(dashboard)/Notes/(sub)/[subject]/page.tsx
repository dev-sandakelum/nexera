import { initAdmin } from "@/components/firebase/firebaseAdmin";
import Notes_Sub from "@/components/page/notes/notes-sub";
import { nexNoteAbout, nexSubject, nexTopic } from "@/components/types";
import { getFirestore } from "firebase-admin/firestore";

type PageProps = {
  params: {
    subject: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function page({ params, searchParams }: PageProps) {
  const { subject } = await params;
  await initAdmin();
  const db = getFirestore();
  const topicSnapshot = await db.collection("nexNoteTopics").get();
  const noteSnapshot = await db.collection("management_notes").get();
  const usersSnapshot = await db.collection("TestUsers").get();
  const subjectsSnapshot = await db.collection("nexSubjects").get();
  // console.log(subject+"   lllllllllllllllllllllllll");

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
  const users: { id: string; name: string }[] = usersSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        name: doc.data().name,
      } as {
        id: string;
        name: string;
      })
  );
  const subjects: nexSubject[] = subjectsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as nexSubject)
  );
  const selectedSubject = subjects.find((sub) => sub.slug === subject);

  if (!selectedSubject) {
    return <div>Subject not found</div>;
  }

  return (
    <Notes_Sub
      selectedSubject={selectedSubject}
      topics={topics}
      noteAbouts={notes}
      users={users}
    />
  );
}
