import { NexeraUser } from "@/components/types";
import { NextResponse } from "next/server";
import { initAdmin } from "@/components/firebase/firebaseAdmin";
import { User } from "@/components/firebase/firebase";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await initAdmin();
  const users = await User();
  const user = users.find((u) => u.email == email);
  if (user) {
    if (user.password == password) {
      return NextResponse.json(
        { success: true, message: { email: user.email } },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: true, message: {err : "password did not matched"} },
      { status: 401 }
    );
  }
  return NextResponse.json(
    { success: false, message: {err : "user not exist"} },
    { status: 404 }
  );
}
