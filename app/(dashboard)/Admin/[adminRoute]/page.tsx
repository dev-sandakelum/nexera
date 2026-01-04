"use client";
import ErrorComponent from "@/app/error";
import NotesManagement from "@/components/page/admin/notes-management";
import UserManagement from "@/components/page/admin/user-management";
import { usePathname } from "next/navigation";

export default function page() {
  const pathname = usePathname();
  const adminRoute = pathname.split("/").pop();

  if (adminRoute === "notes-management") return <NotesManagement />;

  if (adminRoute === "user-management") return <UserManagement />;

  const error = new globalThis.Error("Invalid admin route") as Error & { digest?: string };
  return <ErrorComponent error={error} reset={() => {}} />;
}
