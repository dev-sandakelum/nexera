"use client";

import {
  nexNoteAbout,
  nexNoteData,
  nexSubject,
  nexTopic,
} from "@/components/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useEffect, useState, useRef } from "react";
import { GetUserNameList } from "@/components/firebase/get-list";
import { FiChevronDown, FiChevronUp, FiFilter, FiShield } from "react-icons/fi";
import NoteTypeSection from "@/components/page/notes/items/note_sub/TypeSection";

import "@/components/styles/notes-sub/NoteCard.css";
import "@/components/styles/notes-sub/NoteTypeSection.css";
import "@/components/styles/MOBILE/notes-sub/NoteCard.css";
import "@/components/styles/MOBILE/notes-sub/NoteTypeSection.css";

export default function Notes_Sub({
  selectedSubject,
  topics,
  noteAbouts,
  notesData,
  users,
}: {
  selectedSubject: nexSubject;
  topics: nexTopic[];
  noteAbouts: nexNoteAbout[];
  notesData: nexNoteData[];
  users: { id: string; name: string }[];
}) {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const sub_slug = paths[paths.length - 1];

  const [userNames, setUserNames] = useState<{ id: string; name: string }[]>(
    []
  );
  const subject_id = selectedSubject?.id;

  const subject_topics = useMemo(
    () => topics.filter((topic) => topic.subjectID === subject_id),
    [topics, subject_id]
  );

  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(
    {}
  );
  const [filterType, setFilterType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((topic) => {
      allExpanded[topic.id] = true;
    });
    setExpandedTopics(allExpanded);
  };

  const collapseAll = () => setExpandedTopics({});

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  useEffect(() => {
    GetUserNameList().then(setUserNames);
  }, []);

  const getNotesForTopic = (topicId: string) => {
    let notes = noteAbouts.filter((n) => n.topicID === topicId);
    if (filterType !== "all")
      notes = notes.filter((n) => n.type === filterType);
    return notes;
  };

  const groupNotesByType = (notes: any[]) => {
    const grouped: { note: any[]; pdf: any[]; quiz: any[] } = {
      note: [],
      pdf: [],
      quiz: [],
    };
    notes.forEach((note: any) => {
      if (note.type in grouped)
        grouped[note.type as keyof typeof grouped].push(note);
    });
    return grouped;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: { bg: "#dcfce7", fg: "#15803d", text: "Approved" },
      pending: { bg: "#fef9c3", fg: "#a16207", text: "Pending" },
      rejected: { bg: "#fee2e2", fg: "#b91c1c", text: "Rejected" },
    };

    return styles[status as keyof typeof styles] || styles.pending;
  };
  const badgeColor = {
    official: { bg: "var(--badge-01-bg)", fg: "var(--badge-01-fg)" },
    department: { bg: "var(--badge-02-bg)", fg: "var(--badge-02-fg)" },
    year: { bg: "var(--badge-03-bg)", fg: "var(--badge-03-fg)" },
    semester: { bg: "var(--badge-04-bg)", fg: "var(--badge-04-fg)" },
  };
  return (
    <div className="notesSubPage">
      {/* Header */}
      <div className="notesSubPage-header">
        <div className="notesSubPage-header-content">
          <div className="notesSubPage-title-box">
            <h1 className="notesSubPage-title">{selectedSubject.title}</h1>

            <div className="notesSubPage-badges">
              {selectedSubject.isOfficial && (
                <span
                  className="badge badge-official"
                  style={{
                    backgroundColor: badgeColor.official.bg,
                    color: badgeColor.official.fg,
                  }}
                >
                  <FiShield /> Official
                </span>
              )}
              <span
                className="badge badge-department"
                style={{
                  backgroundColor: badgeColor.department.bg,
                  color: badgeColor.department.fg,
                }}
              >
                {selectedSubject.departmentID}
              </span>
              <span
                className="badge badge-year"
                style={{
                  backgroundColor: badgeColor.year.bg,
                  color: badgeColor.year.fg,
                }}
              >
                Year {selectedSubject.academicYear}
              </span>
              {selectedSubject.semester && (
                <span
                  className="badge badge-semester"
                  style={{
                    backgroundColor: badgeColor.semester.bg,
                    color: badgeColor.semester.fg,
                  }}
                >
                  Semester {selectedSubject.semester}
                </span>
              )}
            </div>
          </div>

          <div className="notesSubPage-actions">
            <button onClick={expandAll} className="notes-btn">
              Expand All
            </button>
            <button onClick={collapseAll} className="notes-btn">
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="notes-filter-box">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="notes-filter-toggle"
        >
          <span className="notes-filter-title">
            <FiFilter /> Filter Notes
          </span>
          {showFilters ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {showFilters && (
          <div className="notes-filter-content">
            <div className="notes-filter-grid">
              <div className="notes-filter-item">
                <label className="notes-filter-label">Note Type</label>
                <div className="notes-filter-options">
                  {[
                    { value: "all", label: "All Types" },
                    { value: "note", label: "Notes" },
                    { value: "pdf", label: "PDFs" },
                    { value: "quiz", label: "Quizzes" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      className={`notes-filter-btn ${
                        filterType === opt.value ? "active" : ""
                      }`}
                      onClick={() => setFilterType(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notes List */}
      <div className="notsSub-list">
        {subject_topics.map((topic) => {
          const topicNotes = getNotesForTopic(topic.id);
          const groupedNotes = groupNotesByType(topicNotes);
          const totalNotes = topicNotes.length;

          return (
            <div key={topic.id} className="topic-card">
              {/* Topic Header */}
              <div className="topic-header">
                <div className="topic-header-left">
                  <h3 className="topic-title">{topic.title}</h3>
                  <p className="topic-description">{topic.description}</p>
                  <div className="topic-subinfo-r">
                    <span>📝 {groupedNotes.note.length} Notes</span>
                    <span>📄 {groupedNotes.pdf.length} PDFs</span>
                    <span>🧠 {groupedNotes.quiz.length} Quizzes</span>
                    <span className="topic-subinfo-r-total">
                      •<span>{totalNotes} total</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Topic Content */}
              <div className="topic-content">
                <div>
                  {groupedNotes.note.length > 0 && (
                    <NoteTypeSection
                      title="📝 Markdown Notes"
                      notes={groupedNotes.note}
                      notesData={notesData}
                      getStatusBadge={getStatusBadge}
                      users={users}
                    />
                  )}
                  {groupedNotes.pdf.length > 0 && (
                    <NoteTypeSection
                      title="📄 PDF Documents"
                      notes={groupedNotes.pdf}
                      notesData={notesData}
                      getStatusBadge={getStatusBadge}
                      users={users}
                    />
                  )}
                  {groupedNotes.quiz.length > 0 && (
                    <NoteTypeSection
                      title="🧠 Quizzes"
                      notes={groupedNotes.quiz}
                      notesData={notesData}
                      getStatusBadge={getStatusBadge}
                      users={users}
                    />
                  )}
                  {totalNotes === 0 && (
                    <div className="topic-empty">
                      No notes found for this topic
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
