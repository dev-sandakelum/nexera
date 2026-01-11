"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import type { NexeraUser } from "@/components/types";

export async function fetchUsers(): Promise<NexeraUser[]> {
  try {
    await connectDB();
    const users = await User.find()
      .sort({ joinedAt: -1 })
      .lean<NexeraUser[]>();

    return users.map((user) => ({
      ...user,
      id: user._id?.toString() || user.id,
      _id: undefined,
    })) as NexeraUser[];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function fetchUserById(id: string): Promise<NexeraUser | null> {
  try {
    await connectDB();
    const user = await User.findById(id).lean<NexeraUser>();

    if (!user) return null;

    return {
      ...user,
      id: user._id?.toString() || user.id,
      _id: undefined,
    } as NexeraUser;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function updateUserRole(
  id: string,
  role: "admin" | "moderator" | "user"
): Promise<boolean> {
  try {
    await connectDB();
    const result = await User.findByIdAndUpdate(id, { role }, { new: true });
    return !!result;
  } catch (error) {
    console.error("Error updating user role:", error);
    return false;
  }
}

export async function toggleUserStatus(
  id: string,
  status: "active" | "disabled"
): Promise<boolean> {
  try {
    await connectDB();
    const result = await User.findByIdAndUpdate(id, { status }, { new: true });
    return !!result;
  } catch (error) {
    console.error("Error toggling user status:", error);
    return false;
  }
}

export async function updateUserBadge(
  id: string,
  badgeId: string
): Promise<boolean> {
  try {
    await connectDB();

    // Update the first badge (role badge) in the badges array
    const result = await User.findByIdAndUpdate(
      id,
      { "badges.0.id": badgeId },
      { new: true }
    );

    return !!result;
  } catch (error) {
    console.error("Error updating user badge:", error);
    return false;
  }
}

export async function updateLastLogin(id: string): Promise<boolean> {
  try {
    await connectDB();

    const result = await User.findByIdAndUpdate(
      id,
      { lastLogin: new Date().toISOString() },
      { new: true }
    );

    return !!result;
  } catch (error) {
    console.error("Error updating last login:", error);
    return false;
  }
}