"use server";
import QuizViewerClient from "@/components/page/notes/preview/quiz/quiz-viewer-client";
import {
  getCachedNoteBySlug,
  getCachedNoteDataById,
} from "@/lib/firebase-cache";
import {
  nexNoteAbout,
  nexNoteData,
  QuizActivityData,
} from "@/components/types";
import { getUserFromClerk } from "@/lib/server/user-helpers";

interface PageProps {
  params: {
    quiz: string | string[];
  };
}

export default async function page({ params }: PageProps) {
  const { quiz } = await params;
  const pathname = Array.isArray(quiz) ? `/${quiz.join("/")}` : `/${quiz}`;
  const quizSlug = Array.isArray(quiz) ? quiz[quiz.length - 1] : quiz;

  let notesAbout: nexNoteAbout[] = [];
  let notesData: nexNoteData[] = [];

  try {
    // 1. Fetch specific quiz by slug
    const quizAcc = await getCachedNoteBySlug(quizSlug);

    if (quizAcc) {
      notesAbout = [quizAcc];

      // 2. Fetch data for this quiz
      const data = await getCachedNoteDataById(quizAcc.id);
      if (data) {
        notesData = [data];
      }
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return <div>Failed to load quiz. Please try again later.</div>;
  }

  // 3. Get current user + their saved activity for this quiz
  let currentUserId: string | undefined;
  let savedActivity: QuizActivityData | undefined;

  try {
    const user = await getUserFromClerk();
    if (user) {
      currentUserId = user.id;
      const quizNote = notesAbout[0];
      if (quizNote) {
        const entry = user.Activity?.quizzesTaken?.find(
          (q) => q.quizID === quizNote.id
        );
        if (entry) {
          savedActivity = entry.data;
        }
      }
    }
  } catch {
    // Not logged in or user fetch failed — silent continue
  }

  return (
    <QuizViewerClient
      notesAbout={notesAbout}
      notesData={notesData}
      pathname={pathname}
      userId={currentUserId}
      savedActivity={savedActivity}
    />
  );
}
