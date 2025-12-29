// app/api/login/route.ts
import { nexeraUsers } from "@/public/json/users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log(email + "     " + password);

  const user = nexeraUsers.find((u) => u.email === email);

  if (email != null && password != null && user) {
    if (user.email == email) {
      if (user.password == password) {
        const response = NextResponse.json({ success: true });

        response.cookies.set({
          name: "auth-token",
          value: email, // could be JWT or any string
          httpOnly: true, // cannot be read by JS (recommended)
          maxAge: 60 * 60 * 24, // 1 day
          path: "/", // accessible for all routes
          secure: process.env.NODE_ENV === "production", // HTTPS only in prod
          sameSite: "lax", // prevents CSRF in most cases
        });

        return response;
      }
    }
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
