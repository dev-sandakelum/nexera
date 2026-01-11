"use server";

import { connectDB } from "@/lib/mongodb";
import Topic from "@/lib/models/Topic";
import User from "@/lib/models/User";
import { nexeraUsersR } from "@/public/json/users";
// import { UploadFile } from "@/utils/supabase/storage/client"; // Likely client-side, suppressing for now
import { ictTopics } from "@/public/json/topics";

export async function UploadUsersFast() {
  try {
    await connectDB();
    console.log("Starting fast upload/migration...");

    // Upload Topics
    if (ictTopics && ictTopics.length > 0) {
        for (const topic of ictTopics) {
            await Topic.findOneAndUpdate(
                { id: topic.id }, 
                { ...topic, updatedAt: new Date().toISOString() }, 
                { upsert: true, new: true }
            );
        }
    }
    
    console.log("All topics uploaded/updated!");
  } catch (error) {
    console.error("Error in UploadUsersFast:", error);
  }
}
