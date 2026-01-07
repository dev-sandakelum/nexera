"use client";
import { nexSubject } from "@/components/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiHeart, FiMoreVertical, FiShield } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import OptionPanel from "../models/optionPanel";

export default function Card0({
  dataset,
  type,
  updateUserFavorites,
}: {
  dataset: nexSubject[];
  type: string;
  updateUserFavorites: (subjectId: string, method: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = (e: any) => {
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
                {dataset.map((subject) => (
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

                      <button className="moreBtn" onClick={handleModalOpen}>
                        <FiMoreVertical size={18} />
                      </button>
                    </div>

                    {/* Content */}
                    <a href={`/Notes/${subject.slug}`} className="cardContent">
                      <h3 className="cardTitle">{subject.title}</h3>
                      <p className="cardDescription">{subject.description}</p>
                    </a>

                    {/* Footer */}
                    <div className="cardFooter">
                      <span
                        className={`badge badge-role badge-role-${subject.createdByRole}`}
                      >
                        {subject.createdByRole}
                      </span>

                      <button
                        className={`favoriteBtn ${
                          type == "favorite" ? "active" : ""
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
                ))}
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
        subject={dataset[0]}
        method={type === "favorites" ? "remove" : "add"}
      />
    </>
  );
}
