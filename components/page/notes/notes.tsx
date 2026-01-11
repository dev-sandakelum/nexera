"use client";

import { nexBadge, NexeraUser, nexSubject } from "@/components/types";
import { motion } from "framer-motion";
import Card0 from "./items/card0";
import { GrFavorite } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";

import { use, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { UpdateUser } from "@/components/firebase/update-user";
import { FiChevronDown, FiFilter } from "react-icons/fi";
import LoadingAnimation from "../loading";
import { PiPlusBold } from "react-icons/pi";
import Link from "next/link";

export default function Notes({
  data,
  users,
  badges,
}: {
  data: nexSubject[];
  users: NexeraUser[];
  badges: nexBadge[];
}) {
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

  const [clickedOnLink, setClickedOnLink] = useState(false);

  useEffect(() => {
    if (clickedOnLink) {
      setTimeout(() => {
        setClickedOnLink(false);
      }, 10000);
    }
  }, [clickedOnLink]);
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
  if (clickedOnLink) {
    return <LoadingAnimation />;
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

  // ------------------------------------------------------
  // 4. RENDER
  // ------------------------------------------------------
  return (
    <div className="notesRedesignContainer" key={pathname}>
      {/* FILTER SECTION */}
      <div className="filterSection">
        <div className="filterToggle">
          <button
            className="saparater"
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
          <Link href={"/Notes/new"} className="add-new-item">
            <PiPlusBold /> <span>Add new</span>
          </Link>
        </div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
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
      </div>

      {/* UNIFIED CARDS SECTION */}
      <Card0
        users={users}
        badges={badges}
        favorites={visibleFavorites}
        suggestions={visibleSuggestions}
        updateUserFavorites={updateUserFavorites}
        setClickedOnLink={setClickedOnLink}
      />
    </div>
  );
}
