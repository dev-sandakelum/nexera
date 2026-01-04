"use client";

import { useEffect, useState } from "react";
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
import ShowPasswordModal from "./models/PasswordModal";
import ShowAvatarModal from "./models/AvatarModal";
import ShowDeleteModal from "./models/DeleteModal";
import ShowSessionsModal from "./models/SessionsModal";
import { UpdateUser } from "@/components/firebase/update-user";
import { useUser } from "@/contexts/UserContext";

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

export default function UserProfile() {
  const { user, setUser, refreshUser } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  //profile form state
  const [formUser, setFormUser] = useState<NexeraUser>(user);

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
  // Sync formUser with user context when user changes
  useEffect(() => {
    setFormUser(user);
  }, [user]);

  async function handleUpdateUser() {
    setIsSaving(true);

    try {
      const response = await UpdateUser(user.id, formUser);

      if (response.success && response.user) {
        // ✅ Update context with new user data
        setUser(response.user);

        // ✅ Also refresh from server to be sure
        await refreshUser();

        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert(response.error || "Update failed");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  }

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
              <button
                className="saveBtn"
                onClick={handleUpdateUser}
                disabled={isSaving}
              >
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
            user={formUser}
            formUser={formUser}
            setFormUser={setFormUser}
            isEditing={isEditing}
            setShowAvatarModal={setShowAvatarModal}
            handleUpdateUser={handleUpdateUser}
          />
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <Security
            setShowPasswordModal={setShowPasswordModal}
            setShowSessionsModal={setShowSessionsModal}
            user={formUser}
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
        />
      )}

      {/* AVATAR MODAL */}
      {showAvatarModal && (
        <ShowAvatarModal
          setShowAvatarModal={setShowAvatarModal}
          avatarPreview={avatarPreview}
          handleAvatarChange={handleAvatarChange}
        />
      )}

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteModal && (
        <ShowDeleteModal setShowDeleteModal={setShowDeleteModal} />
      )}

      {/* SESSIONS MODAL */}
      {showSessionsModal && (
        <ShowSessionsModal setShowSessionsModal={setShowSessionsModal} />
      )}
    </div>
  );
}
