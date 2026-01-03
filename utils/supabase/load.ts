import { CreateClient } from "./client";

// Create Supabase client
const supabase = CreateClient();

export async function LoadUserAvatar({
  userId,
}: {
  userId: string;
}): Promise<Blob | null> {
  // 1️⃣ Download the file directly from Supabase storage
  const { data, error } = await supabase.storage
    .from("profile_pic")
    .download(`/${userId}/${userId}.jpg`);

  if (error) {
    console.error("Failed to download avatar:", error.message);
    return null;
  }

  // data is a Blob
  return data;
}

