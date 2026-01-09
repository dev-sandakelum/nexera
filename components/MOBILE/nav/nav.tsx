"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserInfo } from "@/components/nav/heading-navbar";
import { NexeraUser } from "@/components/types";
import {
  LuCircleHelp,
  LuCpu,
  LuFileText,
  LuGraduationCap,
  LuSettings,
  LuWarehouse,
} from "react-icons/lu";
import { TbHexagons } from "react-icons/tb";
import LoadingAnimation from "@/components/page/loading";

export default function MobileNavBar({
  user,
  activeIcon,
  setActiveIcon,
}: {
  user: NexeraUser;
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
}) {
  const pathname = usePathname();
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [whileRouting, setWhileRouting] = useState<boolean>(false);

  console.log("path =>" + pathname);

  function handleRoute() {
    const firstRoute = pathname.split("/")[1] || "Home";
    setActiveIcon(firstRoute.charAt(0).toUpperCase() + firstRoute.slice(1));
  }

  useEffect(() => {
    handleRoute();
  }, [pathname]);

  useEffect(() => {
    if (whileRouting) {
      setWhileRouting(false);
    }
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
    const currentRoute = pathname.split("/")[1];
    const isCurrentView =
      currentRoute.toLowerCase() === icons[idx].toLowerCase();
    console.log(
      "Current Route: " +
        currentRoute +
        " | Icon: " +
        icons[idx] +
        " | isCurrentView: " +
        isCurrentView +
        " | isActive: " +
        isActive
    );
    return (
      <li
        className={`nav-sideIcon ${isActive ? "active" : ""}`}
        style={{
          zIndex: isCurrentView ? 32 : 30 - idx,
          position: "absolute",
          top: 0,
          transform: openPanel
            ? `translateY(${(idx + 1) * 68}px)`
            : "translateY(-5px)",
          transition: "transform 0.3s ease",
        }}
        onClick={() => {
          // 🔥 Update icon immediately
          setActiveIcon(icons[idx]);

          if (isCurrentView) {
            setOpenPanel(!openPanel);
          } else {
            setWhileRouting(true);
            setOpenPanel(false);
          }
        }}
      >
        {currentRoute != icons[idx] ||
        (pathname.split("/").length > 2 && openPanel) ? (
          <Link
            href={`/${icons[idx]}`}
            type="button"
            className="navigation-btn"
          >
            <IconComponent
              size={24}
              className={`icon ${
                currentRoute === icons[idx] ? "active" : "deactivated"
              }`}
            />
          </Link>
        ) : (
          <div className="navigation-btn">
            <IconComponent
              size={24}
              className={`icon ${isActive ? "active" : "deactivated"}`}
            />
          </div>
        )}
        <div className={`navigation-icon-name ${openPanel && "active"}`}>
          {icons[idx]}
        </div>
      </li>
    );
  }

  // Get breadcrumb from pathname
  function getBreadcrumb() {
    const paths = pathname.split("/").filter(Boolean);
    if (paths.length === 0) return ["Home"];
    return paths.map((path) => path.charAt(0).toUpperCase() + path.slice(1));
  }

  const breadcrumb = getBreadcrumb();
  const previousRoutes = breadcrumb.slice(0, -1);
  const activeRoute = breadcrumb[breadcrumb.length - 1];

  return (
    <>
      {whileRouting && (
        <div className="whileRouting">
          <LoadingAnimation />
        </div>
      )}
      <div className="mobile-nav">
        <div
          className={`returningBG ${openPanel ? "open" : ""}`}
          onClick={() => {
            openPanel && setOpenPanel(false);
          }}
        ></div>
        <ul className={`nav-sideIcons ${openPanel ? "open" : ""}`}>
          {iconAdder(0)}
          {iconAdder(1)}
          {iconAdder(2)}
          {iconAdder(3)}
          {iconAdder(4)}
          {iconAdder(5)}
          {iconAdder(6)}
        </ul>

        <div className="logoContainer">
          <div className="logo">
            <Image
              src="/logo/nexera-logo2.png"
              alt="Nexera Logo"
              width={98}
              height={34}
              className="logoImage light"
            />
            <Image
              src="/logo/nexera-logo-dark.png"
              alt="Nexera Logo"
              width={98}
              height={34}
              className="logoImage dark"
            />
          </div>
        </div>

        <div className="nav-sideIcons">
          <div className="nav-sideIcon">
            <div
              className="user-profile-icon"
              style={
                {
                  backgroundImage: `url(${user.profilePicture})`,
                } as React.CSSProperties
              }
            ></div>
          </div>
        </div>
      </div>

      <div className="mobile-route">
        <div className="path">
          <p
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
          >
            {previousRoutes.map((item, index) => (
              <span key={`${item}-${index}`} className="route-item">
                {item}
                <span className="separator"> &gt; </span>
              </span>
            ))}
            <span className="active route-item">{activeRoute}</span>
          </p>
        </div>
      </div>
    </>
  );
}
