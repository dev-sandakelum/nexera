import NotePreviewPage from "@/components/page/notes/preview/note/note";
import { getCachedNoteData, getCachedNotes } from "@/lib/firebase-cache";
import { headers } from "next/headers";

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

  const [notesAbout, notesData] = await Promise.all([
    getCachedNotes(),
    getCachedNoteData()
  ]);

  // if(!notesAbout || !notesData || !resolvedUrl || resolvedUrl !== undefined) {}
  return <NotePreviewPage notesAbout={notesAbout} notesData={notesData} pathname={pathname} />;
}
