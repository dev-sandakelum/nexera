import { Suspense } from "react";
import HomeContent from "./home-content";
import { nexeraUsers } from "@/public/json/users";
import { NexeraUser } from "@/components/types";
import { cookies } from "next/headers";

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
  badges: [
  ],
  data: {
    notes: { favorites: [], uploads: [] },
    projects: { favorites: [], contributions: [] },
    applications: { favorites: [], uploads: [] },
  },
};

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  const user = nexeraUsers.find(
    (u) => u.email == token
  );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent user={user ? user : guestUser} />
    </Suspense>
  );
}
