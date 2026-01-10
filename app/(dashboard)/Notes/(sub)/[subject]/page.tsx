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
  } catch (error) {
    console.error("Error fetching data for subject page:", error);
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
