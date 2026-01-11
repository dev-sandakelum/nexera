"use server";

import { connectDB } from "@/lib/mongodb";
import Note from "@/lib/models/Note";
import type { nexNoteAbout } from "@/components/types";

/* =========================
   FETCH NOTES
========================= */
export async function fetchNotes(): Promise<nexNoteAbout[]> {
  try {
    await connectDB();
    const notes = await Note.find()
      .sort({ createdAt: -1 })
      .lean<nexNoteAbout[]>();

    return notes.map((note) => ({
      ...note,
      id: note._id?.toString() || note.id,
      _id: undefined,
    })) as nexNoteAbout[];
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}

/* =========================
   CREATE NOTE
========================= */
export async function createNote(
  note: Omit<nexNoteAbout, "id" | "createdAt" | "updatedAt">
): Promise<nexNoteAbout | null> {
  try {
    await connectDB();
    
    const newNote = new Note({
      ...note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const savedNote = await newNote.save();

    return {
      id: savedNote._id.toString(),
      ...note,
      createdAt: savedNote.createdAt || new Date().toISOString(),
      updatedAt: savedNote.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error creating note:", error);
    return null;
  }
}

/* =========================
   UPDATE NOTE
========================= */
export async function updateNote(
  id: string,
  updates: Partial<nexNoteAbout>
): Promise<boolean> {
  try {
    await connectDB();

    const result = await Note.findByIdAndUpdate(
      id,
      {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
      { new: true }
    );

    return !!result;
  } catch (error) {
    console.error("Error updating note:", error);
    return false;
  }
}

/* =========================
   DELETE NOTE
========================= */
export async function deleteNote(id: string): Promise<boolean> {
  try {
    await connectDB();
    const result = await Note.findByIdAndDelete(id);
    return !!result;
  } catch (error) {
    console.error("Error deleting note:", error);
    return false;
  }
}