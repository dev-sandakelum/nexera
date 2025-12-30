'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiEye, FiRefreshCw, FiSave, FiX } from 'react-icons/fi';
import { nexNoteAbout } from '@/components/types';

export default function NotesManagement() {
  const [notes, setNotes] = useState<nexNoteAbout[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal & Selection States
  const [selectedNote, setSelectedNote] = useState<nexNoteAbout | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  // Edit Form State
  const [editFormData, setEditFormData] = useState<Partial<nexNoteAbout>>({});
  const [isUpdating, setIsUpdating] = useState(false);

  // Filter & Sort States
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPublisher, setFilterPublisher] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');

  useEffect(() => {
    fetchNotes();
  }, []);

  // --- DERIVED STATE (Filters) ---
  const uniquePublishers = useMemo(() => {
    const authors = notes.map((note) => note.publishedBy).filter((a): a is string => !!a);
    return Array.from(new Set(authors)).sort();
  }, [notes]);

  const filteredNotes = useMemo(() => {
    if (!notes) return [];
    let result = [...notes];

    // Filter Type
    if (filterType !== 'all') {
      result = result.filter((n) => n.type?.toLowerCase() === filterType.toLowerCase());
    }
    // Filter Status
    if (filterStatus !== 'all') {
      const isPublished = filterStatus === 'published';
      result = result.filter((n) => n.published === isPublished);
    }
    // Filter Publisher
    if (filterPublisher !== 'all') {
      result = result.filter((n) => n.publishedBy === filterPublisher);
    }
    // Filter Date
    if (filterDate !== 'all') {
      const now = new Date();
      const filterDate_ms = getDateRangeMilliseconds(filterDate, now);
      result = result.filter((n) => new Date(n.createdAt).getTime() >= filterDate_ms);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'date-desc': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
        default: return 0;
      }
    });
    return result;
  }, [notes, filterType, filterStatus, filterPublisher, filterDate, sortBy]);

  function getDateRangeMilliseconds(range: string, now: Date): number {
    const ms = now.getTime();
    switch (range) {
      case 'today': return ms - 24 * 60 * 60 * 1000;
      case 'week': return ms - 7 * 24 * 60 * 60 * 1000;
      case 'month': return ms - 30 * 24 * 60 * 60 * 1000;
      case 'year': return ms - 365 * 24 * 60 * 60 * 1000;
      default: return 0;
    }
  }

  // --- API ACTIONS ---

  /**
   * Fetches notes from the API.
   * @param isBackground If true, does not trigger the full-screen loading spinner.
   */
  async function fetchNotes(isBackground = false) {
    if (!isBackground) setLoading(true);
    try {
      const response = await fetch('/api/notes-management');
      const data = await response.json();
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      if (!isBackground) setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/notes-management?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setConfirmDelete(null);
        // Refresh list from server to ensure sync
        await fetchNotes(true); 
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  // --- UPDATE LOGIC ---

  function openEditModal(note: nexNoteAbout) {
    setEditFormData({ ...note }); 
    setShowEditModal(true);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editFormData.id) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/notes-management`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        setShowEditModal(false);
        // Refresh list from server to ensure sync (background refresh)
        await fetchNotes(true);
      } else {
        console.error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating note:', error);
    } finally {
      setIsUpdating(false);
    }
  }

  // Handle Input Changes
  function handleInputChange(field: keyof nexNoteAbout, value: any) {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  }

  function clearAllFilters() {
    setFilterType('all');
    setFilterStatus('all');
    setFilterPublisher('all');
    setFilterDate('all');
  }

  return (
    <div className="notesManagementContainer">
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1>Note Management</h1>
          <button onClick={() => fetchNotes(false)} className="actionBtn" title="Refresh Data">
            <FiRefreshCw className={loading ? 'spin' : ''} />
          </button>
        </div>
        <p>Manage all notes in the system</p>
      </div>

      {/* --- FILTERS --- */}
      <div className="filterControls" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <div className="filterGroup">
          <label className="filterLabel">Type</label>
          <select className="filterSelect" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="note">Note</option>
            <option value="pdf">PDF</option>
            <option value="quiz">Quiz</option>
          </select>
        </div>
        <div className="filterGroup">
          <label className="filterLabel">Status</label>
          <select className="filterSelect" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div className="filterGroup">
          <label className="filterLabel">Publisher</label>
          <select className="filterSelect" value={filterPublisher} onChange={(e) => setFilterPublisher(e.target.value)}>
            <option value="all">All Publishers</option>
            {uniquePublishers.map((pub) => <option key={pub} value={pub}>{pub}</option>)}
          </select>
        </div>
        <div className="filterGroup">
          <label className="filterLabel">Date</label>
          <select className="filterSelect" value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <div className="filterGroup">
          <label className="filterLabel">Sort By</label>
          <select className="filterSelect" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
      </div>

      {/* --- TABLE --- */}
      {loading ? (
        <div className="loading">Loading notes...</div>
      ) : filteredNotes.length === 0 ? (
        <div className="emptyState">
          <p>No notes found matching your filters.</p>
          <button onClick={clearAllFilters} style={{ marginTop: '10px', textDecoration: 'underline', background:'none', border:'none', cursor:'pointer', color: 'blue' }}>Clear Filters</button>
        </div>
      ) : (
        <div className="tableWrapper">
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
            <tbody style={{ position: 'relative' }}>
              <AnimatePresence initial={false}>
                {filteredNotes.map((note) => (
                  <motion.tr
                    key={note.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="titleCell" data-label="Title">{note.title}</td>
                    <td data-label="Type"><span className={`badge type-${note.type}`}>{note.type}</span></td>
                    <td data-label="Status">
                      <span className={`badge status-${note.published ? 'published' : 'draft'}`}>
                        {note.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="dateCell" data-label="Created">{new Date(note.createdAt).toLocaleDateString()}</td>
                    <td className="authorCell" data-label="Published By">{note.publishedBy || '-'}</td>
                    <td className="actionsCell" data-label="Actions">
                      <button className="actionBtn view" onClick={() => { setSelectedNote(note); setShowViewModal(true); }}>
                        <FiEye />
                      </button>
                      <button className="actionBtn edit" onClick={() => openEditModal(note)}>
                        <FiEdit2 />
                      </button>
                      <button className="actionBtn delete" onClick={() => setConfirmDelete(note.id)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* --- VIEW MODAL --- */}
      {showViewModal && selectedNote && (
        <div className="modalOverlay" onClick={() => setShowViewModal(false)}>
          <motion.div className="modal" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modalHeader">
              <h2>{selectedNote.title}</h2>
              <button className="closeBtn" onClick={() => setShowViewModal(false)}>✕</button>
            </div>
            <div className="modalContent">
               <div className="field"><label>Type</label><p>{selectedNote.type}</p></div>
               <div className="field"><label>Description</label><p>{selectedNote.description || '-'}</p></div>
               <div className="field"><label>Status</label><p>{selectedNote.published ? 'Published' : 'Draft'}</p></div>
               <div className="field"><label>Published By</label><p>{selectedNote.publishedBy}</p></div>
               <div className="field"><label>Created</label><p>{new Date(selectedNote.createdAt).toLocaleString()}</p></div>
            </div>
          </motion.div>
        </div>
      )}

      {/* --- EDIT MODAL --- */}
      {showEditModal && (
        <div className="modalOverlay" onClick={() => setShowEditModal(false)}>
          <motion.div className="modal" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modalHeader">
              <h2>Edit Note</h2>
              <button className="closeBtn" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            
            <form className="modalContent formGrid" onSubmit={handleUpdate}>
              <div className="formGroup">
                <label>Title</label>
                <input 
                  type="text" 
                  value={editFormData.title || ''} 
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="formInput"
                  required
                />
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label>Type</label>
                  <select 
                    value={editFormData.type || 'note'} 
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="formSelect"
                  >
                    <option value="note">Note</option>
                    <option value="pdf">PDF</option>
                    <option value="quiz">Quiz</option>
                  </select>
                </div>

                <div className="formGroup">
                  <label>Status</label>
                  <select 
                    value={editFormData.published ? 'true' : 'false'} 
                    onChange={(e) => handleInputChange('published', e.target.value === 'true')}
                    className="formSelect"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </div>
              </div>

              <div className="formGroup">
                <label>Description</label>
                <textarea 
                  value={editFormData.description || ''} 
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="formTextarea"
                  rows={4}
                />
              </div>

              <div className="modalActions">
                <button type="button" className="cancelBtn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="saveBtn" disabled={isUpdating}>
                  {isUpdating ? <FiRefreshCw className="spin" /> : <FiSave />}
                  {isUpdating ? ' Saving...' : ' Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* --- DELETE CONFIRM --- */}
      {confirmDelete && (
         <div className="modalOverlay" onClick={() => setConfirmDelete(null)}>
           <motion.div className="confirmModal" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
             <p>Are you sure you want to delete this note?</p>
             <div className="confirmButtons">
               <button className="confirmBtn cancel" onClick={() => setConfirmDelete(null)}>Cancel</button>
               <button className="confirmBtn danger" onClick={() => handleDelete(confirmDelete)}>Delete</button>
             </div>
           </motion.div>
         </div>
      )}
    </div>
  );
}