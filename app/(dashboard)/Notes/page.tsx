import Notes from "@/components/page/notes/notes";
import { NexeraUser } from "@/components/types";
import { useUser } from "@/contexts/UserContext";
import { nexIctSubjects } from "@/public/json/subjects";
import { Suspense } from "react";

export default async function page() {
  
  return (
    <Suspense fallback={null}>
      <Notes data={nexIctSubjects}  />
    </Suspense>
  );
}
