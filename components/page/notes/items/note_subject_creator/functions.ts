import {
  nexSubject,
  nexTopic,
  nexNoteAbout,
  nexNoteData,
} from "@/components/types";
import { v4 as uuidv4 } from "uuid";
// Mock current user (replace with actual auth in production)
export const currentUser = {
  id: "nexStart",
  role: "nexStart" as const,
};

// Mock departments (replace with actual data source)
export const departments = [
  { id: "ICT", name: "Information and Communications Technology", code: "ICT" },
];

/**
 * Generate URL-safe slug from title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
};

/**
 * Color configurations for note types
 */
export const typeColors = {
  note: { bg: "#dbeafe", fg: "#1e40af" },
  pdf: { bg: "#fef9c3", fg: "#a16207" },
  quiz: { bg: "#dcfce7", fg: "#15803d" },
} as const;

/**
 * Color configurations for note status
 */
export const statusColors = {
  pending: { bg: "#fef9c3", fg: "#a16207" },
  approved: { bg: "#dcfce7", fg: "#15803d" },
  rejected: { bg: "#fee2e2", fg: "#b91c1c" },
} as const;

/**
 * Create a new subject object
 */
export const createSubject = (
  form: Partial<nexSubject>,
  userId: string
): nexSubject => {
  return {
    id: `sub_${Date.now()}`,
    title: form.title || "",
    description: form.description || "",
    slug: generateSlug(form.title || "") + "-" + uuidv4().split("-")[0],
    departmentID: form.departmentID || "CS",
    academicYear: form.academicYear || 1,
    semester: form.semester,
    createdBy: userId,
    isOfficial: form.isOfficial || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Create a new topic object
 */
export const createTopic = (
  form: Partial<nexTopic>,
  subjectID: string,
  userId: string
): nexTopic => {
  return {
    id: `topic_${Date.now()}`,
    subjectID,
    title: form.title || "",
    description: form.description || "",
    slug: generateSlug(form.title || "") + "-" + uuidv4().split("-")[0],
    createdBy: userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Create a new note object
 */
export const createNoteAbout = (
  id: string,
  form: Partial<nexNoteAbout>,
  topicID: string,
  publishedBy: string,
): nexNoteAbout => {
  return {
    id,
    topicID,
    title: form.title || "",
    description: form.description || "",
    type: form.type || "note",
    slug: generateSlug(form.title || "") + "-" + uuidv4().split("-")[0],
    createdAt: new Date().toISOString(),
    published: form.published || false,
    publishedBy,
    updatedAt: new Date().toISOString(),
    status: form.status || "pending",
    approvedBy: form.approvedBy,
  };
};

export const createNoteData = (
  noteId: string,
  form: Partial<nexNoteData>
): nexNoteData => {
  return {
    noteId,
    context: form.context || { type: "note", url: "" },
  };
};

/**
 * Tab configuration
 */
export const tabs = [
  { id: "subjects" as const, label: "Subjects", iconName: "FiBookOpen" },
  { id: "topics" as const, label: "Topics", iconName: "FiLayers" },
  { id: "notes" as const, label: "Notes", iconName: "FiFileText" },
];

export type TabId = "subjects" | "topics" | "notes";
