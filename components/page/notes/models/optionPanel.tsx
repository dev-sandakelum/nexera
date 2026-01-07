import { nexSubject } from "@/components/types";
import { AnimatePresence, motion } from "framer-motion";
import { FiBookOpen, FiCalendar, FiExternalLink, FiHeart, FiShield, FiUser, FiX } from "react-icons/fi";

export default function OptionPanel({
  handleModalClose,
  handleFavoriteClick,
  isFavorite,
  subject,
  showModal,
  method,
}: {
  handleModalClose: (e?: any) => void;
  handleFavoriteClick: (subjectId: string, method: string) => void;
  isFavorite: boolean;
  subject: nexSubject;
  showModal: boolean;
  method: string;
}) {
  return (
    <AnimatePresence>
      {showModal && (
        <div className="modalOverlay" onClick={handleModalClose}>
          <motion.div
            className="subjectModal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="modalHeader">
              <h3>{subject.title}</h3>
              <button className="closeBtn" onClick={handleModalClose}>
                <FiX />
              </button>
            </div>

            <div className="modalContent">
              <div className="modalSection">
                <div className="modalBadges">
                  {subject.isOfficial && (
                    <span className="badge badge-official">
                      <FiShield size={12} />
                      Official
                    </span>
                  )}
                  <span className="badge badge-department">
                    {subject.departmentID}
                  </span>
                  <span className="badge badge-year">
                    Year {subject.academicYear}
                  </span>
                  {subject.semester && (
                    <span className="badge badge-semester">
                      Semester {subject.semester}
                    </span>
                  )}
                </div>
              </div>

              <div className="modalSection">
                <p className="modalDescription">{subject.description}</p>
              </div>

              <div className="modalSection modalInfo">
                <div className="infoRow">
                  <div className="infoItem">
                    <FiUser size={14} />
                    <span className="infoLabel">Created by</span>
                  </div>
                  <span
                    className={`badge badge-role badge-role-${subject.createdByRole}`}
                  >
                    {subject.createdByRole}
                  </span>
                </div>

                <div className="infoRow">
                  <div className="infoItem">
                    <FiCalendar size={14} />
                    <span className="infoLabel">Created</span>
                  </div>
                  <span className="infoValue">
                    {new Date(subject.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="infoRow">
                  <div className="infoItem">
                    <FiBookOpen size={14} />
                    <span className="infoLabel">Last Updated</span>
                  </div>
                  <span className="infoValue">
                    {new Date(subject.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="modalActions">
              <button
                className="modalBtn modalBtn-secondary"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button
                className={`modalBtn modalBtn-favorite ${
                  isFavorite ? "active" : ""
                }`}
                onClick={() => handleFavoriteClick(subject.id, method)}
              >
                <FiHeart
                  size={16}
                  fill={isFavorite ? "currentColor" : "none"}
                />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
              <a
                href={`/Notes/${subject.slug}`}
                className="modalBtn modalBtn-primary"
              >
                <FiExternalLink size={16} />
                Open Subject
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
