

import { useSearchParams } from "next/navigation";
import { noteContexts } from "@/public/json/notesData";
import { baseNote, pdfNote, quizNote } from "@/components/types";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
// Adjust import path to where your types file actually is

export default function NotePreviewPage({note_id}: {note_id?: string}) {


  // 2. Variable definition
  let note: baseNote | pdfNote | quizNote | null = null;
  let errorMessage: string | null = null;

  if (note_id) {
    const foundData = noteContexts.find(
      (n) => n.noteId === decodeURIComponent(note_id)
    );

    if (foundData) {
      note = foundData.context;
    } else {
      errorMessage = "No note found.";
    }
  } else {
    errorMessage = "No note ID provided.";
  }

  // 3. Helper to render content based on type

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#000",
        padding: "128px 20px",
      }}
    >
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        note && (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {"content" in note
              ? typeof note.content === "string"
                ? note.content
                : JSON.stringify(note.content)
              : "Content not available"}
          </ReactMarkdown>
        )
      )}
    </div>
  );
}
