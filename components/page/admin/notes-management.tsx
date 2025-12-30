'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { nexNoteAbout } from '@/components/types'; // adjust path if needed

export default function NotesManagement() {
  const [notes, setNotes] = useState<nexNoteAbout[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<nexNoteAbout | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const response = await fetch('/api/notes-management');
      const data = await response.json();
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/notes-management?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        setConfirmDelete(null);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="notesManagementContainer">
      <div className="header">
        <h1>Note Management</h1>
        <p>Manage all notes in the system</p>
      </div>

      {loading ? (
        <div className="loading">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="emptyState">
          <p>No notes found</p>
        </div>
      ) : (
        <motion.div
          className="tableWrapper"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <table className="notesTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created</th>
                <th>Published By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <motion.tr key={note.id} variants={rowVariants}>
                  <td className="titleCell">{note.title}</td>

                  <td>
                    <span className={`badge type-${note.type}`}>
                      {note.type}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge status-${
                        note.published ? 'published' : 'draft'
                      }`}
                    >
                      {note.published ? 'Published' : 'Draft'}
                    </span>
                  </td>

                  <td className="dateCell">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </td>

                  <td className="authorCell">
                    {note.publishedBy || '-'}
                  </td>

                  <td className="actionsCell">
                    <button
                      className="actionBtn view"
                      onClick={() => {
                        setSelectedNote(note);
                        setShowModal(true);
                      }}
                      title="View"
                    >
                      <FiEye />
                    </button>

                    <button className="actionBtn edit" title="Edit">
                      <FiEdit2 />
                    </button>

                    <button
                      className="actionBtn delete"
                      onClick={() => setConfirmDelete(note.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* VIEW MODAL */}
      {showModal && selectedNote && (
        <div className="modalOverlay" onClick={() => setShowModal(false)}>
          <motion.div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modalHeader">
              <h2>{selectedNote.title}</h2>
              <button
                className="closeBtn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modalContent">
              <div className="field">
                <label>Type</label>
                <p>{selectedNote.type}</p>
              </div>

              <div className="field">
                <label>Status</label>
                <p>{selectedNote.published ? 'Published' : 'Draft'}</p>
              </div>

              <div className="field">
                <label>Description</label>
                <p>{selectedNote.description || '-'}</p>
              </div>

              <div className="field">
                <label>Published</label>
                <p>{selectedNote.published ? 'Yes' : 'No'}</p>
              </div>

              <div className="field">
                <label>Published By</label>
                <p>{selectedNote.publishedBy || '-'}</p>
              </div>

              <div className="field">
                <label>Created</label>
                <p>{new Date(selectedNote.createdAt).toLocaleString()}</p>
              </div>

              <div className="field">
                <label>Updated</label>
                <p>{new Date(selectedNote.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {confirmDelete && (
        <div className="modalOverlay" onClick={() => setConfirmDelete(null)}>
          <motion.div
            className="confirmModal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p>Are you sure you want to delete this note?</p>
            <div className="confirmButtons">
              <button
                className="confirmBtn cancel"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="confirmBtn danger"
                onClick={() => handleDelete(confirmDelete)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
