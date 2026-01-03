"use cache";
import { db } from "@/app/api/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
// your firebase config file

export async function UpdateUser(
  userId: string,
  attribute: string,
  value: any
) {
  try {
    console.log("Updating user with ID:", userId);
    const userRef = doc(db, "TestUsers", userId);
    await updateDoc(userRef, {
      [attribute]: value,
      lastLogin: new Date().toISOString(),
    });
    return "success";
  } catch (error) {
    return `error : ${error}`;
  }
}
