import { NexeraUser } from "@/components/types";
import { NextResponse } from "next/server";
import { initAdmin } from "@/components/firebase/firebaseAdmin";
import { AuthUser } from "@/components/firebase/firebase";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("nexera_auth");

  const { email, password } = await req.json();
  await initAdmin();
  const users = await AuthUser();
  const user = users.find((u) => u.email == email);

  if (user) {
    if (user.password == password) {

      cookieStore.set("nexera_auth", user.email, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 10 , // 10 minutes
      });

      return NextResponse.json(
        { success: true, message: { email: user.email } },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: true, message: { err: "password did not matched" } },
      { status: 401 }
    );
  }
  return NextResponse.json(
    { success: false, message: { err: "user not exist" } },
    { status: 404 }
  );
}
