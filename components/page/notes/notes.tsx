"use client";

import { NexeraUser, nexSubject } from "@/components/types";
import { AnimatePresence, motion } from "framer-motion";
import Card0 from "./items/card0";
import { GrFavorite } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";

import { use, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { UpdateUser } from "@/components/firebase/update-user";
import { FiChevronDown, FiFilter, FiHeart } from "react-icons/fi";

export default function Notes({ data }: { data: nexSubject[] }) {
  // ------------------------------------------------------
  // 1. DATA LOGIC (From your original code)
  // ------------------------------------------------------
  const { user } = useUser();
  const pathname = usePathname();
  const [User, setUser] = useState<NexeraUser>(user as NexeraUser);
  const [favorites, setFavorites] = useState<nexSubject[]>([]);
  const [suggestions, setSuggestions] = useState<nexSubject[]>([]);

  // ------------------------------------------------------
  // 2. UI STATE (From the redesign)
  // ------------------------------------------------------
  const [showFilters, setShowFilters] = useState(false);
  const [filterYear, setFilterYear] = useState("all");
  const [filterDept, setFilterDept] = useState("all");

  // Sync User
  useEffect(() => {
    if (user) {
      setUser(user as NexeraUser);
    }
  }, [user]);

  // Sync Data & Split Logic
  useEffect(() => {
    if (User?.data) {
      const favs: nexSubject[] = [];
      const suggs: nexSubject[] = [];
      data.forEach((item) => {
        if (User.data.notes?.favorites?.some((fav) => fav.id === item.id)) {
          favs.push(item);
        } else {
          suggs.push(item);
        }
      });
      setFavorites(favs);
      setSuggestions(suggs);
    }
  }, [User, data]);

  // Update Logic
  const updateUserFavorites = async (subjectId: string, method: string) => {
    // Call your API here (assuming UpdateUser exists in context)
    // await UpdateUser(user?.id || "", updatedUser);

    const updatedUser: NexeraUser = {
      ...User,
      data: {
        ...User.data,
        notes: {
          ...User.data.notes,
          favorites:
            method === "add"
              ? [...User.data.notes.favorites, { id: subjectId }]
              : User.data.notes.favorites.filter((fav) => fav.id !== subjectId),
        },
      },
    };
    const response = await UpdateUser(User.id, updatedUser);
    if (response.success) {
      console.log("User favorites updated successfully");
      setUser(updatedUser);
    } else {
      console.error("Failed to update user favorites");
      alert("Failed to update favorites. Please try again.");
    }
  };

  if (!User?.data) {
    return <div>Loading...</div>;
  }

  // ------------------------------------------------------
  // 3. FILTER LOGIC
  // ------------------------------------------------------
  const applyFilters = (items: nexSubject[]) => {
    return items.filter((item) => {
      // NOTE: Ensure your data has 'academicYear' and 'departmentID'
      // If not, these filters won't work until backend is updated.
      const yearMatch =
        filterYear === "all" || String(item.academicYear) === filterYear;
      const deptMatch =
        filterDept === "all" || item.departmentID === filterDept;
      return yearMatch && deptMatch;
    });
  };

  const visibleFavorites = applyFilters(favorites);
  const visibleSuggestions = applyFilters(suggestions);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  // ------------------------------------------------------
  // 4. RENDER
  // ------------------------------------------------------
  return (
    <motion.div
      key={pathname}
      className="notesRedesignContainer"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* FILTER SECTION */}
      <div className="filterSection">
        <button
          className="filterToggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FiFilter /> Filter Subjects
          </span>
          <FiChevronDown
            style={{
              transform: showFilters ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
        </button>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: "hidden" }}
            >
              <div className="filterControls">
                <div className="filterGroup">
                  <label>Academic Year</label>
                  <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                  >
                    <option value="all">All Years</option>
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </select>
                </div>

                <div className="filterGroup">
                  <label>Department</label>
                  <select
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    <option value="CS">Computer Science</option>
                    <option value="IT">Information Technology</option>
                    <option value="SE">Software Engineering</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAVORITES SECTION */}
      <div className="notesSection">
        <div className="sectionHeader">
          <GrFavorite size={20} />
          <span>Favorites</span>
          <span className="count">{visibleFavorites.length}</span>
        </div>

        <Card0
          dataset={visibleFavorites}
          updateUserFavorites={updateUserFavorites}
          type="favorites"
          key={"favorites-" + visibleFavorites.length}
        />
      </div>

      {/* SUGGESTIONS SECTION */}
      <div className="notesSection">
        <div className="sectionHeader">
          <GiWorld size={20} />
          <span>Suggestions</span>
          <span className="count">{visibleSuggestions.length}</span>
        </div>
        <Card0
          dataset={visibleSuggestions}
          updateUserFavorites={updateUserFavorites}
          type="suggestions"
          key={"suggestions-" + visibleSuggestions.length}
        />
      </div>
    </motion.div>
  );
}
