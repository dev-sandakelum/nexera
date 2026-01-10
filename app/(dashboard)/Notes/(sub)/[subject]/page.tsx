import {
  getCachedSubjects,
  getCachedTopics,
  getCachedNotes,
  getCachedUsersMinimal,
} from "@/lib/firebase-cache";
import Notes_Sub from "@/components/page/notes/notes-sub";
import { nexSubject, nexTopic, nexNoteAbout } from "@/components/types";

type PageProps = {
  params: {
    subject: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function page({ params, searchParams }: PageProps) {
  const { subject } = await params;

  // Initialize with empty defaults
  let subjects: nexSubject[] = [];
  let topics: nexTopic[] = [];
  let notes: nexNoteAbout[] = [];
  let users: { id: string; name: string }[] = [];

  try {
    // All queries are now cached - subsequent visits will hit cache (0 Firebase reads)
    [subjects, topics, notes, users] = await Promise.all([
      getCachedSubjects(),
      getCachedTopics(),
      getCachedNotes(),
      getCachedUsersMinimal(),
    ]);
  } catch (error: any) {
    console.error("Error fetching data for subject page:", error);
    // Log to file for debugging
    const fs = await import("fs");
    const path = await import("path");
    const logPath = path.resolve(process.cwd(), "debug-error.log");
    const logMessage = `${new Date().toISOString()} - Error: ${error?.message || error}\nStack: ${error?.stack || ''}\n\n`;
    fs.appendFileSync(logPath, logMessage);
    
    return <div>Failed to load data. Please try again later.</div>;
  }

  const selectedSubject = subjects.find((sub) => sub.slug === subject);

  if (!selectedSubject) {
    return <div>Subject not found</div>;
  }

  return (
    <Notes_Sub
      selectedSubject={selectedSubject}
      topics={topics}
      noteAbouts={notes}
      users={users}
    />
  );
}
