import mongoose, { Schema, Model } from "mongoose";
import type { nexBadge } from "@/components/types";

// Define the schema matching the nexBadge type
const BadgeSchema = new Schema<nexBadge>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    lore: { type: String, required: true },
    icon: { type: String, required: true },
    color: {
      bgColor: { type: String, required: true },
      textColor: { type: String, required: true },
      borderColor: { type: String, required: true },
    },
  },
  {
    timestamps: false,
    collection: "badges",
  }
);

// Index on badge id (MongoDB's _id is already indexed)
BadgeSchema.index({ _id: 1 });

// Export the model
let Badge: Model<nexBadge>;

try {
  Badge = mongoose.model<nexBadge>("Badge");
} catch {
  Badge = mongoose.model<nexBadge>("Badge", BadgeSchema);
}

export default Badge;
