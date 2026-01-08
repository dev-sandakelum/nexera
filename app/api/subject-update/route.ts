// app/api/subject-update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { initAdmin } from "@/components/firebase/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";
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

    await initAdmin();
    const db = getFirestore();
    const subjectRef = db.collection("nexSubjects").doc(id);
    
    // Create the subject document
    await subjectRef.create({
      ...updates,
      updatedAt: new Date().toISOString(),
    });

    // Fetch the created subject
    const updatedDoc = await subjectRef.get();
    
    if (!updatedDoc.exists) {
      return NextResponse.json(
        { error: "Subject not found after update" },
        { status: 404 }
      );
    }

    const subject = { id: updatedDoc.id, ...updatedDoc.data() };

    // Clear subjects cache
    await revalidateSubjects(updates.slug);

    return NextResponse.json({ success: true, subject });
  } catch (error) {
    console.error("Error in PUT /api/subject-update:", error);
    return NextResponse.json(
      { error: "Failed to update subject" },
      { status: 500 }
    );
  }
}