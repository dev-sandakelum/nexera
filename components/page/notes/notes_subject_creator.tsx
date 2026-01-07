"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSave, 
  FiX, 
  FiCheck,
  FiAlertCircle,
  FiBookOpen,
  FiLayers,
  FiUpload,
  FiFile,
  FiFileText,
  FiClipboard
} from 'react-icons/fi';

// Types matching your codebase
type nexSubject = {
  id: string;
  title: string;
  description: string;
  slug: string;
  departmentID: string;
  academicYear: number;
  semester?: number;
  createdBy: string;
  createdByRole: "nexRoot" | "nexPrime" | "nexUser";
  isOfficial: boolean;
  createdAt: string;
  updatedAt: string;
};

type nexTopic = {
  id: string;
  subjectID: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

type nexNoteAbout = {
  id: string;
  topicID: string;
  title: string;
  description: string;
  type: "note" | "pdf" | "quiz";
  slug: string;
  createdAt: string;
  published: boolean;
  publishedBy: string;
  updatedAt: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
};

// Mock current user
const currentUser = {
  id: "u_001",
  role: "nexPrime" as const
};

// Mock departments
const departments = [
  { id: "CS", name: "Computer Science", code: "CS" },
  { id: "IT", name: "Information Technology", code: "IT" },
  { id: "SE", name: "Software Engineering", code: "SE" }
];

export default function NotesSubjectCreator() {
  const [activeTab, setActiveTab] = useState<'subjects' | 'topics' | 'notes'>('subjects');
  const [subjects, setSubjects] = useState<nexSubject[]>([]);
  const [topics, setTopics] = useState<nexTopic[]>([]);
  const [notes, setNotes] = useState<nexNoteAbout[]>([]);
  
  // Modal states
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  
  // Form states
  const [subjectForm, setSubjectForm] = useState<Partial<nexSubject>>({});
  const [topicForm, setTopicForm] = useState<Partial<nexTopic>>({});
  const [noteForm, setNoteForm] = useState<Partial<nexNoteAbout>>({});
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  // Initialize with sample data
  useEffect(() => {
    const sampleSubject: nexSubject = {
      id: "sub_001",
      title: "Data Structures",
      description: "Learn fundamental data structures and algorithms",
      slug: "data-structures",
      departmentID: "CS",
      academicYear: 2,
      semester: 1,
      createdBy: currentUser.id,
      createdByRole: currentUser.role,
      isOfficial: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSubjects([sampleSubject]);
  }, []);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  // Subject CRUD
  const handleCreateSubject = () => {
    const newSubject: nexSubject = {
      id: `sub_${Date.now()}`,
      title: subjectForm.title || "",
      description: subjectForm.description || "",
      slug: generateSlug(subjectForm.title || ""),
      departmentID: subjectForm.departmentID || "CS",
      academicYear: subjectForm.academicYear || 1,
      semester: subjectForm.semester,
      createdBy: currentUser.id,
      createdByRole: currentUser.role,
      isOfficial: subjectForm.isOfficial || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSubjects([...subjects, newSubject]);
    setShowSubjectModal(false);
    setSubjectForm({});
  };

  const handleUpdateSubject = () => {
    if (!editingId) return;
    setSubjects(subjects.map(s => 
      s.id === editingId 
        ? { ...s, ...subjectForm, updatedAt: new Date().toISOString() }
        : s
    ));
    setShowSubjectModal(false);
    setSubjectForm({});
    setEditingId(null);
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
    setTopics(topics.filter(t => t.subjectID !== id));
    setNotes(notes.filter(n => {
      const topic = topics.find(t => t.id === n.topicID);
      return topic?.subjectID !== id;
    }));
  };

  // Topic CRUD
  const handleCreateTopic = () => {
    if (!selectedSubject) {
      alert("Please select a subject first");
      return;
    }
    const newTopic: nexTopic = {
      id: `topic_${Date.now()}`,
      subjectID: selectedSubject,
      title: topicForm.title || "",
      description: topicForm.description || "",
      slug: generateSlug(topicForm.title || ""),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTopics([...topics, newTopic]);
    setShowTopicModal(false);
    setTopicForm({});
  };

  const handleUpdateTopic = () => {
    if (!editingId) return;
    setTopics(topics.map(t => 
      t.id === editingId 
        ? { ...t, ...topicForm, updatedAt: new Date().toISOString() }
        : t
    ));
    setShowTopicModal(false);
    setTopicForm({});
    setEditingId(null);
  };

  const handleDeleteTopic = (id: string) => {
    setTopics(topics.filter(t => t.id !== id));
    setNotes(notes.filter(n => n.topicID !== id));
  };

  // Note CRUD
  const handleCreateNote = () => {
    if (!selectedTopic) {
      alert("Please select a topic first");
      return;
    }
    const newNote: nexNoteAbout = {
      id: `note_${Date.now()}`,
      topicID: selectedTopic,
      title: noteForm.title || "",
      description: noteForm.description || "",
      type: noteForm.type || "note",
      slug: generateSlug(noteForm.title || ""),
      createdAt: new Date().toISOString(),
      published: noteForm.published || false,
      publishedBy: currentUser.id,
      updatedAt: new Date().toISOString(),
      status: noteForm.status || "pending",
      approvedBy: noteForm.approvedBy
    };
    setNotes([...notes, newNote]);
    setShowNoteModal(false);
    setNoteForm({});
  };

  const handleUpdateNote = () => {
    if (!editingId) return;
    setNotes(notes.map(n => 
      n.id === editingId 
        ? { ...n, ...noteForm, updatedAt: new Date().toISOString() }
        : n
    ));
    setShowNoteModal(false);
    setNoteForm({});
    setEditingId(null);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  // Filter topics and notes based on selection
  const filteredTopics = selectedSubject 
    ? topics.filter(t => t.subjectID === selectedSubject)
    : topics;

  const filteredNotes = selectedTopic
    ? notes.filter(n => n.topicID === selectedTopic)
    : notes;

  const tabs = [
    { id: 'subjects' as const, label: 'Subjects', icon: FiBookOpen },
    { id: 'topics' as const, label: 'Topics', icon: FiLayers },
    { id: 'notes' as const, label: 'Notes', icon: FiFileText }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Content Creator</h1>
          <p style={styles.subtitle}>Manage subjects, topics, and notes</p>
        </div>
        <button 
          style={styles.createBtn}
          onClick={() => {
            if (activeTab === 'subjects') setShowSubjectModal(true);
            if (activeTab === 'topics') setShowTopicModal(true);
            if (activeTab === 'notes') setShowNoteModal(true);
          }}
        >
          <FiPlus /> Create New
        </button>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      {activeTab !== 'subjects' && (
        <div style={styles.filterBar}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Subject</label>
            <select 
              style={styles.filterSelect}
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedTopic("");
              }}
            >
              <option value="">All Subjects</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>
          {activeTab === 'notes' && (
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Topic</label>
              <select 
                style={styles.filterSelect}
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                disabled={!selectedSubject}
              >
                <option value="">All Topics</option>
                {filteredTopics.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={styles.content}
      >
        {/* Subjects List */}
        {activeTab === 'subjects' && (
          <div style={styles.grid}>
            <AnimatePresence mode="popLayout">
              {subjects.map(subject => (
                <motion.div
                  key={subject.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={styles.card}
                >
                  <div style={styles.cardHeader}>
                    <div style={styles.badgeGroup}>
                      {subject.isOfficial && (
                        <span style={{...styles.badge, ...styles.badgeOfficial}}>
                          Official
                        </span>
                      )}
                      <span style={{...styles.badge, ...styles.badgeDept}}>
                        {subject.departmentID}
                      </span>
                      <span style={{...styles.badge, ...styles.badgeYear}}>
                        Y{subject.academicYear}
                      </span>
                      {subject.semester && (
                        <span style={{...styles.badge, ...styles.badgeSem}}>
                          S{subject.semester}
                        </span>
                      )}
                    </div>
                    <div style={styles.cardActions}>
                      <button 
                        style={styles.actionBtn}
                        onClick={() => {
                          setSubjectForm(subject);
                          setEditingId(subject.id);
                          setShowSubjectModal(true);
                        }}
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        style={{...styles.actionBtn, ...styles.actionBtnDanger}}
                        onClick={() => handleDeleteSubject(subject.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <h3 style={styles.cardTitle}>{subject.title}</h3>
                  <p style={styles.cardDesc}>{subject.description}</p>
                  <div style={styles.cardFooter}>
                    <span style={styles.cardMeta}>
                      {topics.filter(t => t.subjectID === subject.id).length} topics
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Topics List */}
        {activeTab === 'topics' && (
          <div style={styles.list}>
            <AnimatePresence mode="popLayout">
              {filteredTopics.map(topic => {
                const subject = subjects.find(s => s.id === topic.subjectID);
                return (
                  <motion.div
                    key={topic.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    style={styles.listItem}
                  >
                    <div style={styles.listItemContent}>
                      <div>
                        <h4 style={styles.listItemTitle}>{topic.title}</h4>
                        <p style={styles.listItemDesc}>{topic.description}</p>
                        <span style={styles.listItemMeta}>
                          Subject: {subject?.title || "Unknown"}
                        </span>
                      </div>
                    </div>
                    <div style={styles.listItemActions}>
                      <button 
                        style={styles.actionBtn}
                        onClick={() => {
                          setTopicForm(topic);
                          setEditingId(topic.id);
                          setSelectedSubject(topic.subjectID);
                          setShowTopicModal(true);
                        }}
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        style={{...styles.actionBtn, ...styles.actionBtnDanger}}
                        onClick={() => handleDeleteTopic(topic.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Notes List */}
        {activeTab === 'notes' && (
          <div style={styles.list}>
            <AnimatePresence mode="popLayout">
              {filteredNotes.map(note => {
                const topic = topics.find(t => t.id === note.topicID);
                const typeColors = {
                  note: { bg: '#dbeafe', fg: '#1e40af' },
                  pdf: { bg: '#fef9c3', fg: '#a16207' },
                  quiz: { bg: '#dcfce7', fg: '#15803d' }
                };
                const statusColors = {
                  pending: { bg: '#fef9c3', fg: '#a16207' },
                  approved: { bg: '#dcfce7', fg: '#15803d' },
                  rejected: { bg: '#fee2e2', fg: '#b91c1c' }
                };
                return (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    style={styles.listItem}
                  >
                    <div style={styles.listItemContent}>
                      <div>
                        <div style={{display: 'flex', gap: '8px', marginBottom: '8px'}}>
                          <span style={{
                            ...styles.badge,
                            background: typeColors[note.type].bg,
                            color: typeColors[note.type].fg
                          }}>
                            {note.type}
                          </span>
                          <span style={{
                            ...styles.badge,
                            background: statusColors[note.status].bg,
                            color: statusColors[note.status].fg
                          }}>
                            {note.status}
                          </span>
                          {note.published && (
                            <span style={{...styles.badge, background: '#dcfce7', color: '#15803d'}}>
                              Published
                            </span>
                          )}
                        </div>
                        <h4 style={styles.listItemTitle}>{note.title}</h4>
                        <p style={styles.listItemDesc}>{note.description}</p>
                        <span style={styles.listItemMeta}>
                          Topic: {topic?.title || "Unknown"}
                        </span>
                      </div>
                    </div>
                    <div style={styles.listItemActions}>
                      <button 
                        style={styles.actionBtn}
                        onClick={() => {
                          setNoteForm(note);
                          setEditingId(note.id);
                          const foundTopic = topics.find(t => t.id === note.topicID);
                          if (foundTopic) {
                            setSelectedSubject(foundTopic.subjectID);
                            setSelectedTopic(foundTopic.id);
                          }
                          setShowNoteModal(true);
                        }}
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        style={{...styles.actionBtn, ...styles.actionBtnDanger}}
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Subject Modal */}
      <AnimatePresence>
        {showSubjectModal && (
          <div style={styles.modalOverlay} onClick={() => setShowSubjectModal(false)}>
            <motion.div 
              style={styles.modal}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>
                  {editingId ? 'Edit Subject' : 'Create Subject'}
                </h2>
                <button 
                  style={styles.closeBtn}
                  onClick={() => {
                    setShowSubjectModal(false);
                    setSubjectForm({});
                    setEditingId(null);
                  }}
                >
                  <FiX />
                </button>
              </div>
              <div style={styles.modalContent}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Title</label>
                  <input
                    style={styles.input}
                    value={subjectForm.title || ''}
                    onChange={(e) => setSubjectForm({...subjectForm, title: e.target.value})}
                    placeholder="Enter subject title"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Description</label>
                  <textarea
                    style={{...styles.input, minHeight: '80px', resize: 'vertical'}}
                    value={subjectForm.description || ''}
                    onChange={(e) => setSubjectForm({...subjectForm, description: e.target.value})}
                    placeholder="Enter subject description"
                  />
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Department</label>
                    <select
                      style={styles.input}
                      value={subjectForm.departmentID || 'CS'}
                      onChange={(e) => setSubjectForm({...subjectForm, departmentID: e.target.value})}
                    >
                      {departments.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Academic Year</label>
                    <select
                      style={styles.input}
                      value={subjectForm.academicYear || 1}
                      onChange={(e) => setSubjectForm({...subjectForm, academicYear: Number(e.target.value)})}
                    >
                      {[1, 2, 3, 4].map(y => (
                        <option key={y} value={y}>Year {y}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Semester (Optional)</label>
                    <select
                      style={styles.input}
                      value={subjectForm.semester || ''}
                      onChange={(e) => setSubjectForm({...subjectForm, semester: e.target.value ? Number(e.target.value) : undefined})}
                    >
                      <option value="">None</option>
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={subjectForm.isOfficial || false}
                        onChange={(e) => setSubjectForm({...subjectForm, isOfficial: e.target.checked})}
                      />
                      <span>Official Subject</span>
                    </label>
                  </div>
                </div>
              </div>
              <div style={styles.modalActions}>
                <button 
                  style={styles.btnSecondary}
                  onClick={() => {
                    setShowSubjectModal(false);
                    setSubjectForm({});
                    setEditingId(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  style={styles.btnPrimary}
                  onClick={editingId ? handleUpdateSubject : handleCreateSubject}
                >
                  <FiSave /> {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Topic Modal */}
      <AnimatePresence>
        {showTopicModal && (
          <div style={styles.modalOverlay} onClick={() => setShowTopicModal(false)}>
            <motion.div 
              style={styles.modal}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>
                  {editingId ? 'Edit Topic' : 'Create Topic'}
                </h2>
                <button 
                  style={styles.closeBtn}
                  onClick={() => {
                    setShowTopicModal(false);
                    setTopicForm({});
                    setEditingId(null);
                  }}
                >
                  <FiX />
                </button>
              </div>
              <div style={styles.modalContent}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Subject</label>
                  <select
                    style={styles.input}
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    disabled={!!editingId}
                  >
                    <option value="">Select a subject</option>
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Title</label>
                  <input
                    style={styles.input}
                    value={topicForm.title || ''}
                    onChange={(e) => setTopicForm({...topicForm, title: e.target.value})}
                    placeholder="Enter topic title"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Description</label>
                  <textarea
                    style={{...styles.input, minHeight: '80px', resize: 'vertical'}}
                    value={topicForm.description || ''}
                    onChange={(e) => setTopicForm({...topicForm, description: e.target.value})}
                    placeholder="Enter topic description"
                  />
                </div>
              </div>
              <div style={styles.modalActions}>
                <button 
                  style={styles.btnSecondary}
                  onClick={() => {
                    setShowTopicModal(false);
                    setTopicForm({});
                    setEditingId(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  style={styles.btnPrimary}
                  onClick={editingId ? handleUpdateTopic : handleCreateTopic}
                >
                  <FiSave /> {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Note Modal */}
      <AnimatePresence>
        {showNoteModal && (
          <div style={styles.modalOverlay} onClick={() => setShowNoteModal(false)}>
            <motion.div 
              style={styles.modal}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>
                  {editingId ? 'Edit Note' : 'Create Note'}
                </h2>
                <button 
                  style={styles.closeBtn}
                  onClick={() => {
                    setShowNoteModal(false);
                    setNoteForm({});
                    setEditingId(null);
                  }}
                >
                  <FiX />
                </button>
              </div>
              <div style={styles.modalContent}>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Subject</label>
                    <select
                      style={styles.input}
                      value={selectedSubject}
                      onChange={(e) => {
                        setSelectedSubject(e.target.value);
                        setSelectedTopic("");
                      }}
                      disabled={!!editingId}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Topic</label>
                    <select
                      style={styles.input}
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      disabled={!selectedSubject || !!editingId}
                    >
                      <option value="">Select a topic</option>
                      {filteredTopics.map(t => (
                        <option key={t.id} value={t.id}>{t.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Title</label>
                  <input
                    style={styles.input}
                    value={noteForm.title || ''}
                    onChange={(e) => setNoteForm({...noteForm, title: e.target.value})}
                    placeholder="Enter note title"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Description</label>
                  <textarea
                    style={{...styles.input, minHeight: '80px', resize: 'vertical'}}
                    value={noteForm.description || ''}
                    onChange={(e) => setNoteForm({...noteForm, description: e.target.value})}
                    placeholder="Enter note description"
                  />
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Type</label>
                    <select
                      style={styles.input}
                      value={noteForm.type || 'note'}
                      onChange={(e) => setNoteForm({...noteForm, type: e.target.value as any})}
                    >
                      <option value="note">Note</option>
                      <option value="pdf">PDF</option>
                      <option value="quiz">Quiz</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Status</label>
                    <select
                      style={styles.input}
                      value={noteForm.status || 'pending'}
                      onChange={(e) => setNoteForm({...noteForm, status: e.target.value as any})}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={noteForm.published || false}
                      onChange={(e) => setNoteForm({...noteForm, published: e.target.checked})}
                    />
                    <span>Published</span>
                  </label>
                </div>
              </div>
              <div style={styles.modalActions}>
                <button 
                  style={styles.btnSecondary}
                  onClick={() => {
                    setShowNoteModal(false);
                    setNoteForm({});
                    setEditingId(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  style={styles.btnPrimary}
                  onClick={editingId ? handleUpdateNote : handleCreateNote}
                >
                  <FiSave /> {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    minHeight: '100vh',
    padding: '96px 64px 64px',
    color: '#34343e',
    background: '#eff3fc'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  headerContent: {
    flex: 1,
    minWidth: '250px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 600,
    color: '#34343e',
    margin: '0 0 4px 0'
  },
  subtitle: {
    fontSize: '14px',
    color: '#34343e',
    opacity: 0.7,
    margin: 0
  },
  createBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: '#7b7dee',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    background: '#fbfbfb',
    padding: '8px',
    borderRadius: '12px',
    marginBottom: '24px',
    border: '1px solid #caced5',
    overflowX: 'auto'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: 'transparent',
    color: '#34343e',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    opacity: 0.7,
    whiteSpace: 'nowrap'
  },
  tabActive: {
    background: '#7b7dee',
    color: 'white',
    opacity: 1
  },
  filterBar: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    background: '#fbfbfb',
    borderRadius: '12px',
    border: '1px solid #caced5',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
    minWidth: '200px'
  },
  filterLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#34343e',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    opacity: 0.7
  },
  filterSelect: {
    padding: '10px 12px',
    background: '#eff3fc',
    border: '1px solid #caced5',
    borderRadius: '8px',
    color: '#34343e',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  content: {
    minHeight: '400px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px'
  },
  card: {
    background: '#fbfbfb',
    border: '1px solid #caced5',
    borderRadius: '16px',
    padding: '20px',
    transition: 'all 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '12px'
  },
  badgeGroup: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    whiteSpace: 'nowrap'
  },
  badgeOfficial: {
    background: '#dcfce7',
    color: '#15803d'
  },
  badgeDept: {
    background: '#dbeafe',
    color: '#1e40af'
  },
  badgeYear: {
    background: '#e0d7ff',
    color: '#5b31d8'
  },
  badgeSem: {
    background: '#cffafe',
    color: '#0e7490'
  },
  cardActions: {
    display: 'flex',
    gap: '8px'
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    background: '#eff3fc',
    color: '#34343e',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s'
  },
  actionBtnDanger: {
    color: '#ef4444'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#34343e',
    margin: '0 0 8px 0',
    lineHeight: 1.3
  },
  cardDesc: {
    fontSize: '13px',
    color: '#34343e',
    opacity: 0.7,
    margin: '0 0 12px 0',
    lineHeight: 1.5
  },
  cardFooter: {
    paddingTop: '12px',
    borderTop: '1px solid #caced5'
  },
  cardMeta: {
    fontSize: '12px',
    color: '#34343e',
    opacity: 0.6
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fbfbfb',
    border: '1px solid #caced5',
    borderRadius: '12px',
    padding: '20px',
    transition: 'all 0.2s',
    gap: '16px'
  },
  listItemContent: {
    flex: 1,
    minWidth: 0
  },
  listItemTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#34343e',
    margin: '0 0 6px 0'
  },
  listItemDesc: {
    fontSize: '13px',
    color: '#34343e',
    opacity: 0.7,
    margin: '0 0 8px 0',
    lineHeight: 1.5
  },
  listItemMeta: {
    fontSize: '12px',
    color: '#34343e',
    opacity: 0.6
  },
  listItemActions: {
    display: 'flex',
    gap: '8px',
    flexShrink: 0
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    background: '#fbfbfb',
    borderRadius: '20px',
    maxWidth: '560px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #caced5'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#34343e',
    margin: 0
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#34343e',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    fontSize: '20px',
    transition: 'all 0.2s'
  },
  modalContent: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
  },
  formRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  },
  label: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#34343e',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    opacity: 0.8
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    background: '#eff3fc',
    border: '1px solid #caced5',
    borderRadius: '8px',
    color: '#34343e',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'all 0.2s'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#34343e',
    cursor: 'pointer',
    marginTop: '8px'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid #caced5'
  },
  btnSecondary: {
    padding: '10px 20px',
    background: 'transparent',
    color: '#34343e',
    border: '1px solid #caced5',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  btnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 24px',
    background: '#7b7dee',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
};