'use client';
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiChevronUp,
  FiFileText,
  FiFile,
  FiCheckCircle,
  FiClock,
  FiUser,
} from "react-icons/fi";
import { BiShieldQuarter } from "react-icons/bi";
import { nexSubject } from "@/components/types";

// Mock data
const mockSubject: nexSubject = {
  id: "sub_001",
  title: "Data Structures and Algorithms",
  departmentID: "CS",
  academicYear: 2,
  semester: 1,
  isOfficial: true,
  createdAt: "2023-08-01",
  updatedAt: "2024-01-10",
  description: "An in-depth study of data structures and algorithms.",
  createdBy: "user_123",
  createdByRole: "nexPrime",
  slug: "data-structures-and-algorithms",
};

const mockTopics = [
  {
    id: "topic_001",
    title: "Introduction & Complexity Analysis",
    subjectID: "sub_001",
  },
  { id: "topic_002", title: "Arrays and Linked Lists", subjectID: "sub_001" },
  { id: "topic_003", title: "Stacks and Queues", subjectID: "sub_001" },
  {
    id: "topic_004",
    title: "Trees and Binary Search Trees",
    subjectID: "sub_001",
  },
  {
    id: "topic_005",
    title: "Graphs and Graph Algorithms",
    subjectID: "sub_001",
  },
];

const mockNotes = [
  {
    id: "note_001",
    topicID: "topic_001",
    title: "Big O Notation Guide",
    description: "Complete guide to time and space complexity",
    type: "note",
    publishedBy: "Prof. Smith",
    status: "approved",
    createdAt: "2024-01-15",
  },
  {
    id: "note_002",
    topicID: "topic_001",
    title: "Complexity Analysis PDF",
    description: "Detailed lecture notes with examples",
    type: "pdf",
    publishedBy: "Dr. Johnson",
    status: "approved",
    createdAt: "2024-01-16",
  },
  {
    id: "note_003",
    topicID: "topic_001",
    title: "Complexity Quiz",
    description: "10 questions on time complexity",
    type: "quiz",
    publishedBy: "Teaching Assistant",
    status: "approved",
    createdAt: "2024-01-17",
  },
  {
    id: "note_004",
    topicID: "topic_002",
    title: "Array Operations",
    description: "Common array operations and their complexity",
    type: "note",
    publishedBy: "Prof. Smith",
    status: "approved",
    createdAt: "2024-01-18",
  },
  {
    id: "note_005",
    topicID: "topic_002",
    title: "Linked List Implementation",
    description: "Step-by-step linked list implementation",
    type: "pdf",
    publishedBy: "Student Contributor",
    status: "pending",
    createdAt: "2024-01-19",
  },
  {
    id: "note_006",
    topicID: "topic_003",
    title: "Stack Applications",
    description: "Real-world stack use cases",
    type: "note",
    publishedBy: "Prof. Smith",
    status: "approved",
    createdAt: "2024-01-20",
  },
  {
    id: "note_007",
    topicID: "topic_003",
    title: "Queue Implementation Quiz",
    description: "Test your queue knowledge",
    type: "quiz",
    publishedBy: "Teaching Assistant",
    status: "approved",
    createdAt: "2024-01-21",
  },
];

