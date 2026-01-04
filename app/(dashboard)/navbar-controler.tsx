"use client";

import MobileNavBar from "@/components/MOBILE/nav/nav";
import HeadingNavBar from "@/components/nav/heading-navbar";
import NavBar from "@/components/nav/main";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarControler() {
  const pathname = usePathname();
  const path = pathname.split("/")[1];
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeIcon, setActiveIcon] = useState<string>(pathname.split("/")[1]);


  // Throttle helper
  const throttle = (func: Function, limit: number) => {
    let lastFunc: any;
    let lastRan: number;
    return function (this: any, ...args: any[]) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  // Detect mobile screen size with throttle
  useEffect(() => {
    const checkScreenSize = throttle(
      () => setIsMobile(window.innerWidth < 768),
      200
    );
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isMobile)
    return (
      <MobileNavBar
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
      />
    );
  else
    return (
      <>
        <NavBar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
        <HeadingNavBar />
      </>
    );
}
