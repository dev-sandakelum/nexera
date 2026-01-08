import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

import "@/components/styles/fonts.css";
import "@/components/styles/not-found.css";

// Base Styles
import "@/components/styles/app/main.css";

import "@/components/styles/app/nav.css";
import "@/components/styles/app/heading-navbar.css";

import "@/components/styles/app/scroll-bar.css";

import "@/components/styles/home/main.css";

import "@/components/styles/notes/main.css";
import "@/components/styles/notes/card0.css";
import "@/components/styles/notes-sub/main.css";
import "@/components/styles/notes-sub/card1.css";
import "@/components/styles/notes/preview/md.css";

import "@/components/styles/projects/main.css";

import "@/components/styles/admin/main.css";
import "@/components/styles/admin/dashboard/card.css";
import "@/components/styles/admin/dashboard/ctrl-btn.css";
import "@/components/styles/admin/notes-m.css";
import "@/components/styles/admin/user-m.css";

import "@/components/styles/admin/settings/main.css";

import "@/components/styles/auth/main.css";

// Mobile
import "@/components/styles/MOBILE/main.css";
import "@/components/styles/MOBILE/nav.css";

import "@/components/styles/MOBILE/notes/main.css";
import "@/components/styles/MOBILE/notes/card0.css";
import "@/components/styles/MOBILE/notes-sub/main.css";
import "@/components/styles/MOBILE/notes-sub/card1.css";

import "@/components/styles/MOBILE/projects/main.css";

import "@/components/styles/MOBILE/auth/main.css";
import "@/components/styles/MOBILE/admin/notes-m.css";
import "@/components/styles/MOBILE/admin/user-m.css";

import "@/components/styles/MOBILE/admin/settings/main.css";
import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import LoadingAnimation from "@/components/page/loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexEra",
  description: "The next-era",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppins.variable} ${geistMono.variable} `}
          style={{
            maxHeight: "100svh",
            overflow: "hidden",
          }}
          suppressHydrationWarning
        >
          <Suspense fallback={<LoadingAnimation />}>{children}</Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
