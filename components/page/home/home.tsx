"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { transform } from "next/dist/build/swc/generated-native";

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
  const [showPopUp, setShowPopUp] = useState(false);
  function popUp() {
    setShowPopUp(true);
    setTimeout(() => {
      setShowPopUp(false);
    }, 2000);
  }
  useEffect(() => {
    if (showPopUp) {
      const popUpVariants = {
        transform: "translate(0, 0) rotateZ(0deg)",
        transition: {
          type: "spring" as const,

          stiffness: 80,
          damping: 18,
        },
      };
      const items = document.querySelectorAll(
        ".homeContainer .content .right-side .pop-ups .item",
      );
      items.forEach((item, idx) => {
        item.animate(
          [
            {
              transform: `translate(0, 800px) rotateZ(0deg)`,
            },
          ],
          {
            delay: idx * 100,
            duration: 1000,
            easing: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
            fill: "forwards",
          },
        );
      });
    } else {
      const items = document.querySelectorAll(
        ".homeContainer .content .right-side .pop-ups .item",
      );
      const popUpVariants = [
        {
          transform: "translate(-140px, -130px) rotateZ(75deg)",
        },
        {
          transform: "translate(40px, -40px) rotateZ(-70deg)",
        },
        {
          transform: "translate(-90px, 120px) rotateZ(70deg)",
        },
      ];
      items.forEach((item, idx) => {
        item.animate(
          [
            {
              transform: popUpVariants[idx].transform,
            },
          ],
          {
            delay: idx * 100,
            duration: 1000,
            easing: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
            fill: "forwards",
          },
        );
      });
    }
  }, [showPopUp]);

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
              <span>• New Notes Added Weekly</span>
            </p>
          </div>
          <h1 className="title">
            Unlock Your <span>Potential</span> with NexEra
          </h1>
          <p className="description">
            Access thousands of expert-led notes,quizzes and take the next step in
            your professional journey. Join a global community of lifelong
            learners.
          </p>
          <div className="search-bar">
            <BiSearch size={24} />
            <input type="text" placeholder="Search for notes..." />
            <button onClick={popUp}>Search</button>
          </div>
          <div className="popular">
            <p>Popular Searches:</p>
            <ul>
              <li>Management</li>
              <li>DBMS</li>
              <li>OS</li>
              <li>Maths</li>
            </ul>
          </div>
        </div>
        <div className="right-side" onLoad={popUp}>
          <div className="pop-ups">
            <div className="item" key={`item-${Date.now()}-1`}></div>
            <div className="item" key={`item-${Date.now()}-2`}></div>
            <div className="item" key={`item-${Date.now()}-3`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
