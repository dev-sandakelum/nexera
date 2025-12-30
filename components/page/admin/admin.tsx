"use client";

import { useEffect } from "react";
import MainAdminPage from "./rotes/main/main";
import NotesManagement from "./notes-management";
import UserManagement from "./user-management";
import NotFound from "../not-found";

export default function Admin({ subRoute }: { subRoute?: string }) {
  // Scroll to top when component mounts or subRoute changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [subRoute]);

  if (subRoute == "null") {
    return <MainAdminPage />;
  }
  if (subRoute == "NM") {
    return <NotesManagement />;
  }
  if (subRoute == "UM") {
    return <UserManagement />;
  }
  return <NotFound />;
}
