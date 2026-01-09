"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { NexeraUser } from '@/components/types';
import { nexBadges } from '@/public/json/badges';
import '@/components/styles/MOBILE/nav/userProfile.css';

interface MobileUserProfileProps {
  user: NexeraUser;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileUserProfile({
  user,
  isOpen,
  onClose
}: MobileUserProfileProps) {
  
  // Find user badges
  const userBadgesList = (Array.isArray(user.badges) ? user.badges : []).map(b => 
    nexBadges.find(nb => nb.id === b.id)
  ).filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="mup-overlay" onClick={onClose}>
          {/* Backdrop animation handled by CSS/Parent or could be motion.div if needed */}
          
          <motion.div 
            className="mup-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="mup-header">
              <h2 className="mup-title">Profile</h2>
              <button 
                className="mup-close-btn"
                onClick={onClose}
                aria-label="Close profile"
              >
                <FiX />
              </button>
            </div>

            <div className="mup-content">
              {/* User Info */}
              <div className="mup-user-info">
                <div 
                  className="mup-avatar"
                  style={{ backgroundImage: `url(${user.profilePicture})` }}
                />
                <div className="mup-name-container">
                  <div className="mup-name">{user.name}</div>
                  <div className="mup-headline">{user.headline}</div>
                </div>
              </div>

              {/* Badges */}
              {userBadgesList.length > 0 && (
                <div className="mup-section">
                   <div className="mup-section-title">Badges</div>
                   <div className="mup-badges-grid">
                     {userBadgesList.map((badge) => (
                       <div 
                         key={badge!.id} 
                         className="mup-badge"
                         style={{
                           backgroundColor: badge!.color.bgColor,
                           color: badge!.color.textColor,
                           borderColor: badge!.color.borderColor
                         }}
                       >
                         <span className="mup-badge-icon">{badge!.icon}</span>
                         {badge!.name}
                       </div>
                     ))}
                   </div>
                </div>
              )}

              {/* Bio */}
              {user.bio && (
                 <div className="mup-section">
                    <div className="mup-section-title">Bio</div>
                    <div className="mup-bio">
                      {user.bio}
                    </div>
                 </div>
              )}

              {/* Contact & Location */}
              <div className="mup-section">
                 <div className="mup-section-title">Details</div>
                 <div className="mup-details-grid">
                    <div className="mup-detail-item">
                      <span className="mup-detail-label">Location</span>
                      <span className="mup-detail-value">{user.location}</span>
                    </div>
                    <div className="mup-detail-item">
                      <span className="mup-detail-label">Email</span>
                      <span className="mup-detail-value">{user.email}</span>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
