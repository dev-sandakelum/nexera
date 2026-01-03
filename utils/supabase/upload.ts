import { readFile } from "fs/promises";
import { CreateClient } from "./client";

// Create Supabase client
const supabase = CreateClient();

export async function UploadUserAvatar({
  file,
  userId,
}: {
  file: string; // path to local file
  userId: string;
}) {
  try {
    // Read file as a buffer
    const fileBuffer = await readFile("/img/profile_pic/70.jpg");

    // Upload buffer to Supabase Storage
    const { data, error } = await supabase.storage
      .from("profile_pic")
      .upload(`/${userId}/${userId}.jpg`, fileBuffer, {
        contentType: "image/jpeg",
      });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("File read error:", err);
    return null;
  }
}