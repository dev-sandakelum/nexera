'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiEye } from 'react-icons/fi';
import Image from 'next/image';
import { NexeraUser } from '@/components/types';

export default function UserManagement() {
  const [users, setUsers] = useState<NexeraUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState<NexeraUser | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  // Define role badges (B1-B10 in badges.ts, adjust mapping as needed)
  const ROLE_BADGES = ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10'];

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch('/api/user-management');
      const data: NexeraUser[] = await res.json();
      setUsers(data || []);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  }

  function getRole(user: NexeraUser) {
    // Return first badge as role
    return user.badges?.[0]?.id || 'user';
  }

  async function changeBadge(userId: string, badgeId: string) {
    try {
      const res = await fetch('/api/user-management', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, action: 'change-badge', badgeId }),
      });
      if (!res.ok) return;

      const updated: NexeraUser = await res.json();
      syncUser(updated);
      setShowRoleModal(false);
    } catch (err) {
      console.error('Failed to update badge', err);
    }
  }

  async function toggleStatus(user: NexeraUser) {
    const nextStatus = user.status === 'active' ? 'disabled' : 'active';
    try {
      const res = await fetch('/api/user-management', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, action: 'toggle-status', status: nextStatus }),
      });
      if (!res.ok) return;

      const updated: NexeraUser = await res.json();
      syncUser(updated);
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  }

  function syncUser(updated: NexeraUser) {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    if (selectedUser?.id === updated.id) setSelectedUser(updated);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="userManagementContainer">
      <div className="header">
        <h1>User Management</h1>
        <p>Manage system users and permissions via badges</p>
      </div>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="emptyState"><p>No users found</p></div>
      ) : (
        <motion.div className="tableWrapper" variants={containerVariants} initial="hidden" animate="show">
          <table className="usersTable">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <motion.tr key={user.id} variants={rowVariants}>
                  <td className="userCell">
                    <div className="userInfo">
                      <div className="avatar" >
                        <Image src={user.profilePicture} alt={user.name} width={40} height={40} />
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td><span className="badge role">{getRole(user)}</span></td>
                  <td><span className={`badge status-${user.status}`}>{user.status || 'active'}</span></td>
                  <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</td>
                  <td className="actionsCell">
                    <button className="actionBtn view" onClick={() => { setSelectedUser(user); setShowViewModal(true); }}><FiEye /></button>
                    <button className="actionBtn edit" onClick={() => { setSelectedUser(user); setSelectedBadge(getRole(user)); setShowRoleModal(true); }}><FiEdit2 /></button>
                    <button className={`statusBtn ${user.status}`} onClick={() => toggleStatus(user)}>
                      {user.status === 'active' ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* VIEW MODAL */}
      {showViewModal && selectedUser && (
        <div className="modalOverlay" onClick={() => setShowViewModal(false)}>
          <motion.div className="modal" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modalHeader">
              <h2>{selectedUser.name}</h2>
              <button className="closeBtn" onClick={() => setShowViewModal(false)}>✕</button>
            </div>
            <div className="modalContent">
              <div className="field"><label>Email</label><p>{selectedUser.email}</p></div>
              <div className="field"><label>Role</label><p>{getRole(selectedUser)}</p></div>
              <div className="field"><label>Status</label><p>{selectedUser.status || 'active'}</p></div>
              <div className="field"><label>Last Login</label><p>{selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString() : 'Never'}</p></div>
              <div className="field"><label>Joined</label><p>{new Date(selectedUser.joinedAt).toLocaleString()}</p></div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ROLE MODAL */}
      {showRoleModal && selectedUser && (
        <div className="modalOverlay" onClick={() => setShowRoleModal(false)}>
          <motion.div className="roleModal" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modalHeader">
              <h2>Change Role Badge</h2>
              <button className="closeBtn" onClick={() => setShowRoleModal(false)}>✕</button>
            </div>
            <div className="roleList">
              {ROLE_BADGES.map(badge => (
                <button key={badge} className={`roleOption ${selectedBadge === badge ? 'selected' : ''}`} onClick={() => changeBadge(selectedUser.id, badge)}>
                  {badge}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
