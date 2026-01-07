"use client";

import { NexeraUser, nexSubject } from "@/components/types";
import { motion } from "framer-motion";
import Card0 from "./items/card0";
import { GrFavorite } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";

import { use, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { UpdateUser } from "@/components/firebase/update-user";

export default function Notes({ data }: { data: nexSubject[] }) {
  const { user } = useUser();
  const pathname = usePathname();
  const [User, setUser] = useState<NexeraUser>(user as NexeraUser);
  const [favorites, setFavorites] = useState<nexSubject[]>([
    ...data.filter((item) =>
      User?.data.notes?.favorites?.some((fav) => fav.id === item.id)
    ),
  ]);
  const [suggestions, setSuggestions] = useState<nexSubject[]>([
    ...data.filter(
      (item) => !User?.data.notes?.favorites?.some((fav) => fav.id === item.id)
    ),
  ]);

  useEffect(() => {
    if (user) {
      setUser(user as NexeraUser);
    }
  }, [user]);

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

  const dataset: nexSubject[] = data;

  if (!User?.data) {
    return <div>Loading...</div>;
  }

  const updateUserFavorites = async (subjectId: string, method: string) => {
    if (method === "add") {
      setUser((prevUser) => ({
        ...prevUser,
        data: {
          ...prevUser.data,
          notes: {
            ...prevUser.data.notes,
            favorites: [...prevUser.data.notes.favorites, { id: subjectId }],
          },
        },
      }));
    } else if (method === "remove") {
      setUser((prevUser) => ({
        ...prevUser,
        data: {
          ...prevUser.data,
          notes: {
            ...prevUser.data.notes,
            favorites: prevUser.data.notes.favorites.filter(
              (fav) => fav.id !== subjectId
            ),
          },
        },
      }));
    }
    const updatedUser: NexeraUser = {
      ...User,
      data: {
        ...User.data,
        notes: {
          ...User.data.notes,
          favorites:
            method === "add"
              ? [...User.data.notes.favorites, { id: subjectId }]
              : User.data.notes.favorites.filter((f) => f.id !== subjectId),
        },
      },
    };

    const response = await UpdateUser(user?.id || "", updatedUser);
    if (response.success) {
      console.log("User favorites updated successfully.");
    } else {
      console.error("Error updating user favorites:", response.error);
    }
  };
  console.log("favorites:", favorites);
  console.log("suggestions:", suggestions);

  return (
    <>
    
    <motion.div
      key={pathname}
      className="noteContainer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="favorites">
        <div className="header">
          <GrFavorite />
          <span> Favorites</span>
        </div>
        <Card0
          key={`favorites-${favorites.length}`}
          dataset={favorites}
          type="favorites"
          updateUserFavorites={updateUserFavorites}
        />
      </div>

      <div className="suggestions">
        <div className="header">
          <GiWorld />
          <span> Suggestions</span>
        </div>
        <Card0
          key={`suggestions-${suggestions.length}`}
          dataset={suggestions}
          type="suggestions"
          updateUserFavorites={updateUserFavorites}
        />
      </div>
    </motion.div></>
  );
}
