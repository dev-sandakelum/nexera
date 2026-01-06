import UserProfile from "@/components/page/settings/Profile-Management";
import { cookies } from "next/headers";
import React from "react";

export default async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nexera_auth")?.value || "";
  const user = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache",
      Authorization: `Bearer ${token}`, // Pass token in header
    },
  }).then((res) => res.json());

  const User = user.message;

  return <UserProfile user={User} />;
}
