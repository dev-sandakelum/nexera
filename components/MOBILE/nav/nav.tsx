"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

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
    if (JSON.stringify(data) !== JSON.stringify(displayData)) {
      // Start exit animation
      setIsExiting(true);

      // After exit completes, swap content and start enter animation
      setTimeout(() => {
        setDisplayData(data);
        setIsExiting(false);
        setIsEntering(true);
      }, 300); // Exit duration

      // End enter animation
      setTimeout(() => {
        setIsEntering(false);
      }, 300 + data.length * 80 + 500); // Exit + stagger delays + active delay
    }
  }, [data, displayData]);

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
  function IFopenPanel() {}
  const previousRoutes = displayData.slice(0, -1);
  const activeRoute = displayData[displayData.length - 1];

  return (
    <>
      <div className="mobile-nav">
        <ul className={`nav-sideIcons ${openPanel && "open"}`}>
          {[
            {
              value: "Home",
              icon: "Home",
              alt: "Home Icon",
            },
            {
              value: "Notes",
              icon: "Notes",
              alt: "Notes Icon",
            },
            {
              value: "Projects",
              icon: "Projects",
              alt: "Projects Icon",
            },
            {
              value: "Applications",
              icon: "Applications",
              alt: "Applications Icon",
            },
            {
              value: "Admin",
              icon: "Admin",
              alt: "Admin Icon",
            },
            {
              value: "Info",
              icon: "Info",
              alt: "Info Icon",
            },
            {
              value: "Settings",
              icon: "Settings",
              alt: "Settings Icon",
            },
          ].map(({ value, icon, alt }, idx) => (
            <li
              key={value}
              className={`nav-sideIcon ${activeIcon === value && "active"}`}
              style={
                {
                  zIndex: displayData[0] === value ? 32 : 30,
                  "--idx": idx,
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                className="navigation-btn"
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
                <Image
                  src={`/icons/nav/${icon}.png`}
                  alt={alt}
                  width={24}
                  height={24}
                  className={`icon ${
                    activeIcon === value ? "deactivated" : "active"
                  }`}
                />
                <Image
                  src={`/icons/nav/active/${icon}.png`}
                  alt={alt}
                  width={24}
                  height={24}
                  className={`icon ${
                    activeIcon === value ? "active" : "deactivated"
                  }`}
                />
              </button>
            </li>
          ))}
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
        <div className="path">
          <p>
            {previousRoutes.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="route-item"
                style={{ "--delay": `${index * 0.08}s` } as React.CSSProperties}
              >
                {item}
                <span className="separator"> &gt; </span>
              </span>
            ))}
            <span
              className="active route-item"
              style={
                {
                  "--delay": `${previousRoutes.length * 0.08}s`,
                } as React.CSSProperties
              }
            >
              {activeRoute}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
