// app/api/user/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GetUserByEmail } from "@/components/firebase/get-user-by";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    
    if (!token) {
      return NextResponse.json(null, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        }
      });
    }
    
    const user = await GetUserByEmail(token);
    
    return NextResponse.json(user, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(null, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });
  }
}