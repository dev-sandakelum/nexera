"use server";

import { getFirestore } from "firebase-admin/firestore";

export const User = async () => {
  const firestore = getFirestore();
  const userSnapshot = await firestore.collection("TestUsers").get();
  const documents = userSnapshot.docs.map((doc) => ({
    email: doc.data().email as string,
    password: doc.data().password as string
  }));
  return documents;
};
