// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "nexera_auth",
    value: "",
    maxAge: 0, // deletes cookie
    path: "/",
  });

  return response;
}
