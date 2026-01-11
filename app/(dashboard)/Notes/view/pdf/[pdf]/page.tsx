import { nexNoteAbout, nexNoteData } from "@/components/types";
import { getCachedNoteBySlug, getCachedNoteDataById } from "@/lib/firebase-cache";
import { headers } from "next/headers";
import PDFViewerClient from "@/components/page/notes/preview/pdf/pdf-viewer-client";

export default async function  Page({ params }: { params: { pdf: string | string[] } }) {
    const { pdf } = await params;
      const headersList = await headers();
      const pathname = Array.isArray(pdf) ? `/${pdf.join('/')}` : `/${pdf}`;
      // Extract slug from path or use param directly if it's the slug
      const pdfSlug = Array.isArray(pdf) ? pdf[pdf.length - 1] : pdf;
    
      // console.log("form home Fetching note for slug:", noteSlug);
    
      let notesAbout: nexNoteAbout[] = [];
      let notesData: nexNoteData[] = [];
    
      try {
        // 1. Fetch specific note by slug
        const noteAcc = await getCachedNoteBySlug(pdfSlug);
        
        if (noteAcc) {
          notesAbout = [noteAcc];
          
          // 2. Fetch data for this note
          const data = await getCachedNoteDataById(noteAcc.id);
          if (data) {
            notesData = [data];
          }
        }
      } catch (error) {
        console.error("Error fetching note preview data:", error);
        return <div>Failed to load note. Please try again later.</div>;
      }
  return (
    <div className="p-6">
      <PDFViewerClient notesAbout={notesAbout} notesData={notesData} pathname={pathname} />
    </div>
  );
}