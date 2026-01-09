
import { nexNoteAbout, nexNoteData } from "@/components/types";
import { MarkdownRenderer } from "./MarkdownRenderer";

export default async function Page({
  notesAbout,
  notesData,
}: {
  notesAbout: nexNoteAbout[];
  notesData: nexNoteData[];
}) {
  const noteSlug = "css-variables";
  const note = notesAbout.find((n) => n.slug === noteSlug);
  const noteData = notesData.find((n) => n.noteId === note?.id);

  const url =
    noteData?.context && "url" in noteData.context
      ? (noteData.context as { url?: string }).url
      : undefined;

  if (!url) {
    return <p>No markdown found</p>;
  }

  const content = await fetch(url).then((r) => r.text());

  return (
    <MarkdownRenderer content={content} />
  );
}
