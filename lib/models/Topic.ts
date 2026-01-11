import mongoose, { Schema, Model } from "mongoose";
import type { nexTopic } from "@/components/types";

// Define the schema matching the nexTopic type
const TopicSchema = new Schema<nexTopic>(
  {
    id: { type: String, required: true, unique: true, index: true },
    subjectID: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    createdBy: { type: String, required: true, index: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  {
    timestamps: false, // We manage timestamps manually
    collection: "topics",
  }
);

// Indexes for performance
TopicSchema.index({ slug: 1 }); // Unique index for slug lookups
TopicSchema.index({ subjectID: 1 }); // Filter by subject
TopicSchema.index({ createdBy: 1 }); // Filter by creator

// Export the model
let Topic: Model<nexTopic>;

try {
  Topic = mongoose.model<nexTopic>("Topic");
} catch {
  Topic = mongoose.model<nexTopic>("Topic", TopicSchema);
}

export default Topic;
