import { writeBatch, collection, doc } from "firebase/firestore";

import { nexeraUsersR } from "@/public/json/users";
import { db } from "@/app/api/firebase";
import { ictNotes } from "@/public/json/notes";
import { nexBadges } from "@/public/json/badges";
import { UploadUserAvatar } from "@/utils/supabase/upload";
import { LoadUserAvatar } from "@/utils/supabase/load";

export async function UploadUsersFast() {
  const batch = writeBatch(db);
  const usersCollection = collection(db, "nexBadges");

  // nexBadges.forEach((user) => {
  //   const userRef = doc(usersCollection, user.id);
  //   batch.set(userRef, user);
  // });

  nexeraUsersR.forEach(async (user) => {
     try {
      const res = await fetch("/api/upload-avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarUrl: user.profilePicture }),
      });

      if (!res.ok) {
        const err = await res.json();
        
        return;
      }

      const data = await res.json();
      
    } catch (err: any) {
      
    } finally {
    }
  });

  // const data = await LoadUserAvatar({
  //   userId: "u_005",
  // });
  // console.log("Downloaded avatar data:", data);

  await batch.commit(); // commits all at once
  console.log("All users uploaded quickly!");
}
