// app/(dashboard)/layout.tsx
import { UserProvider } from "@/contexts/UserContext";
import { getUserFromClerk } from "@/lib/server/user-helpers";
import NavbarControler from "./navbar-controler";
import { unstable_noStore } from "next/cache";
import { getCachedNotes } from "@/lib/firebase-cache";
import { nexNoteAbout, NexeraUser } from "@/components/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  unstable_noStore(); // Opt out of caching for auth-dependent layouts
  
  let user: NexeraUser | null = null;
  let notes: nexNoteAbout[] = [];
  
  try {
    user = await getUserFromClerk();
    notes = await getCachedNotes();
  } catch (error) {
    console.error("Dashboard layout data fetch error:", error);
  }
  
  return (
    <UserProvider initialUser={user || undefined}>
      <div className="page root">
        <NavbarControler notes={notes} />
        <div className="ContentArea">
          <div className="topBlur"></div>
          <div className="UsableArea">{children}</div>
        </div>
      </div>
    </UserProvider>
  );
}
