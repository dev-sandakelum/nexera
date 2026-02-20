// app/api/quiz-activity/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { initAdmin } from "@/components/firebase/firebaseAdmin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { revalidateUsers } from "@/lib/revalidate";
import { QuizActivityData, NexeraUser } from "@/components/types";
import { getCachedUserByEmail } from "@/lib/firebase-cache";
import { currentUser } from "@clerk/nextjs/server";

// ─────────────────────────────────────────
// GET /api/quiz-activity?quizId=<id>
// Returns the saved quiz attempt for the current user, or null.
// ─────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ activity: null }, { status: 200 });
    }

    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get("quizId");
    if (!quizId) {
      return NextResponse.json(
        { error: "quizId query param is required" },
        { status: 400 }
      );
    }

    // Get the Nexera user by Clerk email
    const clerkUser = await currentUser();
    const email = clerkUser?.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json({ activity: null }, { status: 200 });
    }

    const user = await getCachedUserByEmail(email);
    if (!user) {
      return NextResponse.json({ activity: null }, { status: 200 });
    }

    // Find matching quiz entry
    const entry = user.Activity?.quizzesTaken?.find((q) => q.quizID === quizId);

    return NextResponse.json({ activity: entry?.data ?? null });
  } catch (error) {
    console.error("Error in GET /api/quiz-activity:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz activity" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────
// POST /api/quiz-activity
// Body: { quizId, score, total, percentage, userAnswers }
// Upserts the quiz attempt in Activity.quizzesTaken.
// ─────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      quizId,
      score,
      total,
      percentage,
      userAnswers,
      status = "completed",
      lastUpdated = new Date().toISOString(),
    } = body as {
      quizId: string;
      score: number;
      total: number;
      percentage: string;
      userAnswers: (number | null)[];
      status?: "in-progress" | "completed";
      lastUpdated?: string;
    };

    if (!quizId) {
      return NextResponse.json(
        { error: "quizId is required" },
        { status: 400 }
      );
    }

    // Identify the Nexera user
    const clerkUser = await currentUser();
    const email = clerkUser?.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: "No email found" }, { status: 400 });
    }

    await initAdmin();
    const db = getFirestore();

    // Look up user document
    const snapshot = await db
      .collection("TestUsers")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userDoc = snapshot.docs[0];
    const userData = { id: userDoc.id, ...userDoc.data() } as NexeraUser;

    const activityData: QuizActivityData = {
      score,
      total,
      percentage,
      userAnswers,
      takenAt: new Date().toISOString(),
      status,
      lastUpdated,
    };

    // Build updated quizzesTaken array (upsert by quizID)
    const existing: NexeraUser["Activity"]["quizzesTaken"] =
      userData.Activity?.quizzesTaken ?? [];

    const idx = existing.findIndex((q) => q.quizID === quizId);
    let updatedQuizzesTaken: NexeraUser["Activity"]["quizzesTaken"];

    if (idx !== -1) {
      // Update existing entry
      updatedQuizzesTaken = existing.map((q, i) =>
        i === idx ? { quizID: quizId, data: activityData } : q
      );
    } else {
      // Append new entry
      updatedQuizzesTaken = [
        ...existing,
        { quizID: quizId, data: activityData },
      ];
    }

    await userDoc.ref.update({
      "Activity.quizzesTaken": updatedQuizzesTaken,
    });

    // Revalidate user cache so next load picks up the change
    await revalidateUsers(userDoc.id, email);

    return NextResponse.json({ success: true, activity: activityData });
  } catch (error) {
    console.error("Error in POST /api/quiz-activity:", error);
    return NextResponse.json(
      { error: "Failed to save quiz activity" },
      { status: 500 }
    );
  }
}
