import { writeBatch, collection, doc } from "firebase/firestore";

import { nexeraUsersR } from "@/public/json/users";
import { db } from "@/app/api/firebase";
import { ictNotes } from "@/public/json/notes";

export async function UploadUsersFast() {
  const batch = writeBatch(db);
  const usersCollection = collection(db, "management_notes");

  ictNotes.forEach((user) => {
    const userRef = doc(usersCollection, user.id);
    batch.set(userRef, user);
  });

  await batch.commit(); // commits all at once
  console.log("All users uploaded quickly!");
}
