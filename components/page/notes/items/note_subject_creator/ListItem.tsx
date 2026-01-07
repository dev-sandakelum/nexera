"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { typeColors, statusColors } from './functions';

interface ListItemProps {
  id: string;
  title: string;
  description: string;
  meta: string;
  onEdit: () => void;
  onDelete: () => void;
  // Optional: for notes with type/status badges
  type?: 'note' | 'pdf' | 'quiz';
  status?: 'pending' | 'approved' | 'rejected';
  published?: boolean;
}

export default function ListItem({
  id,
  title,
  description,
  meta,
  onEdit,
  onDelete,
  type,
  status,
  published
}: ListItemProps) {
  const showBadges = type || status || published;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="nsc-list-item"
    >
      <div className="nsc-list-item-content">
        {showBadges && (
          <div className="nsc-list-item-badges">
            {type && (
              <span 
                className="nsc-badge"
                style={{
                  background: typeColors[type].bg,
                  color: typeColors[type].fg
                }}
              >
                {type}
              </span>
            )}
            {status && (
              <span 
                className="nsc-badge"
                style={{
                  background: statusColors[status].bg,
                  color: statusColors[status].fg
                }}
              >
                {status}
              </span>
            )}
            {published && (
              <span 
                className="nsc-badge"
                style={{ background: '#dcfce7', color: '#15803d' }}
              >
                Published
              </span>
            )}
          </div>
        )}
        <h4 className="nsc-list-item-title">{title}</h4>
        <p className="nsc-list-item-desc">{description}</p>
        <span className="nsc-list-item-meta">{meta}</span>
      </div>
      <div className="nsc-list-item-actions">
        <button 
          className="nsc-action-btn"
          onClick={onEdit}
          aria-label="Edit item"
        >
          <FiEdit2 />
        </button>
        <button 
          className="nsc-action-btn danger"
          onClick={onDelete}
          aria-label="Delete item"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
}