const NotesSubRedesign = () => {
  const [expandedTopics, setExpandedTopics] = useState<{ [key: string]: boolean }>({});
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Toggle topic expansion
  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  // Expand all topics
  const expandAll = () => {
    const allExpanded: { [key: string]: boolean } = {};
    mockTopics.forEach((topic) => {
      allExpanded[topic.id] = true;
    });
    setExpandedTopics(allExpanded);
  };

  // Collapse all topics
  const collapseAll = () => {
    setExpandedTopics({});
  };

  // Get notes for a topic with filters
  const getNotesForTopic = (topicId: string) => {
    let notes = mockNotes.filter((n) => n.topicID === topicId);

    if (filterType !== "all") {
      notes = notes.filter((n) => n.type === filterType);
    }

    if (filterStatus !== "all") {
      notes = notes.filter((n) => n.status === filterStatus);
    }

    return notes;
  };

  // Group notes by type
  const groupNotesByType = (notes: any) => {
    const grouped: { note: any[]; pdf: any[]; quiz: any[] } = {
      note: [],
      pdf: [],
      quiz: [],
    };

    notes.forEach((note: any) => {
      if (note.type in grouped) {
        grouped[note.type as keyof typeof grouped].push(note);
      }
    });

    return grouped;
  };

  const getTypeIcon = (type:any) => {
    switch (type) {
      case "note":
        return <FiFileText />;
      case "pdf":
        return <FiFile />;
      case "quiz":
        return <FiCheckCircle />;
      default:
        return <FiFileText />;
    }
  };

  const getTypeColor = (type:any) => {
    switch (type) {
      case "note":
        return { bg: "#ccfbf1", fg: "#0f766e" };
      case "pdf":
        return { bg: "#fee2e2", fg: "#b91c1c" };
      case "quiz":
        return { bg: "#ffedd5", fg: "#c2410c" };
      default:
        return { bg: "#f5f5f4", fg: "#57534e" };
    }
  };

  const getStatusBadge = (status: "approved" | "pending" | "rejected") => {
    const styles = {
      approved: { bg: "#dcfce7", fg: "#15803d", text: "Approved" },
      pending: { bg: "#fef9c3", fg: "#a16207", text: "Pending" },
      rejected: { bg: "#fee2e2", fg: "#b91c1c", text: "Rejected" },
    };
    return styles[status] || styles.pending;
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "96px 24px 24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        {/* Breadcrumb */}
        <div
          style={{
            fontSize: "13px",
            color: "#34343e",
            opacity: 0.6,
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ cursor: "pointer", color: "#7b7dee" }}>Notes</span>
          <span>/</span>
          <span>{mockSubject.title}</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 600,
                color: "#34343e",
                marginBottom: "12px",
              }}
            >
              {mockSubject.title}
            </h1>

            {/* Subject Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: "#dcfce7",
                  color: "#15803d",
                }}
              >
                <BiShieldQuarter />
                Official
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: "#dbeafe",
                  color: "#1e40af",
                }}
              >
                {mockSubject.departmentID}
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: "#e0d7ff",
                  color: "#5b31d8",
                }}
              >
                Year {mockSubject.academicYear}
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: "#cffafe",
                  color: "#0e7490",
                }}
              >
                Semester {mockSubject.semester}
              </span>
            </div>
          </div>

          {/* Expand/Collapse All */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={expandAll}
              style={{
                padding: "8px 16px",
                background: "#eff3fc",
                color: "#34343e",
                border: "1px solid #caced5",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              style={{
                padding: "8px 16px",
                background: "#eff3fc",
                color: "#34343e",
                border: "1px solid #caced5",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          padding: "16px",
          background: "#fbfbfb",
          borderRadius: "12px",
          border: "1px solid #caced5",
        }}
      >
        <div style={{ flex: 1 }}>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 600,
              color: "#34343e",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              opacity: 0.7,
              marginBottom: "6px",
            }}
          >
            Note Type
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "#eff3fc",
              border: "1px solid #caced5",
              borderRadius: "6px",
              fontSize: "13px",
              color: "#34343e",
              cursor: "pointer",
            }}
          >
            <option value="all">All Types</option>
            <option value="note">Notes Only</option>
            <option value="pdf">PDFs Only</option>
            <option value="quiz">Quizzes Only</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 600,
              color: "#34343e",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              opacity: 0.7,
              marginBottom: "6px",
            }}
          >
            Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "#eff3fc",
              border: "1px solid #caced5",
              borderRadius: "6px",
              fontSize: "13px",
              color: "#34343e",
              cursor: "pointer",
            }}
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Topics */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {mockTopics.map((topic, topicIndex) => {
          const topicNotes = getNotesForTopic(topic.id);
          const groupedNotes = groupNotesByType(topicNotes);
          const isExpanded = expandedTopics[topic.id];
          const totalNotes = topicNotes.length;

          return (
            <motion.div
              key={topic.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: topicIndex * 0.1 }}
              style={{
                background: "#fbfbfb",
                border: "1px solid #caced5",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {/* Topic Header */}
              <div
                onClick={() => toggleTopic(topic.id)}
                style={{
                  padding: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: isExpanded ? "#eff3fc" : "transparent",
                  transition: "background 0.2s",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#34343e",
                      marginBottom: "6px",
                    }}
                  >
                    {topic.title}
                  </h3>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#34343e",
                      opacity: 0.6,
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    <span>📝 {groupedNotes.note.length} Notes</span>
                    <span>📄 {groupedNotes.pdf.length} PDFs</span>
                    <span>🧠 {groupedNotes.quiz.length} Quizzes</span>
                    <span>•</span>
                    <span>{totalNotes} total</span>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "20px",
                    color: "#7b7dee",
                    transition: "transform 0.3s",
                  }}
                >
                  {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                </div>
              </div>

              {/* Topic Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      style={{
                        padding: "0 20px 20px",
                        borderTop: "1px solid #caced5",
                      }}
                    >
                      {/* Notes Section */}
                      {groupedNotes.note.length > 0 && (
                        <div style={{ marginTop: "20px" }}>
                          <h4
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#34343e",
                              marginBottom: "12px",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            📝 Markdown Notes ({groupedNotes.note.length})
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {groupedNotes.note.map((note) => (
                              <NoteCard key={note.id} note={note} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* PDFs Section */}
                      {groupedNotes.pdf.length > 0 && (
                        <div style={{ marginTop: "20px" }}>
                          <h4
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#34343e",
                              marginBottom: "12px",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            📄 PDF Documents ({groupedNotes.pdf.length})
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {groupedNotes.pdf.map((note) => (
                              <NoteCard key={note.id} note={note} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quizzes Section */}
                      {groupedNotes.quiz.length > 0 && (
                        <div style={{ marginTop: "20px" }}>
                          <h4
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#34343e",
                              marginBottom: "12px",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            🧠 Quizzes ({groupedNotes.quiz.length})
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {groupedNotes.quiz.map((note) => (
                              <NoteCard key={note.id} note={note} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Empty State */}
                      {totalNotes === 0 && (
                        <div
                          style={{
                            padding: "40px",
                            textAlign: "center",
                            color: "#34343e",
                            opacity: 0.5,
                          }}
                        >
                          No notes found for this topic
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Note Card Component
const NoteCard = ({ note }: { note: any }) => {
  const typeColors = {
    note: { bg: "#ccfbf1", fg: "#0f766e" },
    pdf: { bg: "#fee2e2", fg: "#b91c1c" },
    quiz: { bg: "#ffedd5", fg: "#c2410c" },
  };

  const statusStyles = {
    approved: { bg: "#dcfce7", fg: "#15803d" },
    pending: { bg: "#fef9c3", fg: "#a16207" },
    rejected: { bg: "#fee2e2", fg: "#b91c1c" },
  };

  const colors = typeColors[note.type as keyof typeof typeColors] || typeColors.note;
  const status = statusStyles[note.status as keyof typeof statusStyles] || statusStyles.pending;

  return (
    <motion.div
      whileHover={{ x: 4 }}
      style={{
        padding: "16px",
        background: "#fff",
        border: "1px solid #caced5",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
        {/* Type Icon */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            background: colors.bg,
            color: colors.fg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0,
          }}
        >
          {note.type === "note" ? "📝" : note.type === "pdf" ? "📄" : "🧠"}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "6px",
            }}
          >
            <h5
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#34343e",
                margin: 0,
              }}
            >
              {note.title}
            </h5>

            {/* Status Badge */}
            <span
              style={{
                padding: "3px 8px",
                borderRadius: "4px",
                fontSize: "10px",
                fontWeight: 600,
                background: status.bg,
                color: status.fg,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {note.status}
            </span>
          </div>

          <p
            style={{
              fontSize: "13px",
              color: "#34343e",
              opacity: 0.7,
              margin: "0 0 8px 0",
              lineHeight: 1.4,
            }}
          >
            {note.description}
          </p>

          {/* Meta Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "12px",
              color: "#34343e",
              opacity: 0.6,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <FiUser size={12} />
              {note.publishedBy}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <FiClock size={12} />
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotesSubRedesign;
