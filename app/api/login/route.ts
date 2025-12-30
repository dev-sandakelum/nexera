import { GetUserByEmail } from "@/components/firebase/get-user-by";
import { NexeraUser } from "@/components/types";
import { log } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password required" },
      { status: 400 }
    );
  }

  const user = (await GetUserByEmail(email)) as NexeraUser | null;
  log("User fetched for login:", user);

  if (!user || user.password !== password) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    success: true,
    user: { email: user.email, name: user.name },
  });

  response.cookies.set({
    name: "auth-token",
    value: user.email, // or a JWT
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}
