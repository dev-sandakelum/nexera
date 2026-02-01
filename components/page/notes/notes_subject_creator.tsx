"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiBookOpen, FiLayers, FiFileText } from "react-icons/fi";

// Types from shared types file
import {
  nexSubject,
  nexTopic,
  nexNoteAbout,
  nexNoteData,
} from "@/components/types";

// Styles - Desktop
import "@/components/styles/notes-subject-creator/main.css";
import "@/components/styles/notes-subject-creator/SubjectCard.css";
import "@/components/styles/notes-subject-creator/ListItem.css";
import "@/components/styles/notes-subject-creator/CreatorModal.css";

// Styles - Mobile
import "@/components/styles/MOBILE/notes-subject-creator/main.css";
import "@/components/styles/MOBILE/notes-subject-creator/SubjectCard.css";
import "@/components/styles/MOBILE/notes-subject-creator/ListItem.css";
import "@/components/styles/MOBILE/notes-subject-creator/CreatorModal.css";

// Components
import SubjectCard from "./items/note_subject_creator/SubjectCard";
import ListItem from "./items/note_subject_creator/ListItem";
import CreatorModal from "./items/note_subject_creator/CreatorModal";

// Functions
import {
  departments,
  createSubject,
  createTopic,
  createNoteAbout,
  TabId,
  createNoteData,
} from "./items/note_subject_creator/functions";
import { useUser } from "@/contexts/UserContext";
import { BlobToFile } from "@/components/converts/blob-to-file";
import { UploadFile } from "@/utils/supabase/storage/client";
import {
  CreateSubject,
  UpdateSubject,
  DeleteSubject,
} from "@/components/firebase/notes/new/update-subject";
import {
  CreateTopic,
  UpdateTopic,
  DeleteTopic,
} from "@/components/firebase/notes/new/update-topic";
import {
  CreateNote,
  UpdateNote,
  DeleteNote,
} from "@/components/firebase/notes/new/update-note";

import "@/components/styles/MOBILE/notes-subject-creator/ListItem.css";

// Tab icon mapping
const tabIcons = {
  subjects: FiBookOpen,
  topics: FiLayers,
  notes: FiFileText,
};

const tabs: { id: TabId; label: string }[] = [
  { id: "subjects", label: "Subjects" },
  { id: "topics", label: "Topics" },
  { id: "notes", label: "Notes" },
];

