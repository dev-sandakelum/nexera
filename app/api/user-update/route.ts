// app/api/user-update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { revalidateUsers } from "@/lib/revalidate";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Update the user document
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
      { new: true }
    ).lean();

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found after update" },
        { status: 404 }
      );
    }

    const user = {
      id: (updatedUser as any)._id?.toString(),
      ...(updatedUser as any),
      _id: undefined,
    };

    // Clear user cache
    await revalidateUsers(id);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error in PUT /api/user-update:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}