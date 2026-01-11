import mongoose, { Schema, Model } from "mongoose";
import type { nexSubject } from "@/components/types";

// Define the schema matching the nexSubject type
const SubjectSchema = new Schema<nexSubject>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    departmentID: { type: String, required: true, index: true },
    academicYear: { type: Number, required: true, index: true },
    semester: { type: Number },
    createdBy: { type: String, required: true, index: true },
    isOfficial: { type: Boolean, required: true, index: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  {
    timestamps: false, // We manage timestamps manually
    collection: "subjects",
  }
);

// Indexes for performance
SubjectSchema.index({ slug: 1 }); // Unique index for slug lookups
SubjectSchema.index({ createdBy: 1 }); // Filter by creator
SubjectSchema.index({ departmentID: 1, academicYear: 1, semester: 1 }); // Compound index for filtering
SubjectSchema.index({ isOfficial: 1 }); // Filter by official status

// Export the model
let Subject: Model<nexSubject>;

try {
  Subject = mongoose.model<nexSubject>("Subject");
} catch {
  Subject = mongoose.model<nexSubject>("Subject", SubjectSchema);
}

export default Subject;
