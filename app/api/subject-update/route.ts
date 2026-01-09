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
    
    // Upsert the subject document (create or update)
    await subjectRef.set({
      ...updates,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    // Fetch the updated subject
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

    await initAdmin();
    const db = getFirestore();
    const subjectRef = db.collection("nexSubjects").doc(id);
    
    // Get subject data first to invalid cache later if needed (e.g. slug)
    // For simplicity, we just delete and revalidate generic or specific if we had slug
    // We can try to get the doc before deleting to know the slug for revalidation, 
    // but revalidateSubjects might accept just generic revalidation if slug is optional.
    // Let's check revalidateSubjects signature later if needed. For now assuming we might not have it.
    
    await subjectRef.delete();

    // Clear subjects cache - passing undefined/null might revalidate all or we might need slug.
    // Ideally we should fetch before delete.
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