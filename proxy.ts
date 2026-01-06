import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("nexera_auth")?.value || "";
  const pathname = req.nextUrl.pathname;
  const route = pathname.split("/")[1];
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }
  // Define which routes need login
  const protectedRoutes = [
    "Admin",
    "Notes",
    "Projects",
    "Applications",
    "Info",
    "Settings",
  ];

  // Allow public routes
  const publicRoutes = ["Home", "login", "register"];

  // If user tries to access a protected route without token → redirect
  if (!token && protectedRoutes.includes(route)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Otherwise allow
  return NextResponse.next();
}
