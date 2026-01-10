"use server"
import NotePreviewPage from "@/components/page/notes/preview/note/note";
import { getCachedNoteData, getCachedNotes } from "@/lib/firebase-cache";
import { headers } from "next/headers";
import { nexNoteAbout, nexNoteData } from "@/components/types";

interface PageProps {
  params: {
    note: string | string[];
  };
}

export default async function page({ params }: PageProps) {
  const { note } = await params;
  const headersList = await headers();
  const pathname = Array.isArray(note) ? `/${note.join('/')}` : `/${note}`;

  console.log("Pathname is :", pathname.split('/').pop());

  let notesAbout: nexNoteAbout[] = [];
  let notesData: nexNoteData[] = [];

  try {
    [notesAbout, notesData] = await Promise.all([
      getCachedNotes(),
      getCachedNoteData()
    ]);
  } catch (error) {
    console.error("Error fetching note preview data:", error);
    return <div>Failed to load note. Please try again later.</div>;
  }

  return <NotePreviewPage notesAbout={notesAbout} notesData={notesData} pathname={pathname} />;
}
