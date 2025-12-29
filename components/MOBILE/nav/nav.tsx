"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { UserInfo } from "@/components/nav/heading-navbar";
import { NexeraUser } from "@/components/types";

// --- 1. Smooth & Calm Configuration ---

const smoothTransition = {
  type: "spring" as const,
  stiffness: 120, // Lower = Slower/Softer tension
  damping: 20, // Controls the "bounciness" (20 is smooth, not too bouncy)
  mass: 1, // Weight of the object
};

const sidebarItemVariants: Variants = {
  open: (i: number) => ({
    y: (i + 1) * 68,
    transition: {
      ...smoothTransition,
      delay: i * 0.1, // Slower stagger (100ms between items)
    },
  }),
  closed: (i: number) => ({
    y: 0,
    transition: {
      ...smoothTransition,
      // When closing, we speed it up slightly so it doesn't feel sluggish
      delay: (6 - i) * 0.05,
    },
  }),
};

const iconVariants: Variants = {
  initial: { opacity: 0, scale: 0.6, rotate: -90 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: "easeInOut" }, // Slow, smooth rotation
  },
  exit: {
    opacity: 0,
    scale: 0.6,
    rotate: 90,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const breadcrumbVariants: Variants = {
  initial: { opacity: 0, x: -15 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }, // Slow drift in
  },
  exit: {
    opacity: 0,
    x: 15,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

export default function MobileNavBar({
  data,
  activeIcon,
  setActiveIcon,
  user,
}: {
  data: string[];
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
  user: NexeraUser;
}) {
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState(data);

  useEffect(() => {
    if (params.size === 0) {
      setActiveIcon("Home");
      handleRoute("Home");
    }
  }, []);

  useEffect(() => {
    const currentRoute = params.get("r");
    if (currentRoute) {
      const routeParts = currentRoute.split("/r/");
      setDisplayData(routeParts);
    } else {
      setDisplayData(["Home"]);
    }
  }, [params]);

  useEffect(() => {
    setDisplayData(data);
  }, [data]);

  function handleRoute(term: string) {
    const param = new URLSearchParams();
    const activeTab = term ? term.split("/r/") : [];
    if (term) {
      param.set("r", term);
    } else {
      param.delete("r");
    }
    replace(`${pathname}?${param.toString()}` as any, { scroll: false });
    setActiveIcon(activeTab[0] || "Home");
  }

  const navigationItems = [
    { value: "Home", icon: "Home", alt: "Home Icon" },
    { value: "Notes", icon: "Notes", alt: "Notes Icon" },
    { value: "Projects", icon: "Projects", alt: "Projects Icon" },
    { value: "Applications", icon: "Applications", alt: "Applications Icon" },
    { value: "Admin", icon: "Admin", alt: "Admin Icon" },
    { value: "Info", icon: "Info", alt: "Info Icon" },
    { value: "Settings", icon: "Settings", alt: "Settings Icon" },
  ];

  const previousRoutes = displayData.slice(0, -1);
  const activeRoute = displayData[displayData.length - 1];

  return (
    <>
      <div className="mobile-nav">
        {" "}
        <div
          className={`returningBG ${openPanel && "open"}`}
          onClick={() => {
            openPanel && setOpenPanel(false);
          }}
        ></div>
        <ul className={`nav-sideIcons ${openPanel && "open"}`}>
          {navigationItems.map(({ value, icon, alt }, idx) => {
            const isActive = activeIcon === value;
            const isCurrentView = displayData[0] === value;

            return (
              <motion.li
                key={value}
                className={`nav-sideIcon ${isActive && "active"}`}
                custom={idx}
                variants={sidebarItemVariants}
                initial="closed"
                animate={openPanel ? "open" : "closed"}
                style={{
                  zIndex: isCurrentView ? 32 : 30 - idx,
                  position: "absolute",
                  top: 0,
                }}
              >
                <motion.button
                  type="button"
                  className="navigation-btn"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (isCurrentView) {
                      setOpenPanel(!openPanel);
                      if (openPanel) {
                        setActiveIcon(value);
                        handleRoute(value);
                      }
                    } else {
                      setOpenPanel(false);
                      setActiveIcon(value);
                      handleRoute(value);
                    }
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isActive ? (
                      <motion.div
                        key="active"
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          src={`/icons/nav/active/${icon}.png`}
                          alt={alt}
                          width={24}
                          height={24}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="inactive"
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          src={`/icons/nav/${icon}.png`}
                          alt={alt}
                          width={24}
                          height={24}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
        <div className="logoContainer">
          <div className="logo">
            <Image
              src="/logo/nexera-logo2.png"
              alt="Nexera Logo"
              width={98}
              height={34}
              className="logoImage"
            />
          </div>
        </div>
        <div className="nav-sideIcons">
          <UserInfo user={user} />
        </div>
      </div>

      <div className="mobile-route">
        <motion.div
          className="path"
          layout
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }} // Very slow entry for path container
        >
          <p
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
          >
            <AnimatePresence mode="popLayout">
              {previousRoutes.map((item, index) => (
                <motion.span
                  key={`${item}-${index}`}
                  className="route-item"
                  variants={breadcrumbVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                >
                  {item}
                  <span className="separator"> &gt; </span>
                </motion.span>
              ))}

              <motion.span
                key={`active-${activeRoute}`}
                className="active route-item"
                variants={breadcrumbVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
              >
                {activeRoute}
              </motion.span>
            </AnimatePresence>
          </p>
        </motion.div>
      </div>
    </>
  );
}
