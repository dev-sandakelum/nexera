"use client";

import { noteContexts } from "@/public/json/notesData";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function NotePreviewPage({ note_id }: { note_id?: string }) {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!note_id) {
      setError("No note ID provided.");
      return;
    }

    const meta = noteContexts.find(
      (n) => n.noteId === decodeURIComponent(note_id)
    );

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
  }, [note_id]);

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
