"use client";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaBookBookmark } from "react-icons/fa6";
import {
  LuCircleHelp,
  LuCpu,
  LuFileText,
  LuGraduationCap,
  LuSettings,
  LuWarehouse,
} from "react-icons/lu";
import { TbHexagons } from "react-icons/tb";

export default function NavBar({
  activeIcon,
  setActiveIcon,
}: {
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
}) {
  const pathname = usePathname();
  const [centerHeight, setCenterHeight] = useState<number>(0);

  console.log("path =>" + pathname.split("/")[1]);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (centerRef.current) {
      const height = centerRef.current.getBoundingClientRect().height;
      setCenterHeight(height);
    }
  }, []);

  function handleRoute() {
    setActiveIcon(pathname.split("/")[1]);
  }
  useEffect(() => {
    handleRoute();
  }, [pathname]);

  function iconAdder(idx: number) {
    const icons = [
      "Home",
      "Notes",
      "Projects",
      "Applications",
      "Admin",
      "Info",
      "Settings",
    ];
    const NAV_ICONS: Record<string, React.ElementType> = {
      Home: LuWarehouse,
      Notes: LuFileText,
      Projects: LuGraduationCap,
      Applications: TbHexagons,
      Admin: LuCpu,
      Info: LuCircleHelp,
      Settings: LuSettings,
    };
    const IconComponent = NAV_ICONS[icons[idx]];
    const isActive = activeIcon === icons[idx];

    return (
      <Link href={`/${icons[idx]}`} type="button" className="navLink">
        <IconComponent
          size={24}
          className={`icon ${isActive ? "active" : "deactivated"}`}
        />
      </Link>
    );
  }
  return (
    <nav
      className="navbar"
      onClick={() => console.log(centerHeight.toFixed(0))}
    >
      <div className="logoContainerBG"></div>
      <div
        className={`logoContainerFixBorder ${pathname == "/Home" && "active"}`}
      ></div>
      <div className="navigations">
        <div className="logoContainer">
          <div className="logo">
            <FaBookBookmark size={24} className="icon" />
          </div>
          <Image
            src="/logo/nexera-logo2.png"
            alt="Nexera Logo"
            width={120}
            height={40}
            className="logoImage light"
          /> 
          <Image
            src="/logo/nexera-logo-dark.png"
            alt="Nexera Logo"
            width={120}
            height={40}
            className="logoImage dark"
          />
        </div>
        <div className="iconContainer">
          <div className="navLinks top">
            {iconAdder(0)}
            {iconAdder(1)}
            {iconAdder(2)}
            {iconAdder(3)}
          </div>
          <div ref={centerRef} className="center"></div>
          <div className="navLinks bottom">
            {iconAdder(4)}
            {iconAdder(5)}
            {iconAdder(6)}
          </div>

          <div className="indicater">
            <div className="mask">
              <div
                className={`img ${activeIcon}`}
                style={
                  {
                    "--navCenter": `${centerHeight.toFixed(0)}px`,
                  } as React.CSSProperties
                }
              >
                <Image
                  src="/components/nav/indicator.png"
                  alt="Indicator"
                  width={66}
                  height={180}
                  className="indicatorImage light"
                />
                <Image
                  src="/components/nav/indicatorDark.png"
                  alt="Indicator"
                  width={66}
                  height={180}
                  className="indicatorImage dark"
                />
                <Image
                  src="/components/nav/iContrast2.png"
                  alt="Indicator"
                  width={66}
                  height={180}
                  className="indicatorImage contrast"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
