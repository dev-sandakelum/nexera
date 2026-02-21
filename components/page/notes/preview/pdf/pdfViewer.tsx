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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // Mirrors `scale` state so applyZoom callbacks always read the live value
  const scaleRef = useRef<number>(1.0);

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

  // Track mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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

  /**
   * Apply a new zoom level while keeping the visible center of the scroll
   * container stable — the same behaviour as Chrome / Adobe PDF Viewer.
   */
  const applyZoom = (newScale: number) => {
    const el = containerRef.current;
    const oldScale = scaleRef.current;
    scaleRef.current = newScale;
    setScale(newScale);

    if (!el) return;
    // Capture the fractional center of the visible area *before* the repaint
    const centerRatioX =
      (el.scrollLeft + el.clientWidth / 2) / (el.scrollWidth || 1);
    const centerRatioY =
      (el.scrollTop + el.clientHeight / 2) / (el.scrollHeight || 1);
    const ratio = newScale / oldScale;

    requestAnimationFrame(() => {
      // Scroll so the same content point stays centred after the scale change
      el.scrollLeft = el.scrollWidth * centerRatioX - el.clientWidth / 2;
      el.scrollTop = el.scrollHeight * centerRatioY - el.clientHeight / 2;
      // Fallback: if content didn't grow (e.g. first render) keep simple ratio
      if (el.scrollLeft === 0 && el.scrollTop === 0) {
        el.scrollLeft =
          (el.scrollLeft + el.clientWidth / 2) * ratio - el.clientWidth / 2;
        el.scrollTop =
          (el.scrollTop + el.clientHeight / 2) * ratio - el.clientHeight / 2;
      }
    });
  };

  const zoomIn = () =>
    applyZoom(Math.min(+(scaleRef.current + SCALE_STEP).toFixed(1), MAX_SCALE));
  const zoomOut = () =>
    applyZoom(Math.max(+(scaleRef.current - SCALE_STEP).toFixed(1), MIN_SCALE));
  const resetZoom = () => applyZoom(1.0);
  const rotateLeft = () => setRotation((r) => (r - 90 + 360) % 360);
  const rotateRight = () => setRotation((r) => (r + 90) % 360);

  // Auto-reload once when the PDF.js worker crashes (null transport error)
  const handleLoadError = (error: Error) => {
    console.error("PDF load error:", error);
    const key = "pdf-worker-reloaded";
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      window.location.reload();
    }
  };

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    // Clear the reload guard so future navigation can still auto-recover
    sessionStorage.removeItem("pdf-worker-reloaded");
    setNumPages(numPages);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px",
        marginBottom: isMobile ? "100px" : "80px",
        padding: 0,
        width: "100%",
      }}
    >
      {/* Toolbar */}
      <div
        style={
          isMobile
            ? {
                // Mobile: fixed dark bar pinned to the bottom of the screen
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "10px 20px",
                background: "rgba(18, 18, 28, 0.95)",
                backdropFilter: "blur(16px)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 -4px 24px rgba(0,0,0,0.4)",
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
              }
            : {
                // Desktop: sticky bar near the top
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
              }
        }
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

      {/* PDF Document — full width, scrolls horizontally when zoomed in */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          overflowX: "scroll",
        }}
      >
        {/* Inner centering wrapper — grows with the page so overflow is symmetric */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "min-content",
          }}
        >
          <Document
            file={url}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={handleLoadError}
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
                  width={
                    containerWidth > 0 ? containerWidth * scale : undefined
                  }
                  rotate={rotation}
                />
              </div>
            ))}
          </Document>

          {/* Single copyright footer below all pages */}
          {numPages && (
            <div
              style={{
                marginTop: "20px",
                paddingBottom: "8px",
                textAlign: "center",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                color: "rgba(200, 200, 220, 0.55)",
                userSelect: "none",
              }}
            >
              © {new Date().getFullYear()} Nexera — All rights reserved
            </div>
          )}
        </div>
        {/* end inner centering wrapper */}
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
