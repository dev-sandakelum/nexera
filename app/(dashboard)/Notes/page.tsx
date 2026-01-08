import { 
  getCachedSubjects, 
  getCachedUsers, 
  getCachedBadges 
} from "@/lib/firebase-cache";
import Notes from "@/components/page/notes/notes";
import { Suspense } from "react";

export default async function Page() {
  // All queries are now cached - subsequent visits will hit cache (0 Firebase reads)
  const [subjects, users, badges] = await Promise.all([
    getCachedSubjects(),
    getCachedUsers(),
    getCachedBadges(),
  ]);

  return (
    <Suspense fallback={null}>
      <Notes data={subjects} users={users} badges={badges} />
    </Suspense>
  );
}