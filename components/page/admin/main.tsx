"use client";

import { motion } from "framer-motion";
import { BiPowerOff, BiShieldQuarter } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FiFile, FiSettings } from "react-icons/fi";
import { LuCopyPlus } from "react-icons/lu";
import { AuthBlock, NoteBlock, PendingBlock } from "./rotes/main/items/blocks";
import { PiPowerDuotone } from "react-icons/pi";
import {
  DisableRegistrationButton,
  MakeAdminsONLY,
  PowerButton,
} from "./rotes/main/items/control-btn";
import { UploadUsersFast } from "@/components/test/upload";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Route } from "next";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  } as const,
};

export default function MainAdminPage() {
  const pathname = usePathname();
  

  
  
  return (
    <motion.div
      key={pathname}
      className="MainAdminPage"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="item">
        <AuthBlock />
      </motion.div>
      <motion.div variants={itemVariants} className="item">
        <PendingBlock />
      </motion.div>
      <motion.div variants={itemVariants} className="item">
        3
      </motion.div>
      <motion.div variants={itemVariants} className="item">
        4
      </motion.div>
      <motion.div variants={itemVariants} className="item">
        5
      </motion.div>
      <motion.div variants={itemVariants} className="item">
        6
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="item"
        onClick={async () => await UploadUsersFast()}
      >
        7
      </motion.div>
      <motion.div variants={itemVariants} className="item">
        <div className="controlBtns">
          <PowerButton />
          <DisableRegistrationButton />
          <MakeAdminsONLY />
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="item">
        <NoteBlock />
      </motion.div>
      <motion.div variants={itemVariants} className="item">
        10
      </motion.div>
    </motion.div>
  );
}
