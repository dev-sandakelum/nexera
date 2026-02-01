"use client";

import { useUser } from "@/contexts/UserContext";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user } = useUser();

  // Check if user has admin badge (nexRoot or nexApex)
  const badgesArray = user?.badges ? Object.values(user.badges) : [];
  const hasAdminBadge = badgesArray.some(
    (badge: any) => badge.id === "nexRoot" || badge.id === "nexApex"
  );

  if (!user || !hasAdminBadge) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          paddingTop: '5rem',
          paddingBottom: '5rem'
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
          Access Denied
        </h2>
        <p
          style={{
            textAlign: 'center',
            maxWidth: '28rem'
          }}
        >
          You do not have the necessary permissions to access the Admin Dashboard.
          Please contact your administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  return children;
}
