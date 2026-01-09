// app/api/topic-update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { initAdmin } from "@/components/firebase/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";
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

    await initAdmin();
    const db = getFirestore();
    const topicRef = db.collection("nexNoteTopics").doc(id);
    
    // Upsert the topic document
    await topicRef.set({
      id,
      ...updates,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    // Fetch the updated topic
    const updatedDoc = await topicRef.get();
    
    if (!updatedDoc.exists) {
      return NextResponse.json(
        { error: "Topic not found after update" },
        { status: 404 }
      );
    }

    const topic = { id: updatedDoc.id, ...updatedDoc.data() };

    // Clear topics cache
    await revalidateTopics(updates.subjectID);

    return NextResponse.json({ success: true, topic });
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

    await initAdmin();
    const db = getFirestore();
    const topicRef = db.collection("nexNoteTopics").doc(id);
    
    await topicRef.delete();

    // Clear topics cache - we might not know subjectID without fetching first, 
    // but usually revalidation functions handle broad revalidation or optional params.
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