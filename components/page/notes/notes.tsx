"use client";

import { nexSubject } from "@/components/types";
import { motion } from "framer-motion";
import Card0 from "./items/card0";
import { GrFavorite } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function Notes({ data }: { data: nexSubject[] }) {
  const fav_dataset: nexSubject[] = useMemo(() => data, []);
  const suggestion_dataset: nexSubject[] = useMemo(() => data, []);
  const pathname = usePathname();
  return (
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
        <Card0 dataset={fav_dataset} />
      </div>

      <div className="suggestions">
        <div className="header">
          <GiWorld />
          <span> Suggestions</span>
        </div>
        <Card0 dataset={suggestion_dataset} />
      </div>
    </motion.div>
  );
}
