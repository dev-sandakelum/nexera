'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiEye, FiRefreshCw, FiSearch, FiCheck, FiXCircle } from 'react-icons/fi';
import Image from 'next/image';
import { NexeraUser } from '@/components/types';

const ROLE_BADGES = ['nex_001','nex_002','nex_003','nex_004','nex_005','nex_006','nex_007','nex_008','nex_009','nex_010'];

export default function UserManagement() {
  const [users, setUsers] = useState<NexeraUser[]>([]);
  const [loading, setLoading] = useState(true);

  // --- MODAL & SELECTION STATES ---
  const [selectedUser, setSelectedUser] = useState<NexeraUser | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Edit Form States
  const [pendingBadge, setPendingBadge] = useState<string | null>(null);
  const [pendingStatus, setPendingStatus] = useState<string>('active');

  // --- FILTER & SORT STATES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- DERIVED STATE ---
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    let result = [...users];

    // 1. Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(lowerQuery) || 
        u.email.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Filter Role
    if (filterRole !== 'all') {
      result = result.filter(u => u.badges?.[0]?.id === filterRole);
    }

    // 3. Filter Status
    if (filterStatus !== 'all') {
      result = result.filter(u => (u.status || 'active') === filterStatus);
    }

    // 4. Sort
    result.sort((a, b) => {
      const dateA = new Date(a.joinedAt).getTime();
      const dateB = new Date(b.joinedAt).getTime();
      switch (sortBy) {
        case 'date-desc': return dateB - dateA;
        case 'date-asc': return dateA - dateB;
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        default: return 0;
      }
    });

    return result;
  }, [users, searchQuery, filterRole, filterStatus, sortBy]);

  // --- API ACTIONS ---

  async function fetchUsers(isBackground = false) {
    if (!isBackground) setLoading(true);
    try {
      const res = await fetch('/api/user-management');
      const data = await res.json();
      setUsers(data || []);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      if (!isBackground) setLoading(false);
    }
  }

  // --- EDIT LOGIC ---

  function openEditModal(user: NexeraUser) {
    setSelectedUser(user);
    setPendingBadge(getRole(user));
    setPendingStatus(user.status || 'active');
    setShowEditModal(true);
  }

  async function saveChanges() {
    if (!selectedUser) return;
    
    try {
      const promises = [];
      const currentRole = getRole(selectedUser);
      const currentStatus = selectedUser.status || 'active';

      // 1. Update Role if changed
      if (pendingBadge && pendingBadge !== currentRole) {
        promises.push(
          fetch('/api/user-management', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: selectedUser.id, action: 'change-badge', badgeId: pendingBadge }),
          })
        );
      }

      // 2. Update Status if changed
      if (pendingStatus !== currentStatus) {
        promises.push(
          fetch('/api/user-management', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: selectedUser.id, action: 'toggle-status', status: pendingStatus }),
          })
        );
      }

      if (promises.length > 0) {
        await Promise.all(promises);
        setShowEditModal(false);
        fetchUsers(true);
      } else {
        setShowEditModal(false);
      }
    } catch (err) {
      console.error('Failed to update user', err);
    }
  }

  async function toggleStatusRow(user: NexeraUser) {
    const nextStatus = user.status === 'active' ? 'disabled' : 'active';
    try {
      const res = await fetch('/api/user-management', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, action: 'toggle-status', status: nextStatus }),
      });
      if (res.ok) fetchUsers(true); 
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  }

  const getRole = (u: NexeraUser) => u.badges?.[0]?.id || 'User';

  return (
    <div className="userManagementContainer">
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1>User Management</h1>
          <button onClick={() => fetchUsers(false)} className="actionBtn" title="Refresh Data">
            <FiRefreshCw className={loading ? 'spin' : ''} />
          </button>
        </div>
        <p>Manage system users, roles, and access status</p>
      </div>

      {/* --- FILTER CONTROLS --- */}
      <div className="filterControls">
        <div className="filterGroup" style={{ flex: 2 }}>
          <label className="filterLabel">Search</label>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              className="formInput" 
              placeholder="Search by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
            <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
          </div>
        </div>
        <div className="filterGroup">
          <label className="filterLabel">Role</label>
          <select className="filterSelect" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="all">All Roles</option>
            {ROLE_BADGES.map(badge => <option key={badge} value={badge}>{badge}</option>)}
          </select>
        </div>
        <div className="filterGroup">
          <label className="filterLabel">Status</label>
          <select className="filterSelect" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <div className="filterGroup">
          <label className="filterLabel">Sort By</label>
          <select className="filterSelect" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>
      </div>

      {/* --- TABLE AREA --- */}
      {loading ? (
        <div className="loading">Loading users...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="emptyState">
          <p>No users found matching your filters.</p>
          <button 
            onClick={() => { setSearchQuery(''); setFilterRole('all'); setFilterStatus('all'); }} 
            style={{ marginTop: '10px', textDecoration: 'underline', background:'none', border:'none', cursor:'pointer', color: 'blue' }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="tableWrapper">
          <table className="usersTable">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody style={{ position: 'relative' }}>
              <AnimatePresence initial={false}>
                {filteredUsers.map(user => (
                  <motion.tr 
                    key={user.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="userCell" data-label="User">
                      <div className="userInfo">
                        <div className="avatar">
                           {user.profilePicture ? (
                             <Image src={user.profilePicture} alt={user.name} width={32} height={32} style={{borderRadius:'50%'}} />
                           ) : (
                             <div className="avatarPlaceholder">{user.name.charAt(0)}</div>
                           )}
                        </div>
                        <span className="userName">{user.name}</span>
                      </div>
                    </td>
                    <td data-label="Email" className="emailCell">{user.email}</td>
                    <td data-label="Role"><span className="badge role-badge">{getRole(user)}</span></td>
                    <td data-label="Status">
                      <span className={`badge status-${user.status || 'active'}`}>{user.status || 'active'}</span>
                    </td>
                    <td data-label="Joined" className="dateCell">{new Date(user.joinedAt).toLocaleDateString()}</td>
                    <td className="actionsCell" data-label="Actions">
                      <button className="actionBtn view" onClick={() => { setSelectedUser(user); setShowViewModal(true); }}>
                        <FiEye />
                      </button>
                      <button className="actionBtn edit" onClick={() => openEditModal(user)}>
                        <FiEdit2 />
                      </button>
                      {/* <button 
                        className={`actionBtn toggle ${user.status === 'disabled' ? 'activate' : 'disable'}`}
                        onClick={() => toggleStatusRow(user)}
                        title={user.status === 'active' ? "Disable User" : "Activate User"}
                      >
                         {user.status === 'disabled' ? <FiCheck /> : <FiXCircle />}
                      </button> */}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* --- VIEW PROFILE MODAL (Polished) --- */}
      {showViewModal && selectedUser && (
        <div className="modalOverlay" onClick={() => setShowViewModal(false)}>
          <motion.div 
            className="modal" 
            onClick={e => e.stopPropagation()} 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="modalHeader">
              <h2>User Details</h2>
              <button className="closeBtn" onClick={() => setShowViewModal(false)}>✕</button>
            </div>

            <div className="modalContent">
              {/* Profile Header Block */}
              <div className="viewProfileHeader">
                <div className="avatarLarge">
                  {selectedUser.profilePicture ? (
                    <Image src={selectedUser.profilePicture} alt={selectedUser.name} width={64} height={64} style={{borderRadius:'50%'}} />
                  ) : (
                    <span style={{fontSize: '24px', color: '#fff'}}>{selectedUser.name.charAt(0)}</span>
                  )}
                </div>
                <div className="viewProfileTexts">
                  <h3>{selectedUser.name}</h3>
                  <p className="userId">ID: {selectedUser.id}</p>
                </div>
              </div>

              <hr className="divider" />

              {/* Data Grid */}
              <div className="viewInfoGrid">
                <div className="viewField">
                  <label>Email Address</label>
                  <p>{selectedUser.email}</p>
                </div>
                
                <div className="viewFieldRow">
                  <div className="viewField">
                    <label>Role</label>
                    <p>{getRole(selectedUser)}</p>
                  </div>
                  <div className="viewField">
                    <label>Status</label>
                    <p style={{textTransform: 'capitalize'}}>{selectedUser.status || 'active'}</p>
                  </div>
                </div>

                <div className="viewFieldRow">
                  <div className="viewField">
                     <label>Joined</label>
                     <p>{new Date(selectedUser.joinedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="viewField">
                    <label>Last Login</label>
                    <p>{selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString() : '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* --- EDIT MODAL (Role & Status) --- */}
      {showEditModal && selectedUser && (
        <div className="modalOverlay" onClick={() => setShowEditModal(false)}>
          <motion.div className="modal" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modalHeader">
              <h2>Edit User</h2>
              <button className="closeBtn" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <div className="modalContent">
              
              <div className="formGroup">
                 <label className="filterLabel" style={{marginBottom:'8px', display:'block'}}>Account Status</label>
                 <select 
                   className="formInput" 
                   value={pendingStatus} 
                   onChange={(e) => setPendingStatus(e.target.value)}
                 >
                   <option value="active">Active</option>
                   <option value="disabled">Disabled</option>
                 </select>
              </div>

              <div>
                <label className="filterLabel" style={{marginBottom:'8px', display:'block'}}>Role Badge</label>
                <div className="badgeGrid">
                  {ROLE_BADGES.map(badge => (
                    <button 
                      key={badge} 
                      className={`badgeOption ${pendingBadge === badge ? 'selected' : ''}`} 
                      onClick={() => setPendingBadge(badge)}
                    >
                      {badge}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modalActions">
                <button className="cancelBtn" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="saveBtn" onClick={saveChanges}>Save Changes</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}