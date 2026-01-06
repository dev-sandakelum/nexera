"use client";

import MobileNavBar from "@/components/MOBILE/nav/nav";
import HeadingNavBar from "@/components/nav/heading-navbar";
import NavBar from "@/components/nav/main";
import { NexeraUser } from "@/components/types";
import { useUser } from "@/contexts/UserContext";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function NavbarControler() {
  const pathname = usePathname();
  const activeRoute = pathname.split("/")[1];
  const { user, loading } = useUser(); 
  const [isMobile, setIsMobile] = useState(false);
  const [activeIcon, setActiveIcon] = useState(activeRoute);

  /* =======================
     Throttle helper (memoized)
  ======================= */
  const throttle = useMemo(() => {
    return (func: () => void, limit: number) => {
      let lastRun = 0;
      let timeout: any;

      return () => {
        const now = Date.now();
        if (now - lastRun >= limit) {
          lastRun = now;
          func();
        } else {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            lastRun = Date.now();
            func();
          }, limit);
        }
      };
    };
  }, []);

  /* =======================
     Screen size detection
  ======================= */
  useEffect(() => {
    const checkScreenSize = throttle(
      () => setIsMobile(window.innerWidth < 768),
      200
    );

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [throttle]);

  if (loading || !user) {
    return null; 
  }

  if (isMobile) {
    return (
      <MobileNavBar
        user={user}
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
      />
    );
  }

  return (
    <>
      <NavBar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      <HeadingNavBar User={user} />
    </>
  );
}
