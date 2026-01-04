"use client";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { nexBadge, NexeraUser } from "../types";
import { nexBadges } from "@/public/json/badges";
import { useSearchParams } from "next/navigation";
import { Route } from "next";
import { useUser } from "@/contexts/UserContext";

export default function HeadingNavBar({
  data,
}: {
  data: any;
}) {

  const { user, setUser, refreshUser } = useUser();
 
  const [displayData, setDisplayData] = useState(data);
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const previousRoutes = displayData.slice(0, -1);
  const activeRoute = displayData[displayData.length - 1];

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
  
  const pathname = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();

  function handleRoute(u: string, n?: string) {
    const param = new URLSearchParams(params);
    if (u) {
      param.set("u", u);
      if (n) {
        param.set("n", n);
      } else {
        param.delete("n");
      }
    } else {
      param.delete("u");
    }
    const url = `${pathname}?${param.toString()}`;
    replace(url as Route, { scroll: false });
  }
  return (
    <div className="heading-navbar">
      <div
        className={`route ${isExiting ? "exiting" : ""} ${
          isEntering ? "entering" : ""
        }`}
      >
        <p>
          {previousRoutes.map((item: string, index: number) => (
            <span
              key={`${item}-${index}`}
              className="route-item"
              style={{ "--delay": `${index * 0.08}s` } as React.CSSProperties}
              onClick={()=>handleRoute(item === "Notes" || "Admin" || "Projects" ? "" : item)}
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
      <UserInfo user={user} />
    </div>
  );
}

export function UserInfo({ user }: { user: NexeraUser }) {
  const [is_UserInfo_open, set_is_UserInfo_open] = useState(false);
  const [is_UserInfo_mobile, set_is_UserInfo_mobile] = useState(false);
  const { replace } = useRouter();

  const pickedBadges: nexBadge[] = [];
  user.badges.forEach((nexBadge) => {
    const foundBadge = nexBadges.find((badge) => badge.id === nexBadge.id);
    if (foundBadge) {
      pickedBadges.push(foundBadge);
    }
  });

  useEffect(() => {
    const checkScreenSize = () => {
      set_is_UserInfo_mobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogOut = async () => {
    await fetch("/api/logout", { method: "POST" });
    replace("/?r=login");
  };

  return (
    <div
      className={`navbar-user-info ${is_UserInfo_open && "open"} ${
        is_UserInfo_mobile && !is_UserInfo_open && "mobile"
      } ${is_UserInfo_mobile && is_UserInfo_open && "openMobile"}`}
    >
      <div
        className={`returningBG ${is_UserInfo_open && "open"}`}
        onClick={() => {
          is_UserInfo_open && set_is_UserInfo_open(false);
        }}
      ></div>
      <div className="user-details">
        <div className="user-name">{user.name}</div>
        <div className="user-Email">{user.email}</div>
        <div className="user-role">
          {user.badges.length > 0 &&
            pickedBadges.map((badge) => (
              <div
                key={badge.id}
                className="badge"
                style={{
                  background: badge.color.bgColor,
                  color: badge.color.textColor,
                }}
              >
                {badge.name}
              </div>
            ))}
        </div>
        <div className="signOut">
          <button onClick={handleLogOut}>
            {user.id == "guest_000" ? "Sign In" : "Sign Out"}
          </button>
        </div>
      </div>
      <div
        className="user-avatar"
        style={{ "--bg": `url(${user.profilePicture})` } as React.CSSProperties}
        onClick={() => {
          !is_UserInfo_open && set_is_UserInfo_open(true);
        }}
      >
        {" "}
      </div>
    </div>
  );
}
