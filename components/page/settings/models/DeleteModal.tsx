import React from "react";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

interface DeleteModalProps {
  setShowDeleteModal: (show: boolean) => void;}

export default function ShowDeleteModal({
  setShowDeleteModal,
}: DeleteModalProps) {
  return (
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
  )
}
