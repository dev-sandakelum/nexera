'use client';

import dynamic from "next/dynamic";
import { nexNoteAbout, nexNoteData } from "@/components/types";

const PDFViewer = dynamic(() => import("@/components/page/notes/preview/pdf/pdfViewer"), {
  ssr: false,
});

interface PDFViewerClientProps {
  notesAbout: nexNoteAbout[];
  notesData: nexNoteData[];
  pathname: string;
}

export default function PDFViewerClient({
  notesAbout,
  notesData,
  pathname,
}: PDFViewerClientProps) {
  return (
    <PDFViewer
      notesAbout={notesAbout}
      notesData={notesData}
      pathname={pathname}
    />
  );
}
