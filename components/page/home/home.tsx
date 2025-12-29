"use client";

import React from "react";
import { motion } from "framer-motion";

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
    y: 500 - (50 *  idx),
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 18,
    },
  },
});

export default function HomePage() {
  return (
    <div className="homeContainer">
      <motion.div
        className="bg"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {[ 
          "#42a5f5",
          "#64b5f6",
          "#90caf9",
          "#bbdefb",
          "#e3f2fd",
        ].map((bg, idx) => (
          <motion.div
            key={idx}
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
    </div>
  );
}
