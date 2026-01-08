// app/api/note-update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { initAdmin } from "@/components/firebase/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";
import { revalidateNotes } from "@/lib/revalidate";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, updatesAbout, updatesData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    await initAdmin();
    const db = getFirestore();

    const noteAboutRef = db.collection("management_notes").doc(id);
    const noteDataRef = db.collection("nexNotePart2").doc(id);

    // ✅ Build update payloads (server-side safe)
    const aboutPayload = {
      ...updatesAbout,
      updatedAt: new Date().toISOString(),
    };

    const dataPayload = {
      ...updatesData,
    };

    // ✅ Merge updates instead of create
    await Promise.all([
      noteAboutRef.set(aboutPayload, { merge: true }),
      noteDataRef.set(dataPayload, { merge: true }),
    ]);

    // Fetch updated documents
    const updatedAboutDoc = await noteAboutRef.get();
    const updatedDataDoc = await noteDataRef.get();

    if (!updatedAboutDoc.exists || !updatedDataDoc.exists) {
      return NextResponse.json(
        { error: "Note not found after update" },
        { status: 404 }
      );
    }

    const note = {
      id: updatedAboutDoc.id,
      about: updatedAboutDoc.data(),
      data: updatedDataDoc.data(),
    };

    // Clear notes cache
    await revalidateNotes();

    return NextResponse.json({ success: true, note });
  } catch (error) {
    console.error("Error in PUT /api/note-update:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}
