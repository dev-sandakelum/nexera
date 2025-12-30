import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GetUserByEmail } from "@/components/firebase/get-user-by";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    
    if (!token) {
      return NextResponse.json(null);
    }
    
    const user = await GetUserByEmail(token);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(null);
  }
}
