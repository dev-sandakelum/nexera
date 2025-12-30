'use cache';
import { db } from "@/app/api/firebase";
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


export async function GetUserNameList() {
  try {
    const usersCol = collection(db, "TestUsers");
    const snapshot = await getDocs(usersCol);
    const userList = snapshot.docs.map((doc) => doc.data());
    const names = userList.map((user) => ({ id: user.id, name: user.name }));
    console.log("User names list:", names);
    return names as { id: string; name: string }[];
  } catch (error) {
    console.error("Error fetching user list:", error);
    return [];
  }
}
export async function GetProfilePicList() {
  try {
    const usersCol = collection(db, "TestUsers");
    const snapshot = await getDocs(usersCol);
    const userList: NexeraUser[] = snapshot.docs.map(
      (doc) => doc.data() as NexeraUser
    );
    const pics = userList.map((user) => ({
      id: user.id,
      profilePic: user.profilePicture,
    }));
    console.log("Profile pictures list:", pics);
    return pics as { id: string; profilePic: string }[];
  } catch (error) {
    console.error("Error fetching profile picture list:", error);
    return [];
  }
}
