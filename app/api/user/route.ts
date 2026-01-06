// app/api/user/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserData } from "@/components/firebase/firebase";
import { initAdmin } from "@/components/firebase/firebaseAdmin";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nexera_auth")?.value || "";
  console.log("token:", token);
  if (!token) {
    return NextResponse.json(
      { success: false, message: { err: "not authenticated" } },
      { status: 401 }
    );
  }
  await initAdmin();
  const user = await UserData(token);
  if (user) {
    const { ...userData } = user;
    return NextResponse.json(
      { success: true, message: userData },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { success: false, message: { err: "user not found" } },
    { status: 404 }
  );
}
