import React from "react";
import { motion } from "framer-motion";
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordData {
  current: string;
  new: string;
  confirm: string;
  showCurrent: boolean;
  showNew: boolean;
  showConfirm: boolean;
}

interface PasswordStrength {
  strength: number;
  label: string;
  color: string;
}

interface PasswordModalProps {
  setShowPasswordModal: (show: boolean) => void;
  passwordData: PasswordData;
  setPasswordData: (data: PasswordData) => void;
  passwordStrength: PasswordStrength;
}

export default function ShowPasswordModal({
  setShowPasswordModal,
  passwordData,
  setPasswordData,
  passwordStrength,
}: PasswordModalProps) {
  return (
    <div className="modalOverlay" onClick={() => setShowPasswordModal(false)}>
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
  );
}
