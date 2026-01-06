import { cookies } from "next/headers";
import NavbarControler from "./navbar-controler";
import { UserProvider } from "@/contexts/UserContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("nexera_auth")?.value || "";
  let User = null;
  try {
    const user = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${token}`, // Pass token in header
      },
    }).then((res) => res.json());
    User = user.message;
  } catch (error) {
    console.log("Error fetching user in layout:", error);
  }
  // console.log("User in layout:", user);
  return (
    <UserProvider initialUser={User}>
      <div className="page root">
        <NavbarControler />
        <div className="ContentArea">
          <div className="UsableArea" style={{ border: "1px solid red" }}>
            {children}
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
