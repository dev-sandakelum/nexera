import { v4 as uuidV4 } from "uuid";
import imageCompression from "browser-image-compression";
import { CreateClient } from "../client";

type uploadFileProps = {
  userId: string;
  file: File;
  bucket: string;
  path: string;
};
export function getStorage() {
  const client = CreateClient();
  return client.storage;
}

export async function UploadFile({
  userId,
  file,
  bucket,
  path,
}: uploadFileProps) {
  const fileName = file.name;
  const fileType = file.name.slice(file.name.lastIndexOf(".") + 1);
  const filePath = `${path}/${uuidV4()}.${fileType}`;
  try {
    file = await imageCompression(file, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    });
  } catch (error: any) {
    // console.error("Image compression error:", error.message);
    return { imageURL: null, error: error.message };
  }
  const storage = getStorage();
  const { data, error } = await storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
  });

  if (error) {
    return { imageURL: null, error: error.message };
  }
  const fileURL = storage.from(bucket).getPublicUrl(data.path);

  return { imageURL: fileURL.data.publicUrl, error: null };
}
