"use client";
import HeadingNavBar from "@/components/nav/heading-navbar";
import "./styles/app/main.css";
import "./styles/app/nav.css";
import "./styles/app/heading-navbar.css";
import "./styles/app/scroll-bar.css";

import "./styles/notes/main.css";
import "./styles/notes/card0.css";

import "./styles/notes-sub/main.css";
import "./styles/notes-sub/card1.css";

import "./styles/projects/main.css";

import "./styles/admin/main.css";

import NavBar from "@/components/nav/main";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Notes from "@/components/page/notes/notes";
import { Testdataset } from "@/public/json/dataset";
import Notes_Sub from "@/components/page/notes/notes-sub";
import { Fav_dataset } from "@/public/json/fav";
import { Suggestion_dataset } from "@/public/json/suggest";
import Projects from "@/components/page/projects/projects";
import Admin from "@/components/page/admin/admin";

export default function HomeContent() {
  const params = useSearchParams();
  const route = params.get("r");
  const sub = params.get("u");
  const routeList = Array.from(params.values());

  const [activeIcon, setActiveIcon] = useState<string>(
    routeList.length === 0 ? "Home" : routeList[0]
  );

  useEffect(() => {
    if (routeList.length === 0) {
      setActiveIcon("Home");
    } else {
      setActiveIcon(routeList[0]);
    }
  }, [route]);

  useEffect(() => {
    const area = document.querySelector(".UsableArea");
    area?.scrollTo(0, 0);
  }, [activeIcon, sub]);

  return (
    <div
      className="page root"
      suppressHydrationWarning
      onLoad={() => setActiveIcon(routeList[0])}
    >
      <NavBar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      <HeadingNavBar data={routeList} />
      <div className="ContentArea">
        <div className="UsableArea" key={activeIcon + sub}>
          {activeIcon === "Notes" && !sub && <Notes datasetA={Fav_dataset} datasetB={Suggestion_dataset} />}
          {activeIcon === "Notes" && sub && <Notes_Sub dataset={Testdataset} />}
          {activeIcon === "Projects" && <Projects />}
          {activeIcon === "Admin" && <Admin subRoute={sub ? sub : "null"}/>}
        </div>
      </div>
    </div>
  );
}
