import { initAdmin } from "@/components/firebase/firebaseAdmin";
import Notes_Sub from "@/components/page/notes/notes-sub";
import { nexNoteAbout, nexTopic } from "@/components/types";
import { ictNotes } from "@/public/json/notes";
import { getFirestore } from "firebase-admin/firestore";

export default async function page() {
  await initAdmin();
  const db = getFirestore();
  const topicSnapshot = await db.collection("nexNoteTopics").get();
  const noteSnapshot = await db.collection("management_notes").get();
  const usersSnapshot = await db.collection("TestUsers").get();

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
        name : doc.data().name,
      } as {
        id: string;
        name: string;
      })
  );

  return <Notes_Sub topics={topics} noteAbouts={notes} users={users} />;
}
