"use client";

import { nexNoteAbout, nexNoteData } from "@/components/types";
import { noteContexts } from "@/public/json/notesData";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function NotePreviewPage({ notesAbout , notesData }: { notesAbout: nexNoteAbout[], notesData : nexNoteData[] }) {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const note_slug = pathname.split("/").pop();

  const selectedNote = notesAbout.find((n) => n.slug === note_slug);
  const selectedNoteData = notesData.find((n) => n.noteId === selectedNote?.id);

  useEffect(() => {
    if (!selectedNoteData) {
      setError("No note ID provided.");
      return;
    }

    const meta = selectedNoteData;

    if (!meta) {
      setError("No note found.");
      return;
    }

    if (meta.context.type !== "note" || !meta.context.url) {
      setError("No valid URL found for this note.");
      return;
    }

    fetch(meta.context.url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load note");
        return res.text();
      })
      .then(setContent)
      .catch(() => setError("Error loading markdown file"));
  }, [selectedNoteData, selectedNote]);

  // if (error) return <p>{error}</p>;

  return (
    <div className="notePreviewContainer">
      <div className="inside">
        {error ? (
          <p>{error}</p>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}
