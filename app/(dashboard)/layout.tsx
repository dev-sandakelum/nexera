import NavbarControler from "./navbar-controler";
import { Suspense } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
    cache: "no-store",
    headers: { "Cache-Control": "no-cache" },
  }).then((res) => res.json());
  console.log("User in layout:", user);
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
