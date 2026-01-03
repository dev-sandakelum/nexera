import React from "react";
import { motion } from "framer-motion";
import { FiX, FiCamera } from "react-icons/fi";
import Image from "next/image";

interface AvatarModalProps {
  setShowAvatarModal: (show: boolean) => void;
  avatarPreview: string | null;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ShowAvatarModal({
  setShowAvatarModal,
  avatarPreview,
  handleAvatarChange,
}: AvatarModalProps) {
  return (
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
  );
}
