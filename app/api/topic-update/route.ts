// app/api/topic-update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Topic from "@/lib/models/Topic";
import { revalidateTopics } from "@/lib/revalidate";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Topic ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Upsert the topic document
    const topic = await Topic.findOneAndUpdate(
      { id: id },
      {
        id,
        ...updates,
        updatedAt: new Date().toISOString(),
      },
      { new: true, upsert: true }
    ).lean();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic not found after update" },
        { status: 404 }
      );
    }

    const topicData = {
      id: (topic as any)._id?.toString(),
      ...(topic as any),
      _id: undefined,
    };

    // Clear topics cache
    await revalidateTopics(updates.subjectID);

    return NextResponse.json({ success: true, topic: topicData });
  } catch (error) {
    console.error("Error in PUT /api/topic-update:", error);
    return NextResponse.json(
      { error: "Failed to update topic" },
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
        { error: "Topic ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    await Topic.findOneAndDelete({ id: id });

    // Clear topics cache
    await revalidateTopics();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/topic-update:", error);
    return NextResponse.json(
      { error: "Failed to delete topic" },
      { status: 500 }
    );
  }
}
