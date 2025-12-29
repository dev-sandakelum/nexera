"use client";
import HeadingNavBar from "@/components/nav/heading-navbar";
import "./styles/app/main.css";
import "./styles/app/nav.css";
import "./styles/app/heading-navbar.css";
import "./styles/app/scroll-bar.css";

import "./styles/home/main.css";

import "./styles/notes/main.css";
import "./styles/notes/card0.css";

import "./styles/notes-sub/main.css";
import "./styles/notes-sub/card1.css";

import "./styles/projects/main.css";

import "./styles/admin/main.css";
import "./styles/admin/dashboard/card.css";
import "./styles/admin/dashboard/ctrl-btn.css";

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

import "./styles/fonts.css";
import NavBar from "@/components/nav/main";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import Notes from "@/components/page/notes/notes";
import Notes_Sub from "@/components/page/notes/notes-sub";
import Projects from "@/components/page/projects/projects";
import Admin from "@/components/page/admin/admin";
import MobileNavBar from "@/components/MOBILE/nav/nav";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import HomePage from "@/components/page/home/home";
import { NexeraUser } from "@/components/types";
import { nexIctSubjects } from "@/public/json/subjects";
import { ictTopics } from "@/public/json/topics";
import { noteContexts } from "@/public/json/notesData";
import { ictNotes } from "@/public/json/notes";

export default function HomeContent({user}:{user:NexeraUser}) {
  const params = useSearchParams();
  const route = params.get("r");
  const sub = params.get("u");
  const routeList = Array.from(params.values());

  const [activeIcon, setActiveIcon] = useState<string>(
    routeList.length === 0 ? "Home" : routeList[0]
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { replace } = useRouter();

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setActiveIcon(routeList.length === 0 ? "Home" : routeList[0]);
  }, [route]);

  useEffect(() => {
    const area = document.querySelector(".UsableArea");
    area?.scrollTo(0, 0);
  }, [activeIcon, sub]);

  return (
    <div className="page root" suppressHydrationWarning>
      {activeIcon === "login" && <Login />}
      {activeIcon === "register" && <Register />}

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

          <div className="ContentArea">
            <div className="UsableArea" key={activeIcon + sub}>
              {activeIcon === "Home" && <HomePage />}
              {activeIcon === "Notes" && !sub && (
                <Notes dataset={nexIctSubjects} favarites={user.data.notes.favorites} />
              )}
              {activeIcon === "Notes" && sub && <Notes_Sub topics={ictTopics} noteAbouts={ictNotes} />}
              {activeIcon === "Projects" && <Projects />}
              {activeIcon === "Admin" && <Admin subRoute={sub || "null"} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}