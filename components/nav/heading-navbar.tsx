"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { nexBadge, NexeraUser } from "../types";
import { nexBadges } from "@/public/json/badges";
import { useUser } from "@/contexts/UserContext";

export default function HeadingNavBar({ User }: { User: NexeraUser }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const pathname = usePathname();
  const paths = pathname.split("/");

  function getBreadcrumb() {
    const paths = pathname.split("/").filter(Boolean);
    if (paths.length === 0) return ["Home"];
    return paths.map((path) => path.charAt(0).toUpperCase() + path.slice(1));
  }

  const breadcrumb = getBreadcrumb();
  const previousRoutes = breadcrumb.slice(0, -1);
  const activeRoute = breadcrumb[breadcrumb.length - 1];

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
            >
              {item}
              <span className="separator"> &gt; </span>
            </span>
          ))}
          <span
            className="active route-item"
            style={
              {
                "--delay": `${paths.length * 0.08}s`,
              } as React.CSSProperties
            }
          >
            {activeRoute}
          </span>
        </p>
      </div>
      <UserInfo user={User} />
    </div>
  );
}

export function UserInfo({ user }: { user: NexeraUser }) {
  const [is_UserInfo_open, set_is_UserInfo_open] = useState(false);
  const [is_UserInfo_mobile, set_is_UserInfo_mobile] = useState(false);
  const { replace } = useRouter();

  const pickedBadges: nexBadge[] = [];
  if (user){
    user.badges.forEach((nexBadge) => {
      const foundBadge = nexBadges.find((badge) => badge.id === nexBadge.id);
      if (foundBadge) {
        pickedBadges.push(foundBadge);
      }
    });
  }
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
