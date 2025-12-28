"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNavBar({
  data,
  activeIcon,
  setActiveIcon,
}: {
  data: string[];
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
}) {
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState(data);

  useEffect(() => {
    if (params.size == 0) {
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
    replace(`${pathname}?${param.toString()}`, { scroll: false });
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
        <ul className={`nav-sideIcons ${openPanel && "open"}`}>
          <AnimatePresence>
            {navigationItems.map(({ value, icon, alt }, idx) => (
              <motion.li
                key={value}
                className={`nav-sideIcon ${activeIcon === value && "active"}`}
                style={{
                  zIndex: displayData[0] === value ? 32 : 30,
                }}
                initial={false}
                animate={{
                  y: openPanel ? idx * 68 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: openPanel ? idx * 0.1 : (navigationItems.length - idx) * 0.05,
                }}
              >
                <motion.button
                  type="button"
                  className="navigation-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (displayData[0] === value) {
                      setOpenPanel(true);
                      if (openPanel) {
                        setActiveIcon(value);
                        handleRoute(value);
                        setOpenPanel(false);
                      }
                    } else {
                      if (openPanel) {
                        setOpenPanel(false);
                      }
                      setActiveIcon(value);
                      handleRoute(value);
                    }
                  }}
                >
                  <AnimatePresence mode="wait">
                    {activeIcon !== value && (
                      <motion.div
                        key="inactive"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: "absolute" }}
                      >
                        <Image
                          src={`/icons/nav/${icon}.png`}
                          alt={alt}
                          width={24}
                          height={24}
                        />
                      </motion.div>
                    )}
                    {activeIcon === value && (
                      <motion.div
                        key="active"
                        initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        style={{ position: "absolute" }}
                      >
                        <Image
                          src={`/icons/nav/active/${icon}.png`}
                          alt={alt}
                          width={24}
                          height={24}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="logo">
          <Image
            src="/logo/nexera-logo2.png"
            alt="Nexera Logo"
            width={98}
            height={34}
            className="logoImage"
          />
        </div>
        <div className="nav-sideIcons">
          <div className="nav-sideIcon">
            <div className="user">
              <Image src="/avatar/user.png" alt="user" width={48} height={48} />
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-route">
        <motion.div
          className="path"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p>
            <AnimatePresence mode="popLayout">
              {previousRoutes.map((item, index) => (
                <motion.span
                  key={`${item}-${index}`}
                  className="route-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.08,
                  }}
                >
                  {item}
                  <span className="separator"> &gt; </span>
                </motion.span>
              ))}
              <motion.span
                key={`active-${activeRoute}`}
                className="active route-item"
                initial={{ opacity: 0, x: -10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{
                  duration: 0.3,
                  delay: previousRoutes.length * 0.08,
                }}
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