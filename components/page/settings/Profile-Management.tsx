"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiRefreshCw,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiAlertCircle,
  FiBell,
  FiMonitor,
  FiDownload,
  FiLogOut,
  FiGlobe,
  FiClock,
} from "react-icons/fi";
import { BsGithub, BsGoogle, BsFacebook } from "react-icons/bs";
import Image from "next/image";
import { NexeraUser } from "@/components/types";
import Profile from "./tabs/profile";
import Preferences from "./tabs/preferences";
import Security from "./tabs/security";
import Privacy from "./tabs/privacy";
import Activity from "./tabs/activity";
import Connected from "./tabs/connected";
import Danger from "./tabs/danger";
import ShowPasswordModal from "./models/PasswordModal";
import ShowAvatarModal from "./models/AvatarModal";
import ShowDeleteModal from "./models/DeleteModal";
import ShowSessionsModal from "./models/SessionsModal";

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
  const [user, setUser] = useState<NexeraUser>(initialUser);
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState<Partial<NexeraUser>>({});

  // Modals
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);

  // Password fields
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  });

  // Avatar upload
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Delete account
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Profile completeness
  const [completeness, setCompleteness] = useState(0);

  useEffect(() => {
    calculateCompleteness();
  }, [user]);

  const calculateCompleteness = () => {
    const fields = [
      user.name,
      user.email,
      user.profilePicture && user.profilePicture !== "/img/profile_pic/0.jpg",
      user.headline,
      user.bio,
      user.location,
      user.academic.institution,
      user.academic.degree,
      user.academic.fieldOfStudy,
    ];
    const filled = fields.filter(Boolean).length;
    setCompleteness(Math.round((filled / fields.length) * 100));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({});
      setIsEditing(false);
    } else {
      setEditData({ ...user });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const updated = await response.json();
        setUser(updated);
        setIsEditing(false);
        setEditData({});
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;

    const formData = new FormData();
    formData.append("avatar", avatarFile);
    formData.append("userId", user.id);

    try {
      const response = await fetch("/api/user/avatar", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        setUser({ ...user, profilePicture: url });
        setShowAvatarModal(false);
        setAvatarPreview(null);
        setAvatarFile(null);
      }
    } catch (error) {
      console.error("Failed to upload avatar:", error);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.new !== passwordData.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.current,
          newPassword: passwordData.new,
        }),
      });

      if (response.ok) {
        setShowPasswordModal(false);
        setPasswordData({
          current: "",
          new: "",
          confirm: "",
          showCurrent: false,
          showNew: false,
          showConfirm: false,
        });
        alert("Password changed successfully");
      }
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      alert("Please type DELETE to confirm");
      return;
    }

    try {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      if (response.ok) {
        alert("Account deleted successfully");
        // Redirect to home or logout
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
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
            <button className="editBtn" onClick={handleEditToggle}>
              <FiEdit2 /> Edit Profile
            </button>
          ) : (
            <>
              <button className="cancelBtn" onClick={handleEditToggle}>
                <FiX /> Cancel
              </button>
              <button
                className="saveBtn"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? <FiRefreshCw className="spin" /> : <FiSave />}
                {isSaving ? "Saving..." : "Save Changes"}
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
          <Profile
            user={user}
            setUser={setUser}
            editData={editData as NexeraUser}
            isEditing={isEditing}
            setEditData={setEditData}
            setShowAvatarModal={setShowAvatarModal}
          />
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <Security
            user={user}
            setShowPasswordModal={setShowPasswordModal}
            setShowSessionsModal={setShowSessionsModal}
          />
        )}

        {/* PREFERENCES TAB */}
        {activeTab === "preferences" && <Preferences />}

        {/* PRIVACY TAB */}
        {activeTab === "privacy" && <Privacy />}

        {/* ACTIVITY TAB */}
        {activeTab === "activity" && <Activity />}

        {/* CONNECTED TAB */}
        {activeTab === "connected" && <Connected />}

        {/* DANGER ZONE TAB */}
        {activeTab === "danger" && (
          <Danger setShowDeleteModal={setShowDeleteModal} />
        )}
      </motion.div>

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <ShowPasswordModal
          setShowPasswordModal={setShowPasswordModal}
          passwordData={passwordData}
          setPasswordData={setPasswordData}
          passwordStrength={passwordStrength}
          handlePasswordChange={handlePasswordChange}
        />
      )}

      {/* AVATAR MODAL */}
      {showAvatarModal && (
        <ShowAvatarModal
          setShowAvatarModal={setShowAvatarModal}
          avatarPreview={avatarPreview}
          avatarFile={avatarFile}
          handleAvatarChange={handleAvatarChange}
          handleAvatarUpload={handleAvatarUpload}
        />
      )}

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteModal && (
       <ShowDeleteModal
         setShowDeleteModal={setShowDeleteModal}
         deleteConfirmText={deleteConfirmText}
         setDeleteConfirmText={setDeleteConfirmText}
         handleDeleteAccount={handleDeleteAccount}
       />
      )}

      {/* SESSIONS MODAL */}
      {showSessionsModal && (
        <ShowSessionsModal 
          setShowSessionsModal={setShowSessionsModal}
        />
      )}
    </div>
  );
}
