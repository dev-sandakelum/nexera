// app/api/user-update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { initAdmin } from "@/components/firebase/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await initAdmin();
    const db = getFirestore();
    const userRef = db.collection("TestUsers").doc(id);
    
    // Update the user document
    await userRef.update({
      ...updates,
      updatedAt: new Date().toISOString(),
    });

    // Fetch the updated user
    const updatedDoc = await userRef.get();
    
    if (!updatedDoc.exists) {
      return NextResponse.json(
        { error: "User not found after update" },
        { status: 404 }
      );
    }

    const user = { id: updatedDoc.id, ...updatedDoc.data() };

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error in PUT /api/user-update:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}