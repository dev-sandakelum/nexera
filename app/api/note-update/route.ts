// app/api/note-update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Note from "@/lib/models/Note";
import NoteData from "@/lib/models/NoteData";
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

    await connectDB();

    // Build update payloads (server-side safe)
    const aboutPayload = {
      ...updatesAbout,
      updatedAt: new Date().toISOString(),
    };

    const dataPayload = {
      ...updatesData,
    };

    // Merge updates instead of create
    const [updatedNote, updatedNoteData] = await Promise.all([
      Note.findOneAndUpdate({ id: id }, { id, ...aboutPayload }, { new: true, upsert: true }).lean(),
      NoteData.findOneAndUpdate(
        { noteId: id },
        dataPayload,
        { new: true, upsert: true }
      ).lean(),
    ]);

    if (!updatedNote || !updatedNoteData) {
      return NextResponse.json(
        { error: "Note not found after update" },
        { status: 404 }
      );
    }

    const note = {
      id: (updatedNote as any)._id?.toString(),
      about: updatedNote,
      data: updatedNoteData,
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    await Promise.all([
      Note.findOneAndDelete({ id: id }),
      NoteData.findOneAndDelete({ noteId: id }),
    ]);

    // Clear notes cache
    await revalidateNotes();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/note-update:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
