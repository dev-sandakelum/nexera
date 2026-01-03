// app/api/upload-avatar/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { avatarUrl } = body;

    if (!avatarUrl || typeof avatarUrl !== "string") {
      return NextResponse.json(
        { error: "No avatar URL provided" },
        { status: 400 }
      );
    }

    // Fetch the image from the URL
    const response = await fetch(avatarUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image from URL" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    // Ensure the avatars folder exists
    const savePath = path.join(process.cwd(), "public", "avatars");
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
    }

    // Generate a unique filename
    const filename = `avatar_${Date.now()}.png`;

    // Save the image to the public folder
    fs.writeFileSync(path.join(savePath, filename), buffer);

    // Return the URL to access the image
    const imageUrl = `/avatars/${filename}`;
    console.log("Saved avatar:", imageUrl);

    return NextResponse.json({
      message: "Avatar uploaded successfully",
      filename,
      url: imageUrl,
    });
  } catch (err) {
    console.error("Error handling avatar URL:", err);
    return NextResponse.json(
      { error: "Failed to process avatar URL" },
      { status: 500 }
    );
  }
}

// Optional: block GET requests
export async function GET() {
  return NextResponse.json({ error: "GET not allowed" }, { status: 405 });
}
