"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiShield,
  FiSettings,
  FiLock,
  FiActivity,
  FiLink,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
  FiTrash2,
  FiMail,
  FiBell,
  FiRefreshCw,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiAlertCircle,
  FiMonitor,
  FiDownload,
  FiLogOut,
  FiGlobe,
} from "react-icons/fi";
import { BsGithub, BsGoogle, BsFacebook } from "react-icons/bs";
import Image from "next/image";
import { NexeraUser } from "@/components/types";
import Security from "./tabs/security";
import Preferences from "./tabs/preferences";
import Privacy from "./tabs/privacy";
import Activity from "./tabs/activity";
import Connected from "./tabs/connected";
import Danger from "./tabs/danger";
import Profile from "./tabs/profile";

type TabType =
  | "profile"
  | "security"
  | "preferences"
  | "privacy"
  | "activity"
  | "connected"
  | "danger";

const tabs = [
  { id: "profile" as TabType, label: "Profile", icon: FiUser },
  { id: "security" as TabType, label: "Security", icon: FiShield },
  { id: "preferences" as TabType, label: "Preferences", icon: FiSettings },
  { id: "privacy" as TabType, label: "Privacy", icon: FiLock },
  { id: "activity" as TabType, label: "Activity", icon: FiActivity },
  { id: "connected" as TabType, label: "Connected", icon: FiLink },
  { id: "danger" as TabType, label: "Danger Zone", icon: FiAlertCircle },
];

