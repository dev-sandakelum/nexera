"use server";

import { getFirestore } from "firebase-admin/firestore";
import { NexeraUser } from "../types";

export const AuthUser = async () => {
  const firestore = getFirestore();
  const userSnapshot = await firestore.collection("TestUsers").get();
  const documents = userSnapshot.docs.map((doc) => ({
    email: doc.data().email as string,
    password: doc.data().password as string,
  }));
  return documents;
};
export const UserData = async (userEmail :string ) => {
  const firestore = getFirestore();
  const userSnapshot = await firestore.collection("TestUsers").where("email", "==", userEmail).get();
  if (userSnapshot.empty) {
    return null;
  }
  return userSnapshot.docs[0].data() as NexeraUser;
};
export const AllUsers = async () => {
  const firestore = getFirestore();
  const userSnapshot = await firestore.collection("TestUsers").get();
  const documents = userSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return documents;
};
