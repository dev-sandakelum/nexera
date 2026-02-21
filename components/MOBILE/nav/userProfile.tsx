import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiStar, FiZap, FiMapPin, FiMail, FiLogOut, FiLogIn, FiEdit } from 'react-icons/fi';
import { FaCrown, FaSeedling, FaShieldAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { NexeraUser } from '@/components/types';
import { nexBadges } from '@/public/json/badges';
import { useClerk } from "@clerk/nextjs";
import '@/components/styles/MOBILE/nav/userProfile.css';

interface MobileUserProfileProps {
  user: NexeraUser;
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'shield-star': <FaShieldAlt />,
  'crown': <FaCrown />,
  'star': <FiStar />,
  'bolt': <FiZap />,
  'seedling': <FaSeedling />,
};

export default function MobileUserProfile({
  user,
  isOpen,
  onClose
}: MobileUserProfileProps) {
  const router = useRouter();
  const { signOut } = useClerk();
  
  // Find user badges - handle both array and object structures (robust like desktop)
  const userBadgesList = React.useMemo(() => {
    if (!user?.badges) return [];
    
    // Normalize badges to an array whether it's an array or an object (Firebase-like)
    const rawBadges = Array.isArray(user.badges) 
      ? user.badges 
      : Object.values(user.badges);

    return rawBadges
      .map((b: any) => nexBadges.find(nb => nb.id === b.id))
      .filter((b): b is typeof nexBadges[0] => !!b);
  }, [user]);

  const handleLogOut = async () => {
    await signOut();
    onClose();
  };

  const handleEditInfo = () => {
    router.push('/Settings');
    onClose();
  };

  const isGuest = user?.id === "guest_000";

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
                   <div className="mup-badges-header">
                      <div className="mup-section-title">Badges</div>
                      <button 
                        className="mup-edit-info-btn"
                        onClick={handleEditInfo}
                        aria-label="Edit profile info"
                      >
                        <FiEdit />
                        Edit Info
                      </button>
                   </div>
                   <div className="mup-badges-grid">
                     {userBadgesList.map((badge) => (
                       <div 
                         key={badge.id} 
                         className="mup-badge"
                         style={{
                           backgroundColor: badge.color.bgColor,
                           color: badge.color.textColor,
                           borderColor: badge.color.borderColor
                         }}
                       >
                         <span className="mup-badge-icon">
                           {iconMap[badge.icon] || <FiStar />}
                         </span>
                         {badge.name}
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
                      <span className="mup-detail-label">
                        <FiMapPin style={{ marginRight: 4, display: 'inline', verticalAlign: 'text-bottom' }} /> 
                        Location
                      </span>
                      <span className="mup-detail-value">{user.location}</span>
                    </div>
                    <div className="mup-detail-item">
                      <span className="mup-detail-label">
                        <FiMail style={{ marginRight: 4, display: 'inline', verticalAlign: 'text-bottom' }} /> 
                        Email
                      </span>
                      <span className="mup-detail-value">{user.email}</span>
                    </div>
                 </div>
              </div>

              {/* Sign Out Button */}
              <div className="mup-section">
                <button 
                  className="mup-signout-btn" 
                  onClick={handleLogOut}
                >
                  <span className="btn-icon">
                    {isGuest ? <FiLogIn /> : <FiLogOut />}
                  </span>
                  {isGuest ? "Sign In" : "Sign Out"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
