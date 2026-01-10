import { nexNoteAbout, nexNoteData } from "@/components/types";
import { MarkdownRenderer } from "./MarkdownRenderer";
import Note_NotFound from "./not-found";

export default async function Page({
  notesAbout,
  notesData,
  pathname,
}: {
  notesAbout: nexNoteAbout[];
  notesData: nexNoteData[];
  pathname: string;
}) {
  const noteSlug = pathname.split("/").pop() || "";
  const note = notesAbout.find((n) => n.slug === noteSlug);
  const noteData = notesData.find((n) => n.noteId === note?.id);

  const url =
    noteData?.context && "url" in noteData.context
      ? (noteData.context as { url?: string }).url
      : undefined;

  if (!url) {
    return <Note_NotFound />;
  }

  const content = await fetch(url).then((r) => r.text());
  const logo = `<img src="/logo/logo-transparent.png"  style="height:90px;margin-right:32px"/>`;
  const now = new Date();
  const footer = `<hr style="margin-top:48px;margin-bottom:24px;border:none;border-top:1px solid #e5e7eb"/>

<footer style="
  display:flex;
  flex-direction:column;
  gap:8px;
  font-size:13px;
  color:#6b7280;
">
  <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
    <span>
      © ${now.getFullYear()} Nexera Notes. All rights reserved.
    </span>
  </div>

  <span style="font-size:12px;color:#9ca3af;">
   This educational material is provided solely for academic reference and learning purposes.
  </span>
</footer>
`;
  const content2 = logo + content + footer;
  console.log(content2);
  return <MarkdownRenderer content={content2} />;
}