export default function NotesSubjectCreator({
  nexSubjects,
  nexTopics,
  nexNotes,
}: {
  nexSubjects: nexSubject[];
  nexTopics: nexTopic[];
  nexNotes: nexNoteAbout[];
}) {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<TabId>("subjects");
  const [subjects, setSubjects] = useState<nexSubject[]>([]);
  const [topics, setTopics] = useState<nexTopic[]>([]);
  const [notes, setNotes] = useState<nexNoteAbout[]>([]);
  const [noteFile, setNoteFile] = useState<string>();

  // Modal states
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    id: string;
    type: "subject" | "topic" | "note";
    title: string;
  }>({
    isOpen: false,
    id: "",
    type: "subject",
    title: "",
  });

  // Form states
  const [subjectForm, setSubjectForm] = useState<Partial<nexSubject>>({});
  const [topicForm, setTopicForm] = useState<Partial<nexTopic>>({});
  const [noteAbout, setNoteAbout] = useState<Partial<nexNoteAbout>>({});
  const [noteData, setNoteData] = useState<Partial<nexNoteData>>({});

  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  // Initialize with sample data
  useEffect(() => {
    // Check if user has nexRoot or nexApex badges
    // Convert badges object to array and check
    const badgesArray = user?.badges ? Object.values(user.badges) : [];
    const hasAdminBadge = badgesArray.some(
      (badge: any) => badge.id === "nexRoot" || badge.id === "nexApex",
    );
    setIsAdmin(hasAdminBadge);
  }, [user]);

  useEffect(() => {
    // Filter subjects based on user permissions
    const filteredSubjects = nexSubjects.filter((s) => {
      // If user has admin badge, show ALL subjects
      if (isAdmin) return true;

      // Otherwise, only show subjects created by this user
      return s.createdBy === user?.id;
    });

    setSubjects(filteredSubjects);
  }, [nexSubjects, user, isAdmin]);

  useEffect(() => {
    const filteredTopics = nexTopics.filter((t) => {
      return isAdmin || t.createdBy === user?.id;
    });
    setTopics(filteredTopics);
  }, [nexTopics, user, isAdmin]);

  useEffect(() => {
    setNotes(nexNotes.filter((n) => isAdmin || n.publishedBy === user?.id));
  }, [nexNotes, user, isAdmin]);

  // Subject CRUD
  const handleCreateSubject = async () => {
    const newSubject = createSubject(subjectForm, user ? user.id : "unknown");
    const response = await CreateSubject(newSubject.id, newSubject);
    if (response.success) {
      setSubjects([...subjects, newSubject]);
      setShowSubjectModal(false);
      setSubjectForm({});
    } else {
      alert("Error creating subject: " + response.error);
    }
  };

  const handleUpdateSubject = async () => {
    if (!editingId) return;
    console.log(subjectForm);
    const response = await UpdateSubject(editingId, subjectForm);
    if (response.success) {
      setSubjects(
        subjects.map((s) =>
          s.id === editingId
            ? { ...s, ...subjectForm, updatedAt: new Date().toISOString() }
            : s,
        ),
      );
      setShowSubjectModal(false);
      setSubjectForm({});
      setEditingId(null);
    } else {
      alert("Error updating subject: " + response.error);
    }
  };

  const handleDeleteSubject = (id: string) => {
    const subject = subjects.find((s) => s.id === id);
    setDeleteConfirmation({
      isOpen: true,
      id,
      type: "subject",
      title: subject?.title || "this subject",
    });
  };

  // Topic CRUD
  const handleCreateTopic = async () => {
    if (!selectedSubject) {
      alert("Please select a subject first");
      return;
    }
    const newTopic = createTopic(
      topicForm,
      selectedSubject,
      user ? user.id : "unknown",
    );
    const response = await CreateTopic(newTopic.id, newTopic);
    if (response.success) {
      setTopics([...topics, newTopic]);
      setShowTopicModal(false);
      setTopicForm({});
    } else {
      alert("Error creating topic: " + response.error);
    }
  };

  const handleUpdateTopic = async () => {
    if (!editingId) return;
    const response = await UpdateTopic(editingId, topicForm);
    if (response.success) {
      setTopics(
        topics.map((t) =>
          t.id === editingId
            ? { ...t, ...topicForm, updatedAt: new Date().toISOString() }
            : t,
        ),
      );
      setShowTopicModal(false);
      setTopicForm({});
      setEditingId(null);
    } else {
      alert("Error updating topic: " + response.error);
    }
  };

  const handleDeleteTopic = (id: string) => {
    const topic = topics.find((t) => t.id === id);
    setDeleteConfirmation({
      isOpen: true,
      id,
      type: "topic",
      title: topic?.title || "this topic",
    });
  };

  // Note CRUD
  const handleCreateNote_FileUpload = async () => {
    if (noteFile) {
      try {
        const fileBlob = await BlobToFile(
          noteFile,
          noteAbout.type == "note"
            ? "md"
            : noteAbout.type == "pdf"
              ? "pdf"
              : "json",
        );

        const { fileURL, error } = await UploadFile({
          userId: user?.id || "",
          file: fileBlob,
          bucket: "notes",
          path: `${user?.id || ""}`,
        });
        console.log(".File URL:", fileURL);

        if (error) {
          console.error(".Error uploading file:", error);
          throw new Error(error.message);
        }

        // Return the URL directly instead of using state
        return fileURL || null;
      } catch (err: any) {
        console.error("Error uploading file:", err.message);
        return null;
      }
    }
    return null;
  };

  const handleCreateNote = async () => {
    if (!selectedTopic) {
      alert("Please select a topic first");
      return;
    }
    const fileURL = await handleCreateNote_FileUpload();
    if (fileURL) {
      const noteID = `note_${Date.now()}`;
      const newNoteAbout = createNoteAbout(
        noteID,
        noteAbout,
        selectedTopic,
        user?.id || "unknown",
      );

      // Build the context object directly with the returned URL
      const contextType = noteAbout.type || "note";
      let context: any;

      if (contextType === "pdf") {
        context = { type: "pdf", url: fileURL, sizeInMB: 0 };
      } else if (contextType === "quiz") {
        context = { type: "quiz", quizUrl: fileURL };
      } else {
        context = { type: "note", url: fileURL };
      }

      const newNoteData = createNoteData(noteID, { noteId: noteID, context });
      console.log("Creating note with data:", newNoteData);

      const response = await CreateNote(
        newNoteAbout.id,
        newNoteAbout,
        newNoteData,
      );
      if (response.success) {
        setNotes([...notes, newNoteAbout]);
        setShowNoteModal(false);
        setNoteAbout({});
        setNoteData({});
      } else {
        alert("Error creating note: " + response.error);
      }
    } else {
      alert("File upload failed. Please try again.");
    }
  };

  const handleUpdateNote = async () => {
    if (!editingId) return;
    const response = await UpdateNote(editingId, noteAbout, noteData);
    if (response.success) {
      setNotes(
        notes.map((n) =>
          n.id === editingId
            ? { ...n, ...noteAbout, updatedAt: new Date().toISOString() }
            : n,
        ),
      );
      setShowNoteModal(false);
      setNoteAbout({});
      setEditingId(null);
    } else {
      alert("Error updating note: " + response.error);
    }
  };

  const handleDeleteNote = (id: string) => {
    const note = notes.find((n) => n.id === id);
    setDeleteConfirmation({
      isOpen: true,
      id,
      type: "note",
      title: note?.title || "this note",
    });
  };

  const confirmDelete = async () => {
    const { id, type } = deleteConfirmation;
    let response;

    if (type === "subject") {
      response = await DeleteSubject(id);
      if (response.success) {
        setSubjects(subjects.filter((s) => s.id !== id));
        setTopics(topics.filter((t) => t.subjectID !== id));
        setNotes(
          notes.filter((n) => {
            const topic = topics.find((t) => t.id === n.topicID);
            return topic?.subjectID !== id;
          }),
        );
      }
    } else if (type === "topic") {
      response = await DeleteTopic(id);
      if (response.success) {
        setTopics(topics.filter((t) => t.id !== id));
        setNotes(notes.filter((n) => n.topicID !== id));
      }
    } else if (type === "note") {
      response = await DeleteNote(id);
      if (response.success) {
        setNotes(notes.filter((n) => n.id !== id));
      }
    }

    if (response?.success) {
      setDeleteConfirmation({ ...deleteConfirmation, isOpen: false });
    } else {
      alert("Error deleting item: " + response?.error);
    }
  };

  // Filter topics and notes based on selection
  const filteredTopics = selectedSubject
    ? topics.filter((t) => t.subjectID === selectedSubject)
    : topics;

  const filteredNotes = selectedTopic
    ? notes.filter((n) => n.topicID === selectedTopic)
    : notes;

  // Close modal helper
  const closeSubjectModal = () => {
    setShowSubjectModal(false);
    setSubjectForm({});
    setEditingId(null);
  };

  const closeTopicModal = () => {
    setShowTopicModal(false);
    setTopicForm({});
    setEditingId(null);
  };

  const closeNoteModal = () => {
    setShowNoteModal(false);
    setNoteAbout({});
    setEditingId(null);
  };

  return (
    <div className="nsc-container">
      <div className="nsc-header">
        <div className="nsc-header-content">
          <h1 className="nsc-title">Content Creator</h1>
          <p className="nsc-subtitle">Manage subjects, topics, and notes</p>
        </div>
        <button
          className="nsc-create-btn"
          onClick={() => {
            if (isAdmin) {
              if (activeTab === "subjects") setShowSubjectModal(true);
              if (activeTab === "topics") setShowTopicModal(true);
              if (activeTab === "notes") setShowNoteModal(true);
            } else {
              alert(
                "Only admins can create new content. you need nexApex or nexRoot badge.",
              );
            }
          }}
        >
          <FiPlus /> Create New
        </button>
      </div>

      {/* Tabs */}
      <div className="nsc-tabs">
        {tabs.map((tab) => {
          const Icon = tabIcons[tab.id];
          return (
            <button
              key={tab.id}
              className={`nsc-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      {activeTab !== "subjects" && (
        <div className="nsc-filter-bar">
          <div className="nsc-filter-group">
            <label className="nsc-filter-label">Subject</label>
            <select
              className="nsc-filter-select"
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedTopic("");
              }}
            >
              <option value="">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          {activeTab === "notes" && (
            <div className="nsc-filter-group">
              <label className="nsc-filter-label">Topic</label>
              <select
                className="nsc-filter-select"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                disabled={!selectedSubject}
              >
                <option value="">All Topics</option>
                {filteredTopics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Content Area */}
      <div key={activeTab} className="nsc-content">
        {/* Subjects Grid */}
        {activeTab === "subjects" && (
          <div className="nsc-grid">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                topicCount={
                  topics.filter((t) => t.subjectID === subject.id).length
                }
                onEdit={() => {
                  setSubjectForm(subject);
                  setEditingId(subject.id);
                  setShowSubjectModal(true);
                }}
                onDelete={() => handleDeleteSubject(subject.id)}
              />
            ))}
          </div>
        )}

        {/* Topics List */}
        {activeTab === "topics" && (
          <div className="nsc-list">
            {filteredTopics.map((topic) => {
              const subject = subjects.find((s) => s.id === topic.subjectID);
              return (
                <ListItem
                  key={topic.id}
                  id={topic.id}
                  title={topic.title}
                  description={topic.description}
                  meta={`Subject: ${subject?.title || "Unknown"}`}
                  onEdit={() => {
                    setTopicForm(topic);
                    setEditingId(topic.id);
                    setSelectedSubject(topic.subjectID);
                    setShowTopicModal(true);
                  }}
                  onDelete={() => handleDeleteTopic(topic.id)}
                />
              );
            })}
          </div>
        )}

        {/* Notes List */}
        {activeTab === "notes" && (
          <div className="nsc-list">
            {filteredNotes.map((note) => {
              const topic = topics.find((t) => t.id === note.topicID);
              return (
                <ListItem
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  description={note.description}
                  meta={`Topic: ${topic?.title || "Unknown"}`}
                  type={note.type}
                  status={note.status}
                  published={note.published}
                  onEdit={() => {
                    setNoteAbout(note);
                    setEditingId(note.id);
                    const foundTopic = topics.find(
                      (t) => t.id === note.topicID,
                    );
                    if (foundTopic) {
                      setSelectedSubject(foundTopic.subjectID);
                      setSelectedTopic(foundTopic.id);
                    }
                    setShowNoteModal(true);
                  }}
                  onDelete={() => handleDeleteNote(note.id)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Subject Modal */}
      <CreatorModal
        isOpen={showSubjectModal}
        onClose={closeSubjectModal}
        onSave={editingId ? handleUpdateSubject : handleCreateSubject}
        title={editingId ? "Edit Subject" : "Create Subject"}
        isEditing={!!editingId}
      >
        <div className="nsc-form-group">
          <label className="nsc-label">Title</label>
          <input
            className="nsc-input"
            value={subjectForm.title || ""}
            onChange={(e) =>
              setSubjectForm({ ...subjectForm, title: e.target.value })
            }
            placeholder="Enter subject title"
          />
        </div>
        <div className="nsc-form-group">
          <label className="nsc-label">Description</label>
          <textarea
            className="nsc-input nsc-textarea"
            value={subjectForm.description || ""}
            onChange={(e) =>
              setSubjectForm({ ...subjectForm, description: e.target.value })
            }
            placeholder="Enter subject description"
          />
        </div>
        <div className="nsc-form-row">
          <div className="nsc-form-group">
            <label className="nsc-label">Department</label>
            <select
              className="nsc-input"
              value={subjectForm.departmentID || "none"}
              onChange={(e) =>
                setSubjectForm({ ...subjectForm, departmentID: e.target.value })
              }
            >
              <option value="none">none</option>
              {departments.map((d) => (
                <option key={d.id} value={d.code}>
                  {d.code}
                </option>
              ))}
            </select>
          </div>
          <div className="nsc-form-group">
            <label className="nsc-label">Academic Year</label>
            <select
              className="nsc-input"
              value={subjectForm.academicYear || 1}
              onChange={(e) =>
                setSubjectForm({
                  ...subjectForm,
                  academicYear: Number(e.target.value),
                })
              }
            >
              {[1, 2, 3, 4].map((y) => (
                <option key={y} value={y}>
                  Year {y}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="nsc-form-row">
          <div className="nsc-form-group">
            <label className="nsc-label">Semester (Optional)</label>
            <select
              className="nsc-input"
              value={subjectForm.semester || ""}
              onChange={(e) =>
                setSubjectForm({
                  ...subjectForm,
                  semester: e.target.value ? Number(e.target.value) : undefined,
                })
              }
            >
              <option value="">None</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>
          <div className="nsc-form-group">
            <label className="nsc-checkbox-label">
              <input
                type="checkbox"
                checked={subjectForm.isOfficial || false}
                onChange={(e) =>
                  setSubjectForm({
                    ...subjectForm,
                    isOfficial: e.target.checked,
                  })
                }
              />
              <span>Official Subject</span>
            </label>
          </div>
        </div>
      </CreatorModal>

      {/* Topic Modal */}
      <CreatorModal
        isOpen={showTopicModal}
        onClose={closeTopicModal}
        onSave={editingId ? handleUpdateTopic : handleCreateTopic}
        title={editingId ? "Edit Topic" : "Create Topic"}
        isEditing={!!editingId}
      >
        <div className="nsc-form-group">
          <label className="nsc-label">Subject</label>
          <select
            className="nsc-input"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={!!editingId}
          >
            <option value="">Select a subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="nsc-form-group">
          <label className="nsc-label">Title</label>
          <input
            className="nsc-input"
            value={topicForm.title || ""}
            onChange={(e) =>
              setTopicForm({ ...topicForm, title: e.target.value })
            }
            placeholder="Enter topic title"
          />
        </div>
        <div className="nsc-form-group">
          <label className="nsc-label">Description</label>
          <textarea
            className="nsc-input nsc-textarea"
            value={topicForm.description || ""}
            onChange={(e) =>
              setTopicForm({ ...topicForm, description: e.target.value })
            }
            placeholder="Enter topic description"
          />
        </div>
      </CreatorModal>

      {/* Note Modal */}
      <CreatorModal
        isOpen={showNoteModal}
        onClose={closeNoteModal}
        onSave={editingId ? handleUpdateNote : handleCreateNote}
        title={editingId ? "Edit Note" : "Create Note"}
        isEditing={!!editingId}
      >
        <div className="nsc-form-row">
          <div className="nsc-form-group">
            <label className="nsc-label">Subject</label>
            <select
              className="nsc-input"
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedTopic("");
              }}
              disabled={!!editingId}
            >
              <option value="">Select a subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <div className="nsc-form-group">
            <label className="nsc-label">Topic</label>
            <select
              className="nsc-input"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              disabled={!selectedSubject || !!editingId}
            >
              <option value="">Select a topic</option>
              {filteredTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="nsc-form-group">
          <label className="nsc-label">Title</label>
          <input
            className="nsc-input"
            value={noteAbout.title || ""}
            onChange={(e) =>
              setNoteAbout({ ...noteAbout, title: e.target.value })
            }
            placeholder="Enter note title"
          />
        </div>
        <div className="nsc-form-group">
          <label className="nsc-label">Description</label>
          <textarea
            className="nsc-input nsc-textarea"
            value={noteAbout.description || ""}
            onChange={(e) =>
              setNoteAbout({ ...noteAbout, description: e.target.value })
            }
            placeholder="Enter note description"
          />
        </div>
        <div className="nsc-form-row">
          <div className="nsc-form-group">
            <label className="nsc-label">Type</label>
            <select
              className="nsc-input"
              value={noteAbout.type || "note"}
              onChange={(e) =>
                setNoteAbout({ ...noteAbout, type: e.target.value as any })
              }
            >
              <option value="note">Note</option>
              <option value="pdf">PDF</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>
          <div className="nsc-form-group">
            <label className="nsc-label">Status</label>
            <select
              className="nsc-input"
              value={noteAbout.status || "pending"}
              onChange={(e) =>
                setNoteAbout({ ...noteAbout, status: e.target.value as any })
              }
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div className="nsc-form-row">
          <label className="nsc-label">Link dataset</label>
          <input
            type="file"
            className="nsc-input file"
            accept={
              noteAbout.type === "pdf"
                ? ".pdf"
                : noteAbout.type === "quiz"
                  ? ".json"
                  : ".md"
            }
            onChange={(e) => {
              setNoteFile(
                e.target.files?.[0]
                  ? URL.createObjectURL(e.target.files[0])
                  : undefined,
              );
            }}
          />
        </div>
        <div className="nsc-form-group">
          <label className="nsc-checkbox-label">
            <input
              type="checkbox"
              checked={noteAbout.published || false}
              onChange={(e) =>
                setNoteAbout({ ...noteAbout, published: e.target.checked })
              }
            />
            <span>Published</span>
          </label>
        </div>
      </CreatorModal>

      {/* Delete Confirmation Modal */}
      <CreatorModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() =>
          setDeleteConfirmation({ ...deleteConfirmation, isOpen: false })
        }
        onSave={confirmDelete}
        title={`Delete ${
          deleteConfirmation.type.charAt(0).toUpperCase() +
          deleteConfirmation.type.slice(1)
        }`}
        isEditing={true} // Reusing to show "Save" button as action, we might want to change text if possible or just accept "Save" => "Confirm" implication or we can check if CreatorModal supports custom button text.
      >
        <div className="nsc-form-group">
          <p className="nsc-label" style={{ fontSize: "1rem" }}>
            Are you sure you want to delete{" "}
            <strong>{deleteConfirmation.title}</strong>?
          </p>
          <p className="nsc-subtitle" style={{ marginTop: "0.5rem" }}>
            This action cannot be undone.
            {deleteConfirmation.type === "subject" &&
              " All related topics and notes will also be removed."}
            {deleteConfirmation.type === "topic" &&
              " All related notes will also be removed."}
          </p>
        </div>
      </CreatorModal>
    </div>
  );
}
