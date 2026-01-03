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
import { NexeraUser } from "../types";
// your firebase config file

type UpdateUserResult = {
  success: boolean;
  error?: string;
};

export async function UpdateUser(
  userId: string,
  user : NexeraUser
): Promise<UpdateUserResult> {
  try {
    console.log("Updating user with ID:", userId , user);
    const userRef = doc(db, "TestUsers", userId);
    await updateDoc(userRef, {
      ...user,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
