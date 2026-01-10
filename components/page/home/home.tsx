"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

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
    </div>
  );
}
