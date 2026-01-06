import { db } from "@/app/api/firebase";
import { nexeraUsersR } from "@/public/json/users";
import { log } from "console";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NexeraUser } from "../types";
// your firebase config file

export async function GetUserById(userId: string) {
  try {
    log("Fetching user with ID:", userId);
    const userRef = doc(db, "TestUsers", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log("User data:", userData);
      return userData;
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
export async function GetUserByEmail(email: string) {
  try {
    const usersCol = collection(db, "TestUsers");
    const q = query(usersCol, where("email", "==", email));
    const userSnap = await getDocs(q as any);
    return userSnap.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
export async function LogAllUsers() {
  try {
    const usersCol = collection(db, "TestUsers"); // reference to 'TestUsers' collection
    const snapshot = await getDocs(usersCol); // fetch all documents

    if (snapshot.empty) {
      console.log("No users found!");
      return;
    }

    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("All Users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
