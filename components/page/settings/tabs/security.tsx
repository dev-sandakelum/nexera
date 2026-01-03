import React from "react";
import { FiCheck, FiLock, FiMonitor, FiShield } from "react-icons/fi";

export default function Security({
  user,
  setShowPasswordModal,
  setShowSessionsModal,
}: {
  user: any;
  setShowPasswordModal: (show: boolean) => void;
  setShowSessionsModal: (show: boolean) => void;
}) {
  return (
    <div className="securitySection">
      <div className="securityGrid">
        <div className="securityCard">
          <div className="cardHeader">
            <FiLock />
            <div>
              <h3>Password</h3>
              <p>Change your password regularly</p>
            </div>
          </div>
          <button
            className="cardAction"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </button>
        </div>

        <div className="securityCard">
          <div className="cardHeader">
            <FiShield />
            <div>
              <h3>Two-Factor Authentication</h3>
              <p>Add an extra layer of security</p>
            </div>
          </div>
          <label className="toggleSwitch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>

        <div className="securityCard">
          <div className="cardHeader">
            <FiMonitor />
            <div>
              <h3>Active Sessions</h3>
              <p>Manage your logged-in devices</p>
            </div>
          </div>
          <button
            className="cardAction"
            onClick={() => setShowSessionsModal(true)}
          >
            View Sessions
          </button>
        </div>

        <div className="infoCard">
          <div className="infoRow">
            <span className="infoLabel">Account Created</span>
            <span className="infoValue">
              {new Date(user.joinedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Last Login</span>
            <span className="infoValue">
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleDateString()
                : "Never"}
            </span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Account Status</span>
            <span className={`statusBadge ${user.status}`}>{user.status}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Email Verified</span>
            <span className="verifiedBadge">
              <FiCheck /> Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
