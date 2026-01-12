"use client";
import { nexBadge, NexeraUser, nexSubject } from "@/components/types";
import { useState } from "react";
import { FiHeart, FiMoreVertical, FiShield } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";
import OptionPanel from "../models/optionPanel";
import Link from "next/link";
import { nexBadges } from "@/public/json/badges";

export default function Card0({
  favorites,
  suggestions,
  updateUserFavorites,
  users,
  badges,
  setClickedOnLink,
}: {
  favorites: nexSubject[];
  suggestions: nexSubject[];
  updateUserFavorites: (subjectId: string, method: string) => void;
  users: NexeraUser[];
  badges: nexBadge[];
  setClickedOnLink: (clicked: boolean) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubjectID, setSelectedSubjectID] = useState("");
  const [selectedType, setSelectedType] = useState<"favorites" | "suggestions">("favorites");
  
  const handleModalOpen = (e: any, subject: nexSubject, type: "favorites" | "suggestions") => {
    setSelectedSubjectID(subject.id);
    setSelectedType(type);
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

  return (
    <>
      <div className="objects">
        <div className="subjectsGrid">
          {/* FAVORITES SECTION */}
          {favorites.length > 0 && (
            <>
              <div className="notesSection" style={{ gridColumn: '1 / -1' }}>
                <div className="sectionHeader">
                  <GrFavorite size={20} />
                  <span>Favorites</span>
                  <span className="count">{favorites.length}</span>
                </div>
              </div>
              
              {favorites.map((subject) => {
                const badge = nexBadges.find(
                  (b) =>
                    b.id ===
                    users.find((u) => u.id === subject.createdBy)?.badges["0"]
                      .id
                );
                return (
                  <div
                    key={subject.id}
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
                        onClick={(e) => handleModalOpen(e, subject, "favorites")}
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
                          borderRadius: "30px",
                          fontSize: "8px",
                          padding: "3px 8px",
                          color: "var(--muted)",
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
                            color: "var(--muted)",
                            fontWeight: "500",
                            marginLeft: "4px",
                          }}
                        >
                          {badge ? badge.name : "Unknown Creator"}
                        </p>
                      </span>

                      <button
                        className="favoriteBtn active"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleFavoriteClick(subject.id, "remove");
                        }}
                      >
                        <FiHeart size={14} fill="currentColor" />
                        Saved
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* SUGGESTIONS SECTION */}
          {suggestions.length > 0 && (
            <>
              <div className="notesSection" style={{ gridColumn: '1 / -1' }}>
                <div className="sectionHeader">
                  <GiWorld size={20} />
                  <span>Suggestions</span>
                  <span className="count">{suggestions.length}</span>
                </div>
              </div>
              
              {suggestions.map((subject) => {
                const badge = nexBadges.find(
                  (b) =>
                    b.id ===
                    users.find((u) => u.id === subject.createdBy)?.badges["0"]
                      .id
                );
                return (
                  <div
                    key={subject.id}
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
                        onClick={(e) => handleModalOpen(e, subject, "suggestions")}
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
                          borderRadius: "30px",
                          fontSize: "8px",
                          padding: "3px 8px",
                          color: "var(--muted)",
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
                            color: "var(--muted)",
                            fontWeight: "500",
                            marginLeft: "4px",
                          }}
                        >
                          {badge ? badge.name : "Unknown Creator"}
                        </p>
                      </span>

                      <button
                        className="favoriteBtn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleFavoriteClick(subject.id, "add");
                        }}
                      >
                        <FiHeart size={14} fill="none" />
                        Save
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* EMPTY STATE */}
          {favorites.length === 0 && suggestions.length === 0 && (
            <div className="empty-state">
              <FiHeart size={32} style={{ opacity: 0.5 }} />
              <p>No subjects found matching filters</p>
            </div>
          )}
        </div>
        <div style={{minHeight:"30px"}}></div>
      </div>
      <OptionPanel
        handleFavoriteClick={handleFavoriteClick}
        handleModalClose={handleModalClose}
        isFavorite={selectedType === "favorites"}
        showModal={showModal}
        subject={
          [...favorites, ...suggestions].find((s) => s.id == selectedSubjectID) || ({} as nexSubject)
        }
        badges={badges}
        users={users}
        method={selectedType === "favorites" ? "remove" : "add"}
      />
    </>
  );
}
