import React from "react";
import { motion } from "framer-motion";
import { FiX, FiMonitor, FiLogOut } from "react-icons/fi";

interface Session {
  id: string;
  device: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

interface SessionsModalProps {
  setShowSessionsModal: (show: boolean) => void;
}

export default function ShowSessionsModal({
  setShowSessionsModal,
}: SessionsModalProps) {
  return (
    <div className="modalOverlay" onClick={() => setShowSessionsModal(false)}>
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
  );
}