export default function UserProfile({
  initialUser,
}: {
  initialUser: NexeraUser;
}) {
  const [user] = useState<NexeraUser>(initialUser);
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Modals
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);

  // Dummy states
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [completeness] = useState(75); // Dummy completeness

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password)
      return {
        strength: 0,
        label: "No password",
        color: "var(--theme-colorE75)",
      };
    if (password.length < 6)
      return { strength: 25, label: "Weak", color: "var(--danger-soft)" };
    if (password.length < 10)
      return { strength: 50, label: "Fair", color: "var(--warning-soft)" };
    if (password.length < 14)
      return { strength: 75, label: "Good", color: "var(--accent-soft)" };
    return { strength: 100, label: "Strong", color: "var(--success-soft)" };
  };

  const passwordStrength = getPasswordStrength(passwordData.new);

  return (
    <div className="userProfileContainer">
      <div className="profileHeader">
        <div className="headerContent">
          <h1>My Profile</h1>
          <p>Manage your account settings and preferences</p>
        </div>
        <div className="headerActions">
          {!isEditing ? (
            <button className="editBtn" onClick={() => setIsEditing(true)}>
              <FiEdit2 /> Edit Profile
            </button>
          ) : (
            <>
              <button className="cancelBtn" onClick={() => setIsEditing(false)}>
                <FiX /> Cancel
              </button>
              <button className="saveBtn" onClick={() => setIsEditing(false)}>
                <FiSave /> Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {/* Completeness Bar */}
      <div className="completenessBar">
        <div className="completenessHeader">
          <span>Profile Completeness</span>
          <span className="completenessPercent">{completeness}%</span>
        </div>
        <div className="completenessTrack">
          <motion.div
            className="completenessFill"
            initial={{ width: 0 }}
            animate={{ width: `${completeness}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="profileTabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        className="tabContent"
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* PROFILE TAB */}
        {activeTab === "profile" && (
         <Profile user={user} isEditing={isEditing} setShowAvatarModal={setShowAvatarModal} />
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <Security
            setShowPasswordModal={setShowPasswordModal}
            setShowSessionsModal={setShowSessionsModal}
            user={user}
          />
        )}

        {/* PREFERENCES TAB */}
        {activeTab === "preferences" && <Preferences />}

        {/* PRIVACY TAB */}
        {activeTab === "privacy" && <Privacy />}

        {/* ACTIVITY TAB */}
        {activeTab === "activity" && <Activity />}

        {/* CONNECTED TAB */}
        {activeTab === "connected" && (
         <Connected/>
        )}

        {/* DANGER ZONE TAB */}
        {activeTab === "danger" && (
         <Danger setShowDeleteModal={setShowDeleteModal}/>
        )}
      </motion.div>

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <div
          className="modalOverlay"
          onClick={() => setShowPasswordModal(false)}
        >
          <motion.div
            className="modal passwordModal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="modalHeader">
              <h2>Change Password</h2>
              <button
                className="closeBtn"
                onClick={() => setShowPasswordModal(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="modalContent">
              <div className="formGroup">
                <label>Current Password</label>
                <div className="passwordInput">
                  <input
                    type={passwordData.showCurrent ? "text" : "password"}
                    className="formInput"
                    value={passwordData.current}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        current: e.target.value,
                      })
                    }
                  />
                  <button
                    className="passwordToggle"
                    onClick={() =>
                      setPasswordData({
                        ...passwordData,
                        showCurrent: !passwordData.showCurrent,
                      })
                    }
                  >
                    {passwordData.showCurrent ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="formGroup">
                <label>New Password</label>
                <div className="passwordInput">
                  <input
                    type={passwordData.showNew ? "text" : "password"}
                    className="formInput"
                    value={passwordData.new}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, new: e.target.value })
                    }
                  />
                  <button
                    className="passwordToggle"
                    onClick={() =>
                      setPasswordData({
                        ...passwordData,
                        showNew: !passwordData.showNew,
                      })
                    }
                  >
                    {passwordData.showNew ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className="passwordStrength">
                  <div className="strengthBar">
                    <motion.div
                      className="strengthFill"
                      style={{ backgroundColor: passwordStrength.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                  <span style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
              </div>

              <div className="formGroup">
                <label>Confirm New Password</label>
                <div className="passwordInput">
                  <input
                    type={passwordData.showConfirm ? "text" : "password"}
                    className="formInput"
                    value={passwordData.confirm}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirm: e.target.value,
                      })
                    }
                  />
                  <button
                    className="passwordToggle"
                    onClick={() =>
                      setPasswordData({
                        ...passwordData,
                        showConfirm: !passwordData.showConfirm,
                      })
                    }
                  >
                    {passwordData.showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="modalActions">
                <button
                  className="cancelBtn"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="saveBtn"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Update Password
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* AVATAR MODAL */}
      {showAvatarModal && (
        <div className="modalOverlay" onClick={() => setShowAvatarModal(false)}>
          <motion.div
            className="modal avatarModal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="modalHeader">
              <h2>Change Profile Picture</h2>
              <button
                className="closeBtn"
                onClick={() => setShowAvatarModal(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="modalContent avatarContent">
              <div className="avatarPreview">
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt="Preview"
                    width={150}
                    height={150}
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <div className="avatarPlaceholder large">
                    <FiCamera />
                  </div>
                )}
              </div>

              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />

              <label htmlFor="avatarInput" className="uploadBtn">
                <FiCamera /> Choose Photo
              </label>

              <div className="modalActions">
                <button
                  className="cancelBtn"
                  onClick={() => setShowAvatarModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="saveBtn"
                  onClick={() => setShowAvatarModal(false)}
                >
                  Upload
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteModal && (
        <div className="modalOverlay" onClick={() => setShowDeleteModal(false)}>
          <motion.div
            className="modal deleteModal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="modalHeader danger">
              <FiAlertCircle />
              <h2>Delete Account</h2>
            </div>

            <div className="modalContent">
              <p className="warningText">
                This action is <strong>permanent</strong> and cannot be undone.
                All your data will be permanently deleted.
              </p>

              <div className="formGroup">
                <label>Type "DELETE" to confirm</label>
                <input type="text" className="formInput" placeholder="DELETE" />
              </div>

              <div className="modalActions">
                <button
                  className="cancelBtn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="deleteBtn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Delete My Account
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* SESSIONS MODAL */}
      {showSessionsModal && (
        <div
          className="modalOverlay"
          onClick={() => setShowSessionsModal(false)}
        >
          <motion.div
            className="modal sessionsModal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="modalHeader">
              <h2>Active Sessions</h2>
              <button
                className="closeBtn"
                onClick={() => setShowSessionsModal(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="modalContent">
              <div className="sessionsList">
                <div className="sessionItem current">
                  <FiMonitor />
                  <div className="sessionInfo">
                    <h4>Chrome on Windows</h4>
                    <p>Colombo, Sri Lanka • 192.168.1.1</p>
                    <span>Current session</span>
                  </div>
                  <span className="currentBadge">Active</span>
                </div>

                <div className="sessionItem">
                  <FiMonitor />
                  <div className="sessionInfo">
                    <h4>Firefox on MacOS</h4>
                    <p>New York, USA • 192.168.1.2</p>
                    <span>Last active: 2 days ago</span>
                  </div>
                  <button className="logoutBtn">Logout</button>
                </div>
              </div>

              <button className="logoutAllBtn">
                <FiLogOut /> Logout from all devices
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
