import MainAdminPage from "@/components/page/admin/main";
import { NexeraUser, nexNoteAbout } from "@/components/types";
import { getCachedNotes, getCachedUsers } from "@/lib/firebase-cache";

export default async function page() {
  const [users, notes] = await Promise.all([
    getCachedUsers(),
    getCachedNotes(),
  ]);
  return <MainAdminPage usersCount={users.length} notesCount={notes.length} />;
}
