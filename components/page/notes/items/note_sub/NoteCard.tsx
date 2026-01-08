import { motion } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import { FiClock, FiDownload, FiEye, FiUser } from "react-icons/fi";

export default function NoteCard({
  note,
  users,
  getStatusBadge,
}: {
  note: any;
  users: { id: string; name: string }[];
  getStatusBadge: (status: string) => { bg: string; fg: string; text: string };
}) {
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
    <motion.div
      className="note-card"
      whileHover={{ x: 2 }}
      style={
        {
          "--border": typeColors[note.type as keyof typeof typeColors].border,
          "--left-border": typeColors[note.type as keyof typeof typeColors].fg,
        } as React.CSSProperties
      }
    >
      <div className="note-card-inner">
        {/* Type Icon */}
        <div
          className="note-type-icon"
          style={{ background: colors.bg, color: colors.fg }}
        >
          {note.type === "note" ? "📝" : note.type === "pdf" ? "📄" : "🧠"}
        </div>

        {/* Content */}
        <div className="note-content">
          <div className="note-header">
            <h5 className="note-title">{note.title}</h5>
            <span
              className="note-status-badge"
              style={{ background: status.bg, color: status.fg }}
            >
              {status.text}
            </span>
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
          <button className="note-action-btn" onClick={handleViewClick}>
            <FiEye size={16} />
          </button>
          {note.type === "pdf" && (
            <button className="note-action-btn">
              <FiDownload size={16} />
            </button>
          )}
        </div>
      </div>
      <Link ref={mdLinkRef} href={`/Notes/view/${note.type}/${note.slug}`} />
    </motion.div>
  );
}
