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
import { BlobToFile } from "@/components/converts/blob-to-file";
import { UploadFile } from "@/utils/supabase/storage/client";

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
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { refreshUser, updateUser: updateUserContext } = useUser();
  //profile form state
  const { user } = useUser();
  const [formUser, setFormUser] = useState<NexeraUser>(user || {} as NexeraUser);
  if(!user){
    return <div>Loading...</div>;
  }
  // Modals
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [avatarUpdated, setAvatarUpdated] = useState(false);

  // Dummy states
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.profilePicture || null);
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

  const handleAvatarUpdate = () => {
    console.log("Avatar updated with preview URL:", avatarPreview);
  };

  // Sync formUser with user context when user changes
  useEffect(() => {
    setFormUser(user);
  }, [user]);

  async function handleUpdateUser() {
    setIsSaving(true);
    if (avatarUpdated && avatarPreview) {
      try {
        const avatarUrl = avatarPreview;
        const imgBlob = await BlobToFile(avatarUrl, "avatar.png");

        const { imageURL, error } = await UploadFile({
          userId: user?.id || "",
          file: imgBlob,
          bucket: "users",
          path: `profile_pic3/${user?.id || ""}`,
        });

        if (error) {
          console.error("Error uploading user avatar:", error);
          throw new Error(error.message);
        }

        if (imageURL) {
          formUser.profilePicture = imageURL;
        }
      } catch (err: any) {
        console.error("Error uploading user avatar:", err.message);
      }
    }
    setAvatarUpdated(false);
    try {
      const response = await UpdateUser(user?.id || "", formUser);

      if (response.success && response.user) {
        // ✅ Update context with new user data
        updateUserContext(response.user);

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
              <button
                className="cancelBtn"
                onClick={() => {
                  setIsEditing(false);
                  setFormUser(user);
                  setAvatarUpdated(false);
                }}
              >
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
            avatarPreview={avatarPreview}
            avatarUpdated={avatarUpdated}
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
          handleAvatarUpdate={handleAvatarUpdate}
          setAvatarUpdated={setAvatarUpdated}
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
