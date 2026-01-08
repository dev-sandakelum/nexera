"use client";

import { nexNoteAbout, nexNoteData } from "@/components/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// 1. PLUGINS
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeRaw from "rehype-raw"; // Handles HTML tags like <img> inside Markdown

import "@/components/styles/notes/preview/md.css";
import "@/components/styles/notes/preview/md-code.css";

export default function NotePreviewPage({ 
  notesAbout, 
  notesData 
}: { 
  notesAbout: nexNoteAbout[], 
  notesData: nexNoteData[] 
}) {
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


  return (
    <div className="notePreviewContainer">
      {/* 3. The 'md-preview' class triggers your CSS variables */}
      <div className="md-preview">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            // 4. rehypeRaw allows rendering HTML images; rehypePrism adds the colors
            rehypePlugins={[rehypeRaw, rehypePrism]} 
            components={{
              // IMAGES: Handles both Markdown ![alt](src) and HTML <img />
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    margin: "1.5rem auto",
                    display: "block",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}
                  alt={props.alt || "Note Image"}
                />
              ),
              // LINKS: Keeps your layout safe
              a: ({ node, ...props }) => (
                <a 
                  {...props} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ wordBreak: "break-all", color: "#0969da" }} 
                />
              ),
              // PRE: Ensures the code block container is styled
              pre: ({ node, ...props }) => (
                <pre {...props} style={{ background: "#f6f8fa", padding: "16px", borderRadius: "6px", overflowX: "auto" }} />
              ),
              // CODE: If rehype-prism worked, 'className' will contain 'language-js', etc.
              code: ({ node, className, children, ...props }) => {
                // Check if this is an inline code block (no 'language-' class usually)
                const isInline = !className?.includes("language-");
                return (
                  <code
                    {...props}
                    className={className} // Pass the class so CSS colors apply
                    style={
                      isInline
                        ? {
                            background: "rgba(175, 184, 193, 0.2)",
                            padding: "0.2em 0.4em",
                            borderRadius: "6px",
                            fontSize: "85%",
                            fontFamily: "monospace"
                          }
                        : { fontFamily: "inherit" }
                    }
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}