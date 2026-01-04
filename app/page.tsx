import { Suspense } from "react";
import HomeContent from "./home-content";
import { NexeraUser } from "@/components/types";
import { redirect } from "next/navigation";

export const guestUser: NexeraUser = {
  id: "guest_000",
  name: "Guest User",
  email: "guest@nex.com",
  password: "",
  profilePicture: "/img/profile_pic/0.jpg", // Default placeholder
  headline: "Exploring Nexera",
  bio: "I am currently visiting as a guest.",
  location: "Global",
  joinedAt: new Date().toISOString(),
  academic: {
    institution: "Guest Access",
    degree: "N/A",
    fieldOfStudy: "General",
    studyingYear: 0,
    graduationYear: 0,
  },
  // Satisfying the "min 2 badges" requirement
  badges: [],
  data: {
    notes: { favorites: [], uploads: [] },
    projects: { favorites: [], contributions: [] },
    applications: { favorites: [], uploads: [] },
  },
  status:"active",
  lastLogin: new Date().toISOString(),
};

export default function Home() {
  redirect('/Home');
  // return (
  //   <Suspense fallback={<div style={{ width: '100vw', height: '100vh', background: 'transparent' }} />}>
  //     {/* <HomeContent /> */}
  //   </Suspense>
  // );
}
