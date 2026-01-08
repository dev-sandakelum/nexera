"use client";
import { nexBadge, NexeraUser, nexSubject } from "@/components/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiHeart, FiMoreVertical, FiShield } from "react-icons/fi";
import OptionPanel from "../models/optionPanel";
import Link from "next/link";

export default function Card0({
  dataset,
  type,
  updateUserFavorites,
  users,
  badges,setClickedOnLink ,
}: {
  dataset: nexSubject[];
  type: string;
  updateUserFavorites: (subjectId: string, method: string) => void;
  users: NexeraUser[];
  badges: nexBadge[];
  setClickedOnLink: (clicked: boolean) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubjectID, setSelectedSubjectID] = useState("");
  const handleModalOpen = (e: any, subject: nexSubject) => {
    setSelectedSubjectID(subject.id);
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const handleModalClose = (e: any) => {
    e?.stopPropagation();
    setShowModal(false);
  };

  const handleFavoriteClick = (subjectId: string, method: string) => {
    updateUserFavorites(subjectId, method);
    setShowModal(false);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 16,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <>
      <motion.div
        className="objects"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="subjectsGrid" layout>
          <AnimatePresence mode="popLayout">
            {dataset.length === 0 ? (
              <motion.div
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FiHeart size={32} style={{ opacity: 0.5 }} />
                <p>No favorites found matching filters</p>
              </motion.div>
            ) : (
              <>
                {dataset.map((subject) => {
                  const badge = badges.find(
                    (b) =>
                      b.id ===
                      users.find((u) => u.id === subject.createdBy)?.badges["0"]
                        .id
                  );
                  return (
                    <motion.div
                      layout
                      key={subject.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      whileHover={{ y: -2 }}
                      className="subjectCard"
                    >
                      {/* Header with badges */}
                      <div className="cardHeader">
                        <div className="badgeGroup">
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
                            Y{subject.academicYear}
                          </span>
                          {subject.semester && (
                            <span className="badge badge-semester">
                              S{subject.semester}
                            </span>
                          )}
                        </div>

                        <button
                          className="moreBtn"
                          onClick={(e) => handleModalOpen(e, subject)}
                        >
                          <FiMoreVertical size={18} />
                        </button>
                      </div>

                      {/* Content */}
                      <Link
                        href={`/Notes/${subject.slug}`}
                        onClick={() => setClickedOnLink(true)}
                        className="cardContent"
                      >
                        <h3 className="cardTitle">{subject.title}</h3>
                        <p className="cardDescription">{subject.description}</p>
                      </Link>

                      {/* Footer */}
                      <div className="cardFooter">
                        <span
                          className={` badge-role-badge `}
                          style={{
                            // backgroundColor: badge?.color.bgColor,
                            // color: badge?.color.textColor,
                            // border: `1px solid ${badge?.color.borderColor}`,
                            borderRadius: "30px",
                            fontSize: "8px",
                            padding: "3px 8px",
                            color: "#878787ff",
                            transform: "translateY(2px)",
                            maxWidth: "200px",
                          }}
                        >
                          <p>Created under the authority of : </p>
                          <p
                            style={{
                              borderRadius: "30px",
                              fontSize: "11px",
                              marginTop: "1px",
                              color: "#626262ff",
                              fontWeight: "500",
                              marginLeft: "4px",
                            }}
                          >
                            {badge ? badge.name : "Unknown Creator"}
                          </p>
                        </span>

                        <button
                          className={`favoriteBtn ${
                            type == "favorites" ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFavoriteClick(
                              subject.id,
                              type == "favorites" ? "remove" : "add"
                            );
                          }}
                        >
                          <FiHeart
                            size={14}
                            fill={type == "favorites" ? "currentColor" : "none"}
                          />
                          {type == "favorites" ? "Saved" : "Save"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <OptionPanel
        handleFavoriteClick={handleFavoriteClick}
        handleModalClose={handleModalClose}
        isFavorite={type === "favorites"}
        showModal={showModal}
        subject={
          dataset.find((s) => s.id == selectedSubjectID) || ({} as nexSubject)
        }
        badges={badges}
        users={users}
        method={type === "favorites" ? "remove" : "add"}
      />
    </>
  );
}
