import {
  getCachedSubjectBySlug,
  getCachedTopicsBySubject,
  getCachedNotesByTopicIds,
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

  let selectedSubject: nexSubject | null = null;
  let topics: nexTopic[] = [];
  let notes: nexNoteAbout[] = [];
  let users: { id: string; name: string }[] = [];

  try {
    // 1. Fetch Subject First
    selectedSubject = await getCachedSubjectBySlug(subject);
    
    if (selectedSubject) {
      // 2. Fetch related data only if subject exists
      // Fetch topics for this subject
      topics = await getCachedTopicsBySubject(selectedSubject.id);
      
      // Fetch notes for these topics (if any)
      if (topics.length > 0) {
        const topicIds = topics.map(t => t.id);
        notes = await getCachedNotesByTopicIds(topicIds);
      }
      
      // Fetch users for display (optimized minimal fetch)
      users = await getCachedUsersMinimal();
    }
  } catch (error) {
    console.error("Error fetching data for subject page:", error);
    return <div>Failed to load data. Please try again later.</div>;
  }

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
