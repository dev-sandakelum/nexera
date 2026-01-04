import Notes from "@/components/page/notes/notes";
import { nexIctSubjects } from "@/public/json/subjects";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={null}>
      <Notes data={nexIctSubjects}/>
    </Suspense>
  );
}
