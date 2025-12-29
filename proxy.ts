import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value || "";
  const r = req.nextUrl.searchParams.get("r") || "Home";

  // Define which routes need login
  const protectedRoutes = ["Admin", "Notes", "Projects"];

  // Allow public routes
  const publicRoutes = ["Home", "login", "register"];

  // If user tries to access a protected route without token → redirect
  if (!token && protectedRoutes.includes(r)) {
    return NextResponse.redirect(new URL("/?r=login", req.url));
  }

  // Otherwise allow
  return NextResponse.next();
}
