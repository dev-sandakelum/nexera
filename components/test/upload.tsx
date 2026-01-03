import { writeBatch, collection, doc } from "firebase/firestore";

import { nexeraUsersR } from "@/public/json/users";
import { db } from "@/app/api/firebase";
import { ictNotes } from "@/public/json/notes";
import { nexBadges } from "@/public/json/badges";
import { BlobToFile } from "../converts/blob-to-file";
import { UploadFile } from "@/utils/supabase/storage/client";
import { UpdateUser } from "../firebase/update-user";

export async function UploadUsersFast() {
  const batch = writeBatch(db);
  const usersCollection = collection(db, "nexBadges");

  // nexBadges.forEach((user) => {
  //   const userRef = doc(usersCollection, user.id);
  //   batch.set(userRef, user);
  // });

  for (const user of nexeraUsersR) {
    try {
      const avatarUrl = user.profilePicture;
      const imgBlob = await BlobToFile(avatarUrl, "avatar.png");

      const { imageURL, error } = await UploadFile({
        userId: user.id,
        file: imgBlob,
        bucket: "users",
        path: `profile_pic/${user.id}`,
      });
      
      if (error) {
        console.error("Error uploading user avatar:", error);
        continue;
      }

      if (imageURL) {
        await UpdateUser(user.id, {}, "profilePicture", imageURL);
      }
    } catch (err: any) {
      console.error("Error uploading user avatar:", err.message);
    }
  }

  // const data = await LoadUserAvatar({
  //   userId: "u_005",
  // });
  // console.log("Downloaded avatar data:", data);

  await batch.commit(); // commits all at once
  console.log("All users uploaded quickly!");
}
