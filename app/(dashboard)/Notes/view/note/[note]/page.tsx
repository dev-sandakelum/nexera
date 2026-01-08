"use server"
import NotePreviewPage from "@/components/page/notes/preview/note/note";
import { getCachedNoteData, getCachedNotes } from "@/lib/firebase-cache";

export default async function page() {
  const [notesAbout, notesData] = await Promise.all([
    getCachedNotes(),
    getCachedNoteData()
  ]);

  return <NotePreviewPage notesAbout={notesAbout} notesData={notesData}/>;
}
