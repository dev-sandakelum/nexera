"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave } from 'react-icons/fi';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  isEditing: boolean;
  children: React.ReactNode;
}

export default function CreatorModal({
  isOpen,
  onClose,
  onSave,
  title,
  isEditing,
  children
}: CreatorModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="nsc-modal-overlay" onClick={onClose}>
          <motion.div 
            className="nsc-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="nsc-modal-header">
              <h2 className="nsc-modal-title">{title}</h2>
              <button 
                className="nsc-close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>
            <div className="nsc-modal-content">
              {children}
            </div>
            <div className="nsc-modal-actions">
              <button 
                className="nsc-btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                className="nsc-btn-primary"
                onClick={onSave}
              >
                <FiSave /> {isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
