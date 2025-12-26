"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function NavBar({
  activeIcon,
  setActiveIcon,
}: {
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const [centerHeight, setCenterHeight] = useState<number>(0);
  const centerRef = useRef<HTMLDivElement>(null);
  const { replace } = useRouter();

  useEffect(() => {
    if (centerRef.current) {
      const height = centerRef.current.getBoundingClientRect().height;
      setCenterHeight(height);
    }
  }, []);

  useEffect(() => {
    if (params.size == 0) {
      setActiveIcon("Home");
      handleRoute("Home");
    }
  }, []);

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
  const currentRoute = params.get("r");

  return (
    <nav
      className="navbar"
      onClick={() => console.log(centerHeight.toFixed(0))}
    >
      <div className="logoContainerBG"></div>
      <div className="navigations">
        <div className="logoContainer">
          <div className="logo">
            <Image
              src="/logo/Vector.png"
              alt="Applications Icon"
              width={24}
              height={24}
              className="icon"
            />
          </div>
          <Image
            src="/logo/nexera-logo2.png"
            alt="Nexera Logo"
            width={120}
            height={40}
            className="logoImage"
          />
        </div>
        <div className="iconContainer">
          <div className="navLinks top">
            <button
              type="button"
              className="navLink"
              onClick={() => {
                setActiveIcon("Home");
                handleRoute("Home");
              }}
            >
              <Image
                src={"/icons/nav/Home.png"}
                alt="Home Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Home" ? "deactivated" : "active"
                }`}
              />
              <Image
                src={"/icons/nav/active/Home.png"}
                alt="Home Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Home" ? "active" : "deactivated"
                }`}
              />
            </button>
            <button
              type="button"
              className="navLink"
              onClick={() => {
                setActiveIcon("Notes");
                handleRoute("Notes");
              }}
            >
              <Image
                src={"/icons/nav/Notes.png"}
                alt="Notes Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Notes" ? "deactivated" : "active"
                }`}
              />
              <Image
                src={"/icons/nav/active/Notes.png"}
                alt="Notes Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Notes" ? "active" : "deactivated"
                }`}
              />
            </button>
            <button
              type="button"
              className="navLink"
              onClick={() => {
                setActiveIcon("Projects");
                handleRoute("Projects");
              }}
            >
              <Image
                src={"/icons/nav/Projects.png"}
                alt="Projects Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Projects" ? "deactivated" : "active"
                }`}
              />
              <Image
                src={"/icons/nav/active/Projects.png"}
                alt="Projects Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Projects" ? "active" : "deactivated"
                }`}
              />
            </button>
            <button
              type="button"
              className="navLink"
              onClick={() => {
                setActiveIcon("Applications");
                handleRoute("Applications");
              }}
            >
              <Image
                src={"/icons/nav/Applications.png"}
                alt="Applications Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Applications" ? "deactivated" : "active"
                }`}
              />
              <Image
                src={"/icons/nav/active/Applications.png"}
                alt="Applications Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Applications" ? "active" : "deactivated"
                }`}
              />
            </button>
          </div>
          <div ref={centerRef} className="center"></div>
          <div className="navLinks bottom">
            <button
              type="button"
              className="navLink"
              onClick={() => {
                setActiveIcon("Admin");
                handleRoute("Admin");
              }}
            >
              <Image
                src={"/icons/nav/Admin.png"}
                alt="Admin Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Admin" ? "deactivated" : "active"
                }`}
              />
              <Image
                src={"/icons/nav/active/Admin.png"}
                alt="Admin Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Admin" ? "active" : "deactivated"
                }`}
              />
            </button>
            <button
              type="button"
              className="navLink"
              onClick={() => {
                setActiveIcon("Info");
                handleRoute("Info");
              }}
            >
              <Image
                src={"/icons/nav/Info.png"}
                alt="Info Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Info" ? "deactivated" : "active"
                }`}
              />
              <Image
                src={"/icons/nav/active/Info.png"}
                alt="Info Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Info" ? "active" : "deactivated"
                }`}
              />
            </button>
            <button
              type="button"
              className="navLink"
              onClick={() => {
                setActiveIcon("Settings");
                handleRoute("Settings");
              }}
            >
              <Image
                src={"/icons/nav/Settings.png"}
                alt="Settings Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Settings" ? "deactivated" : "active"
                }`}
              />
              <Image
                src={"/icons/nav/active/Settings.png"}
                alt="Settings Icon"
                width={24}
                height={24}
                className={`icon ${
                  activeIcon == "Settings" ? "active" : "deactivated"
                }`}
              />
            </button>
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
                  className="indicatorImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="test" onClick={()=>{handleRoute("Projects/r/Advanced/r/With/r/Spring/r/Animation/r/(Framer/r/Motion)")}}>gg</div> */}
    </nav>
  );
}
