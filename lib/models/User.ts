import mongoose, { Schema, Model } from "mongoose";
import type { NexeraUser } from "@/components/types";

// Define the schema matching the NexeraUser type
const UserSchema = new Schema<NexeraUser>(
  {
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, default: "" },
    profilePicture: { type: String, required: true },
    headline: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    joinedAt: { type: String, required: true, index: true },
    lastLogin: { type: String },
    role: { 
      type: String, 
      enum: ["user", "moderator", "admin"], 
      default: "user" 
    },
    twoFactorEnabled: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ["active", "disabled"], 
      required: true,
      index: true 
    },
    academic: {
      institution: { type: String, default: "" },
      degree: { type: String, default: "" },
      fieldOfStudy: { type: String, default: "" },
      studyingYear: { type: Number, default: 0 },
      graduationYear: { type: Number, default: 0 },
    },
    badges: [
      {
        _id: false,
        id: { type: String, required: true },
      },
    ],
    data: {
      notes: {
         favorites: [{ _id: false, id: { type: String, required: true } }],
         uploads: [{ _id: false, id: { type: String, required: true } }],
      },
      projects: {
        favorites: [{ _id: false, id: { type: String, required: true } }],
        contributions: [{ _id: false, id: { type: String, required: true } }],
      },
      applications: {
        favorites: [{ _id: false, id: { type: String, required: true } }],
        uploads: [{ _id: false, id: { type: String, required: true } }],
      },
    },
  },
  {
    timestamps: false, // We manage timestamps manually with joinedAt/lastLogin
    collection: "users",
  }
);

// Indexes for performance
UserSchema.index({ email: 1 }); // Unique index for email lookups
UserSchema.index({ status: 1 }); // Filter by status
UserSchema.index({ joinedAt: -1 }); // Sort by join date

// Export the model
let User: Model<NexeraUser>;

// Prevent Mongoose OverwriteModelError by deleting the model if it exists in dev
if (process.env.NODE_ENV === "development" && mongoose.models.User) {
  delete mongoose.models.User;
}

User = mongoose.models.User || mongoose.model<NexeraUser>("User", UserSchema);

export default User;
