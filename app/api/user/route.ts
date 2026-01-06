// app/api/user/route.ts
import { NextResponse } from "next/server";
import { UserData, UsersCount } from "@/components/firebase/firebase";
import { initAdmin } from "@/components/firebase/firebaseAdmin";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NexeraUser } from "@/components/types";
import { getFirestore } from "firebase-admin/firestore";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clerk_user = await currentUser();
  if (clerk_user) {
    const { clerk_id, clerk_email, clerk_name, clerk_image } = {
      clerk_id: clerk_user.id,
      clerk_email: clerk_user.primaryEmailAddress?.emailAddress,
      clerk_name: clerk_user.fullName,
      clerk_image: clerk_user.imageUrl,
    };
    console.log("Clerk User:", {
      clerk_id,
      clerk_email,
      clerk_name,
      clerk_image,
    });

    if (!clerk_email) {
      return NextResponse.json(
        { success: false, message: { err: "not authenticated" } },
        { status: 401 }
      );
    }
    await initAdmin();
    const user = await UserData(clerk_email);
    if (user) {
      const { ...userData } = user;
      return NextResponse.json(
        { success: true, message: userData },
        { status: 200 }
      );
    }
    const newUser: NexeraUser = {
      email: clerk_email,
      name: clerk_name || "No Name",
      profilePicture: clerk_image || "",
      password: "",
      joinedAt: new Date().toISOString(),
      bio: "",
      badges: [],
      academic: {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        studyingYear: 0,
        graduationYear: 0,
      },
      data: {
        notes: { favorites: [], uploads: [] },
        projects: { favorites: [], contributions: [] },
        applications: { favorites: [], uploads: [] },
      },
      headline: "",
      id: crypto.randomUUID(),
      location: "",
      status: "active",
      lastLogin: new Date().toISOString(),
    };
    await initAdmin();
    const db = getFirestore();
    const userRef = db.collection("TestUsers").doc(newUser.id);
    await userRef.set(newUser);

    return NextResponse.json(
      { success: true, message: newUser.email + " registered successfully" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { success: false, message: { err: "not authenticated" } },
      { status: 401 }
    );
  }
}
