import { nexNoteAbout, nexNoteData } from "@/components/types";
import Link from "next/link";
import React, { useRef } from "react";
import { FiClock, FiDownload, FiEye, FiUser } from "react-icons/fi";

export default function NoteCard({
  note,
  noteData,
  users,
  getStatusBadge,
}: {
  note: nexNoteAbout;
  noteData?: nexNoteData;
  users: { id: string; name: string }[];
  getStatusBadge: (status: string) => { bg: string; fg: string; text: string };
}) {
  console.log(`Note Card ${note.type}:`, note);
  const typeColors = {
    note: {
      bg: "var(--accent-soft-bg)",
      fg: "var(--accent-soft)",
      border: "var(--accent-soft-border)",
    },
    pdf: {
      bg: "var(--warning-soft-bg)",
      fg: "var(--warning-soft)",
      border: "var(--warning-soft-border)",
    },
    quiz: {
      bg: "var(--success-soft-bg)",
      fg: "var(--success-soft)",
      border: "var(--success-soft-border)",
    },
  };

  const colors =
    typeColors[note.type as keyof typeof typeColors] || typeColors.note;
  const status = getStatusBadge(note.status);

  const mdLinkRef = useRef<HTMLAnchorElement>(null);
  const handleViewClick = () => {
    if (mdLinkRef.current) {
      mdLinkRef.current.click();
    }
  };
  return (
    <>
      <div
        className="note-card"
        style={
          {
            "--border": typeColors[note.type as keyof typeof typeColors].border,
            "--left-border":
              typeColors[note.type as keyof typeof typeColors].fg,
          } as React.CSSProperties
        }
      >
        <div className="note-card-outer">
          <div className="note-card-inner">
            {/* Type Icon */}
            <div className="icon-type-container">
              <div
                className="note-type-icon"
                style={{ background: colors.bg, color: colors.fg }}
              >
                {note.type === "note"
                  ? "📝"
                  : note.type === "pdf"
                  ? "📄"
                  : "🧠"}
              </div>
            </div>

            {/* Content */}
            <div className="note-content">
              <div className="note-header">
                <h5 className="note-title">{note.title}</h5>
              </div>

              <p className="note-description">{note.description}</p>

              <div className="note-meta">
                <span className="note-meta-item">
                  <FiUser size={12} />{" "}
                  {users.find((user) => user.id === note.publishedBy)?.name ||
                    "Unknown"}
                </span>
                <span className="note-meta-item">
                  <FiClock size={12} />{" "}
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="note-actions">
              <span
                className="note-status-badge"
                style={{ background: status.bg, color: status.fg }}
              >
                {status.text}
              </span>

              <div className="note-actions-btn">
                <button className="note-action-btn" onClick={handleViewClick}>
                  <FiEye size={16} />
                </button>
                {note.type === "pdf" && noteData && (
                  <a
                    href={(noteData.context as { url: string }).url || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="note-action-btn">
                      <FiDownload size={16} />
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
          <Link
            ref={mdLinkRef}
            href={`/Notes/view/${note.type}/${note.slug}`}
          />
        </div>
        <div className="note-card-bg">
          <div className="animater"></div>
        </div>
      </div>
    </>
  );
}
