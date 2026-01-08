// app/(dashboard)/layout.tsx
import { UserProvider } from "@/contexts/UserContext";
import { getUserFromClerk } from "@/lib/server/user-helpers";
import NavbarControler from "./navbar-controler";

// dynamic config removed (incompatible with cacheComponents)

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromClerk();
  console.log("DashboardLayout user:", user);
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
