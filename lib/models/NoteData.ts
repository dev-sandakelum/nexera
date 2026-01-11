import mongoose, { Schema, Model } from "mongoose";
import type { nexNoteData, pdfNote, baseNote, quizNote } from "@/components/types";

// Define the schema matching the nexNoteData type
const NoteDataSchema = new Schema<nexNoteData>(
  {
    noteId: { type: String, required: true, unique: true, index: true },
    context: {
      type: {
        type: String,
        enum: ["note", "pdf", "quiz"],
        required: true,
      },
      // For base note
      url: { type: String },
      // For PDF note
      sizeInMB: { type: Number },
      pageCount: { type: Number },
      // For quiz note
      quizUrl: { type: String },
    },
  },
  {
    timestamps: false,
    collection: "notedata",
  }
);

// Index on noteId for fast lookups
NoteDataSchema.index({ noteId: 1 }); // Unique index

// Export the model
let NoteData: Model<nexNoteData>;

try {
  NoteData = mongoose.model<nexNoteData>("NoteData");
} catch {
  NoteData = mongoose.model<nexNoteData>("NoteData", NoteDataSchema);
}

export default NoteData;
