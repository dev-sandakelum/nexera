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

// components/firebase/update-user.tsx
export async function UpdateUser(
  userId: string,
  updates: Partial<NexeraUser>
): Promise<{ success: boolean; user?: NexeraUser; error?: string }> {
  try {
    const userRef = doc(db, "TestUsers", userId);
    
    // Update with timestamp
    await updateDoc(userRef, {
      ...updates,
      lastLogin: new Date().toISOString(),
    });
    
    // Fetch updated user
    const updatedDoc = await getDoc(userRef);
    if (!updatedDoc.exists()) {
      return { success: false, error: "User not found after update" };
    }
    
    const updatedUser = { id: updatedDoc.id, ...updatedDoc.data() } as NexeraUser;
    return { success: true, user: updatedUser };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
