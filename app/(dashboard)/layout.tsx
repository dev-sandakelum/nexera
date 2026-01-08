// app/(dashboard)/layout.tsx
import { UserProvider } from "@/contexts/UserContext";
import { getUserFromClerk } from "@/lib/server/user-helpers";
import NavbarControler from "./navbar-controler";
import { unstable_noStore } from 'next/cache';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  unstable_noStore(); // Opt out of caching for auth-dependent layouts
  const user = await getUserFromClerk();
  return (
    <UserProvider initialUser={user!}>
      <div className="page root">
        <NavbarControler />
        <div className="ContentArea">
          <div className="UsableArea">
            {children}
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
