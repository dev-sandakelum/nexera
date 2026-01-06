import { cookies } from "next/headers";
import NavbarControler from "./navbar-controler";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("nexera_auth")?.value || "";
  const user = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache",
      Authorization: `Bearer ${token}`, // Pass token in header
    },
  }).then((res) => res.json());

  // console.log("User in layout:", user);
  const User = user.message;
  return (
    <div className="page root">
      <NavbarControler user={User} />
      <div className="ContentArea">
        <div className="UsableArea" style={{ border: "1px solid red" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
