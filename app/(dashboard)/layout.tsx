import { UserProvider } from "@/contexts/UserContext";
import NavbarControler from "./navbar-controler";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="page root">
      <UserProvider>
        <Suspense
          fallback={
            <div
              style={{
                width: "100vw",
                height: "100vh",
                background: "#000",
              }}
            />
          }
        >
          <NavbarControler />
          <div className="ContentArea">
            <div className="UsableArea" style={{ border: "1px solid red" }}>
              {children}
            </div>
          </div>
        </Suspense>
      </UserProvider>
    </div>
  );
}
