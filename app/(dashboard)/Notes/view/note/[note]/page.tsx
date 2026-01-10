"use server"
import NotePreviewPage from "@/components/page/notes/preview/note/note";
import { getCachedNoteBySlug, getCachedNoteDataById } from "@/lib/firebase-cache";
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
  // Extract slug from path or use param directly if it's the slug
  const noteSlug = Array.isArray(note) ? note[note.length - 1] : note;

  // console.log("form home Fetching note for slug:", noteSlug);

  let notesAbout: nexNoteAbout[] = [];
  let notesData: nexNoteData[] = [];

  try {
    // 1. Fetch specific note by slug
    const noteAcc = await getCachedNoteBySlug(noteSlug);
    
    if (noteAcc) {
      notesAbout = [noteAcc];
      
      // 2. Fetch data for this note
      const data = await getCachedNoteDataById(noteAcc.id);
      if (data) {
        notesData = [data];
      }
    }
  } catch (error) {
    console.error("Error fetching note preview data:", error);
    return <div>Failed to load note. Please try again later.</div>;
  }

  return <NotePreviewPage notesAbout={notesAbout} notesData={notesData} pathname={pathname} />;
}
