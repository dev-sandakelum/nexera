import React from "react";
import { FiAlertCircle, FiLock, FiTrash2 } from "react-icons/fi";

export default function Danger({
  setShowDeleteModal,
}: {
  setShowDeleteModal: (show: any) => void;
}) {
  return (
    <div className="dangerSection">
      <div className="dangerCard">
        <div className="dangerHeader">
          <FiAlertCircle />
          <div>
            <h3>Logout from all devices</h3>
            <p>This will sign you out from all active sessions</p>
          </div>
        </div>
        <button className="dangerBtn">Logout Everywhere</button>
      </div>

      <div className="dangerCard">
        <div className="dangerHeader">
          <FiLock />
          <div>
            <h3>Disable Account</h3>
            <p>Temporarily disable your account</p>
          </div>
        </div>
        <button className="dangerBtn">Disable Account</button>
      </div>

      <div className="dangerCard severe">
        <div className="dangerHeader">
          <FiTrash2 />
          <div>
            <h3>Delete Account</h3>
            <p>Permanently delete your account and all data</p>
          </div>
        </div>
        <button
          className="dangerBtn severe"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
