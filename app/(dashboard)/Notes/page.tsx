import { 
  getCachedSubjects, 
  getCachedUsers, 
  getCachedBadges 
} from "@/lib/mongodb-cache";
import Notes from "@/components/page/notes/notes";
import { Suspense } from "react";
import { nexSubject, NexeraUser, nexBadge } from "@/components/types";

export default async function Page() {
  let subjects: nexSubject[] = [];
  let users: NexeraUser[] = [];
  let badges: nexBadge[] = [];

  try {
    // All queries are now cached - subsequent visits will hit cache (0 Firebase reads)
    [subjects, users, badges] = await Promise.all([
      getCachedSubjects(),
      getCachedUsers(),
      getCachedBadges(),
    ]);
  } catch (error) {
    console.error("Error fetching Notes page data:", error);
  }

  return (
    <Suspense fallback={null}>
      <Notes data={subjects} users={users} badges={badges} />
    </Suspense>
  );
}
