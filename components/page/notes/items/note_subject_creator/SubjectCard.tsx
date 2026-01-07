"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { nexSubject, nexTopic } from '@/components/types';

interface SubjectCardProps {
  subject: nexSubject;
  topicCount: number;
  onEdit: () => void;
  onDelete: () => void;
}

export default function SubjectCard({
  subject,
  topicCount,
  onEdit,
  onDelete
}: SubjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="nsc-card"
    >
      <div className="nsc-card-header">
        <div className="nsc-badge-group">
          {subject.isOfficial && (
            <span className="nsc-badge nsc-badge-official">
              Official
            </span>
          )}
          <span className="nsc-badge nsc-badge-dept">
            {subject.departmentID}
          </span>
          <span className="nsc-badge nsc-badge-year">
            Y{subject.academicYear}
          </span>
          {subject.semester && (
            <span className="nsc-badge nsc-badge-sem">
              S{subject.semester}
            </span>
          )}
        </div>
        <div className="nsc-card-actions">
          <button 
            className="nsc-action-btn"
            onClick={onEdit}
            aria-label="Edit subject"
          >
            <FiEdit2 />
          </button>
          <button 
            className="nsc-action-btn danger"
            onClick={onDelete}
            aria-label="Delete subject"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      <h3 className="nsc-card-title">{subject.title}</h3>
      <p className="nsc-card-desc">{subject.description}</p>
      <div className="nsc-card-footer">
        <span className="nsc-card-meta">
          {topicCount} topic{topicCount !== 1 ? 's' : ''}
        </span>
      </div>
    </motion.div>
  );
}
