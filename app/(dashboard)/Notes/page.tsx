import { initAdmin } from "@/components/firebase/firebaseAdmin";
import Notes from "@/components/page/notes/notes";
import { nexBadge, NexeraUser, nexSubject } from "@/components/types"; // or wherever it's defined
import { getFirestore } from "firebase-admin/firestore";
import { Suspense } from "react";

export default async function Page() {
  await initAdmin();
  const db = getFirestore();
  const subjectSnapshot = await db.collection("nexSubjects").get();
  const userSnapshot = await db.collection("TestUsers").get();
  const badgeSnapshot = await db.collection("nexBadges").get();
  
  const subjects: nexSubject[] = subjectSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  } as nexSubject));

const users: NexeraUser[] = userSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  } as NexeraUser));

const badges: nexBadge[] = badgeSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  } as nexBadge));

  return (
    <Suspense fallback={null}>
      <Notes data={subjects} users={users} badges={badges} />
    </Suspense>
  );
}