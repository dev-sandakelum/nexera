// app/api/subject-update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Subject from "@/lib/models/Subject";
import { revalidateSubjects } from "@/lib/revalidate";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Subject ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    
    // Upsert the subject document (create or update)
    const subject = await Subject.findOneAndUpdate(
      { id: id },
      {
        id,
        ...updates,
        updatedAt: new Date().toISOString(),
      },
      { new: true, upsert: true }
    ).lean();

    if (!subject) {
      return NextResponse.json(
        { error: "Subject not found after update" },
        { status: 404 }
      );
    }

    const subjectData = {
      id: subject._id?.toString(),
      ...subject,
      _id: undefined,
    };

    // Clear subjects cache
    await revalidateSubjects(updates.slug);

    return NextResponse.json({ success: true, subject: subjectData });
  } catch (error) {
    console.error("Error in PUT /api/subject-update:", error);
    return NextResponse.json(
      { error: "Failed to update subject" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Subject ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    await Subject.findOneAndDelete({ id: id });

    // Clear subjects cache
    await revalidateSubjects();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/subject-update:", error);
    return NextResponse.json(
      { error: "Failed to delete subject" },
      { status: 500 }
    );
  }
}