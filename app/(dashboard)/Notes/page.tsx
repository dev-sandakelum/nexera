import { initAdmin } from "@/components/firebase/firebaseAdmin";
import Notes from "@/components/page/notes/notes";
import { nexSubject } from "@/components/types"; // or wherever it's defined
import { getFirestore } from "firebase-admin/firestore";
import { Suspense } from "react";

export default async function Page() {
  await initAdmin();
  const db = getFirestore();
  const subjectSnapshot = await db.collection("nexSubjects").get();
  
  const subjects: nexSubject[] = subjectSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  } as nexSubject));

  return (
    <Suspense fallback={null}>
      <Notes data={subjects} />
    </Suspense>
  );
}