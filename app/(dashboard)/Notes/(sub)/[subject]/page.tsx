import {
  getCachedSubjects,
  getCachedTopics,
  getCachedNotes,
  getCachedUsersMinimal,
} from "@/lib/firebase-cache";
import Notes_Sub from "@/components/page/notes/notes-sub";

type PageProps = {
  params: {
    subject: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function page({ params, searchParams }: PageProps) {
  const { subject } = await params;

  // All queries are now cached - subsequent visits will hit cache (0 Firebase reads)
  const [subjects, topics, notes, users] = await Promise.all([
    getCachedSubjects(),
    getCachedTopics(),
    getCachedNotes(),
    getCachedUsersMinimal(),
  ]);

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
