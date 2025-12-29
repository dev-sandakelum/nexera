// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
console.log(email + "     " + password);

  // Replace with your real validation
  if (email === "admin@example.com" && password === "123456") {
    const response = NextResponse.json({ success: true });

    // Set cookie for 1 day
    response.cookies.set({
      name: "auth-token",
      value: "user-unique-token", // could be JWT or any string
      httpOnly: true, // cannot be read by JS (recommended)
      maxAge: 60 * 60 * 24, // 1 day
      path: "/", // accessible for all routes
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "lax", // prevents CSRF in most cases
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
