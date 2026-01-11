import mongoose, { Schema, Model } from "mongoose";
import type { nexNoteAbout } from "@/components/types";

// Define the schema matching the nexNoteAbout type
const NoteSchema = new Schema<nexNoteAbout>(
  {
    id: { type: String, required: true, unique: true, index: true },
    topicID: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["note", "pdf", "quiz"], 
      required: true 
    },
    slug: { type: String, required: true, unique: true, index: true },
    createdAt: { type: String, required: true },
    published: { type: Boolean, required: true, index: true },
    publishedBy: { type: String, required: true, index: true },
    updatedAt: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected"], 
      required: true,
      index: true 
    },
    approvedBy: { type: String },
  },
  {
    timestamps: false, // We manage timestamps manually
    collection: "notes",
  }
);

// Indexes for performance
NoteSchema.index({ slug: 1 }); // Unique index for slug lookups
NoteSchema.index({ topicID: 1 }); // Filter by topic
NoteSchema.index({ publishedBy: 1 }); // Filter by publisher
NoteSchema.index({ status: 1 }); // Filter by status
NoteSchema.index({ published: 1 }); // Filter by published status
NoteSchema.index({ topicID: 1, published: 1, status: 1 }); // Compound index for common queries

// Export the model
let Note: Model<nexNoteAbout>;

try {
  Note = mongoose.model<nexNoteAbout>("Note");
} catch {
  Note = mongoose.model<nexNoteAbout>("Note", NoteSchema);
}

export default Note;
