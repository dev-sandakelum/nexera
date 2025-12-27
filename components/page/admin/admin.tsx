import React from "react";
import MainAdminPage from "./rotes/main";

export default function Admin({ subRoute }: { subRoute?: string }) {
  if (subRoute == "null") {
    return <MainAdminPage />;
  }
  return null
}
