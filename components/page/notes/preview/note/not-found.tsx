"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiSearch } from "react-icons/fi";

export default function Note_NotFound() {
  return (
    <div className="notFoundContainer">
      <motion.div
        className="contentWrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="iconContainer">
          <FiSearch className="searchIcon" />
        </div>

        <h1 className="errorCode">404</h1>
        <h2 className="title">Page Not Found</h2>

        <p className="msg">
          This note was recently uploaded, but it may not be available just yet.
          To keep the server fast and stable, new content can take a short time
          to appear for everyone.
        </p>

        {/* The Tiny Excuse */}
        <p className="excuse">
          Please check back in a few minutes or refresh the page. If the issue
          continues, it will resolve automatically once the system syncs.
        </p>

        <Link href="/Notes" className="homeBtn">
          <FiHome />
          Back to Notes
        </Link>
      </motion.div>
    </div>
  );
}
