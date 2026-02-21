"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect, useRef } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { nexNoteAbout, nexNoteData } from "@/components/types";

// Required worker setup - use CDN to ensure version match
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MIN_SCALE = 0.5;
const MAX_SCALE = 3.0;
const SCALE_STEP = 0.2;

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
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track container width responsively
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    setContainerWidth(el.clientWidth);
    return () => observer.disconnect();
  }, []);

  const note = notesData.find(
    (nd) =>
      nd.noteId ==
      notesAbout.find((na) => na.slug == pathname.split("/").pop())?.id
  );

  let url: string | undefined;
  if (note?.context.type === "pdf") {
    url = (note?.context as { url: string }).url;
  }

  const zoomIn = () =>
    setScale((s) => Math.min(+(s + SCALE_STEP).toFixed(1), MAX_SCALE));
  const zoomOut = () =>
    setScale((s) => Math.max(+(s - SCALE_STEP).toFixed(1), MIN_SCALE));
  const resetZoom = () => setScale(1.0);
  const rotateLeft = () => setRotation((r) => (r - 90 + 360) % 360);
  const rotateRight = () => setRotation((r) => (r + 90) % 360);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px",
        marginBottom: "80px",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          marginBottom: "16px",
          background: "rgba(30, 30, 40, 0.85)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          position: "sticky",
          top: "16px",
          zIndex: 50,
        }}
      >
        {/* Zoom Out */}
        <button
          onClick={zoomOut}
          disabled={scale <= MIN_SCALE}
          title="Zoom Out"
          style={btnStyle(scale <= MIN_SCALE)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>

        {/* Zoom Level */}
        <button
          onClick={resetZoom}
          title="Reset Zoom"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            color: "#e2e8f0",
            fontSize: "13px",
            fontWeight: 600,
            padding: "5px 12px",
            cursor: "pointer",
            letterSpacing: "0.02em",
            minWidth: "58px",
            textAlign: "center",
            transition: "background 0.18s",
          }}
        >
          {Math.round(scale * 100)}%
        </button>

        {/* Zoom In */}
        <button
          onClick={zoomIn}
          disabled={scale >= MAX_SCALE}
          title="Zoom In"
          style={btnStyle(scale >= MAX_SCALE)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "28px",
            background: "rgba(255,255,255,0.12)",
            margin: "0 4px",
          }}
        />

        {/* Rotate Left */}
        <button
          onClick={rotateLeft}
          title="Rotate Left"
          style={btnStyle(false)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>

        {/* Rotate Right */}
        <button
          onClick={rotateRight}
          title="Rotate Right"
          style={btnStyle(false)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </button>
      </div>

      {/* PDF Document — responsive container: 80% on desktop, 100% on mobile */}
      <div
        ref={containerRef}
        style={{
          width: "min(80vw, 100%)",
          maxWidth: "100%",
        }}
      >
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading="Loading PDF..."
          error="Failed to load PDF"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div
              key={`page_${index}_w${containerWidth}_s${scale}_r${rotation}`}
              style={{ marginBottom: "12px" }}
            >
              <Page
                pageNumber={index + 1}
                width={containerWidth > 0 ? containerWidth * scale : undefined}
                rotate={rotation}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}

function btnStyle(disabled: boolean): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    background: disabled ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: disabled ? "rgba(255,255,255,0.25)" : "#e2e8f0",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background 0.18s, color 0.18s",
    outline: "none",
  };
}
