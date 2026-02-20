"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { BiSearch } from "react-icons/bi";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = (idx: number) => ({
  hidden: {
    y: 800,
    opacity: 0,
  },
  show: {
    y: 500 - 50 * idx,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 18,
    },
  },
});

export default function HomePage() {
  const pathname = usePathname();
  return (
    <div className="homeContainer">
      <motion.div
        key={pathname}
        className="bg"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {[
          "var(--home-bg-component-01)",
          "var(--home-bg-component-02)",
          "var(--home-bg-component-03)",
          "var(--home-bg-component-04)",
          "var(--home-bg-component-05)",
        ].map((bg, idx) => (
          <motion.div
            key={idx + "bg"}
            className="bgC"
            custom={idx}
            variants={itemVariants(idx)}
            style={
              {
                "--idx": idx,
                "--bg": bg,
              } as React.CSSProperties
            }
            initial={{
              x: `calc(70vw - 20vw * ${idx})`,
              y: `calc(70vh - (10vh * ${idx}) + 600px)`,
              rotateZ: 35,
            }}
            animate={{
              x: `calc(70vw - 20vw * ${idx})`,
              y: `calc(70vh - (10vh * ${idx})+ 200px)`,
              rotateZ: 35,
            }}
          />
        ))}
      </motion.div>
      <div className="content">
        <div className="left-side">
          <div className="notification">
            <p>
              <span>• New Courses Added Weekly</span>
            </p>
          </div>
          <h1 className="title">
            Unlock Your <span>Potential</span> with NexEra
          </h1>
          <p className="description">
            Access thousands of expert-led courses and take the next step in
            your professional journey. Join a global community of lifelong
            learners.
          </p>
          <div className="search-bar">
            <BiSearch size={24} />
            <input type="text" placeholder="Search for courses..." />
            <button>Search</button>
          </div>
          <div className="popular">
            <p>Popular Searches:</p>
            <ul>
              <li>Web Development</li>
              <li>Data Science</li>
              <li>Graphic Design</li>
              <li>Digital Marketing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
