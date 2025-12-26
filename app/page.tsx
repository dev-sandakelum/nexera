"use client";
import HeadingNavBar from "@/components/nav/heading-navbar";
import "./styles/app/main.css";
import "./styles/app/nav.css";
import "./styles/app/heading-navbar.css";
import "./styles/app/scroll-bar.css";

import "./styles/notes/main.css";

import "./styles/notes-sub/main.css";
import "./styles/notes-sub/card1.css";

import NavBar from "@/components/nav/main";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Notes from "@/components/page/notes/notes";
import { Testdataset } from "@/public/json/dataset";
import Notes_Sub from "@/components/page/notes/notes-sub";
import { Fav_dataset } from "@/public/json/fav";
import { Suggestion_dataset } from "@/public/json/suggest";

export default function Home() {
  const params = useSearchParams();
  const route = params.get("r");
  const sub = params.get("u");
  const routeList = route ? route.split("/r/") : [];

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

  return (
    <div
      className="page root"
      suppressHydrationWarning
      onLoad={() => setActiveIcon(routeList[0])}
    >
      <NavBar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      <HeadingNavBar data={routeList} />
      <div className="ContentArea">
        <div className="UsableArea">
          {activeIcon === "Notes" && !sub && <Notes datasetA={Fav_dataset} datasetB={Suggestion_dataset} />}
          {activeIcon === "Notes" && sub && <Notes_Sub dataset={Testdataset} />}
        </div>
      </div>
    </div>
  );
}
