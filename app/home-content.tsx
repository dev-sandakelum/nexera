"use client";

import "./styles/fonts.css";
import "./styles/not-found.css";

// Base Styles
import "./styles/app/main.css";

import "./styles/app/nav.css";
import "./styles/app/heading-navbar.css";

import "./styles/app/scroll-bar.css";

import "./styles/home/main.css";

import "./styles/notes/main.css";
import "./styles/notes/card0.css";
import "./styles/notes-sub/main.css";
import "./styles/notes-sub/card1.css";
import "./styles/notes/preview/md.css";

import "./styles/projects/main.css";

import "./styles/admin/main.css";
import "./styles/admin/dashboard/card.css";
import "./styles/admin/dashboard/ctrl-btn.css";
import "./styles/admin/notes-m.css";
import "./styles/admin/user-m.css";

import "./styles/admin/settings/main.css";

import "./styles/auth/main.css";

// Mobile
import "./styles/MOBILE/main.css";
import "./styles/MOBILE/nav.css";

import "./styles/MOBILE/notes/main.css";
import "./styles/MOBILE/notes/card0.css";
import "./styles/MOBILE/notes-sub/main.css";
import "./styles/MOBILE/notes-sub/card1.css";

import "./styles/MOBILE/projects/main.css";

import "./styles/MOBILE/auth/main.css";
import "./styles/MOBILE/admin/notes-m.css";
import "./styles/MOBILE/admin/user-m.css";

import "./styles/MOBILE/admin/settings/main.css";

// Components
import NavBar from "@/components/nav/main";
import MobileNavBar from "@/components/MOBILE/nav/nav";
import HeadingNavBar from "@/components/nav/heading-navbar";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";

import { NexeraUser } from "@/components/types";
import { useEffect, useState, useRef, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { guestUser } from "./page";

// Dynamic imports for heavy components
import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("@/components/page/home/home"));
const Notes = dynamic(() => import("@/components/page/notes/notes"));
const Notes_Sub = dynamic(() => import("@/components/page/notes/notes-sub"));
const Projects = dynamic(() => import("@/components/page/projects/projects"));
const Admin = dynamic(() => import("@/components/page/admin/admin"));
const Settings = dynamic(() => import("@/components/page/settings/settings"));

// Data
import { nexIctSubjects } from "@/public/json/subjects";
import { ictTopics } from "@/public/json/topics";
import { ictNotes } from "@/public/json/notes";

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

export default function HomeContent({
  user: initialUser,
}: {
  user?: NexeraUser;
}) {
  const params = useSearchParams();
  const routeList = Array.from(params.values());
  const [activeIcon, setActiveIcon] = useState<string>(
    routeList.length === 0 ? "Home" : routeList[0]
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [user, setUser] = useState<NexeraUser>(initialUser || guestUser);
  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(false);
  const [isFetchedUser, setIsFetchedUser] = useState<boolean>(false);
  const usableAreaRef = useRef<HTMLDivElement>(null);

  // Fetch user data from API
  useEffect(() => {
    async function fetchUser() {
      setIsFetchingUser(true);
      setIsFetchedUser(false);
      try {
        const response = await fetch("/api/user", {
          cache: "no-store",
        });
        if (response.ok) {
          const userData = await response.json();
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    if (!initialUser || initialUser.id === "guest_000") {
      fetchUser();
    }
    setIsFetchingUser(false);
    setIsFetchedUser(true);
  }, [initialUser]);

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

  // Update activeIcon when route changes
  useEffect(() => {
    setActiveIcon(routeList.length === 0 ? "Home" : routeList[0]);
  }, [params.toString()]);

  // Scroll to top when activeIcon changes
  useEffect(() => {
    usableAreaRef.current?.scrollTo(0, 0);
  }, [activeIcon]);

  // Memoized content to prevent unnecessary re-renders
  const renderContent = () => {
    if (activeIcon === "login") return <Login />;
    if (activeIcon === "register") return <Register />;
    if (activeIcon === "Home") return <HomePage />;
    if (activeIcon === "Notes" && !params.get("u"))
      return (
        <Notes dataset={nexIctSubjects} favarites={user.data.notes.favorites} />
      );
    if (activeIcon === "Notes" && params.get("u"))
      return <Notes_Sub topics={ictTopics} noteAbouts={ictNotes} />;
    if (activeIcon === "Projects") return <Projects />;
    if (activeIcon === "Admin")
      return <Admin subRoute={params.get("u") || "null"} />;
    if (activeIcon === "Settings") {
      if (user && isFetchingUser) {
        return (
          <div className="w-full h-full flex justify-center items-center text-black">
            waiting...
          </div>
        );
      }
      if (user && isFetchedUser) return <Settings user={user} />;
    }
    return null;
  };

  return (
    <div className="page root" suppressHydrationWarning>
      {!(activeIcon === "login" || activeIcon === "register") && (
        <>
          {isMobile ? (
            <MobileNavBar
              data={routeList}
              activeIcon={activeIcon}
              setActiveIcon={setActiveIcon}
              user={user}
            />
          ) : (
            <>
              <NavBar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
              <HeadingNavBar data={routeList} user={user} />
            </>
          )}
        </>
      )}

      <div className="ContentArea">
        <div className="UsableArea" ref={usableAreaRef}>
          <Suspense
            fallback={
              <div style={{ padding: "20px", textAlign: "center" }}>
                Loading...
              </div>
            }
          >
            {renderContent()}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
