"use server"
import QuizViewerClient from "@/components/page/notes/preview/quiz/quiz-viewer-client";
import { getCachedNoteBySlug, getCachedNoteDataById } from "@/lib/firebase-cache";
import { headers } from "next/headers";
import { nexNoteAbout, nexNoteData } from "@/components/types";

interface PageProps {
  params: {
    quiz: string | string[];
  };
}

export default async function page({ params }: PageProps) {
  const { quiz } = await params;
  const headersList = await headers();
  const pathname = Array.isArray(quiz) ? `/${quiz.join('/')}` : `/${quiz}`;
  // Extract slug from path or use param directly if it's the slug
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

  return <QuizViewerClient notesAbout={notesAbout} notesData={notesData} pathname={pathname} />;
}
