export async function BlobToFile(
  blobUrl: string,
  fileName: string
): Promise<File> {
  const response = await fetch(blobUrl);
  const arrayBuffer = await response.blob();
  const fileType =
    response.headers.get("content-type") || "application/octet-stream";
  return new File([arrayBuffer], fileName, { type: fileType });
}
