"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { nexNoteAbout, nexNoteData } from "@/components/types";

// Required worker setup - use CDN to ensure version match
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({
  notesAbout,
  notesData,
  pathname,
}: {
  notesAbout: nexNoteAbout[];
  notesData: nexNoteData[];
  pathname: string;
}) {
  const [numPages, setNumPages] = useState<number>();
  const note = notesData.find(
    (nd) =>
      nd.noteId ==
      notesAbout.find((na) => na.slug == pathname.split("/").pop())?.id
  );
  let url;
  if (note?.context.type === "pdf") {
    url = (note?.context as { url: string }).url;
  }
  console.log("PDF URL :" + url);
  return (
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"column",
      marginTop:"80px",
      marginBottom:"80px"
    }}>
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading="Loading PDF..."
        error="Failed to load PDF"
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={index} pageNumber={index + 1} scale={1.2} />
        ))}
      </Document>
    </div>
  );
}
