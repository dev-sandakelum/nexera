"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import type { NexeraUser } from "../types";

export async function GetUserById(userId: string) {
  try {
    console.log("Fetching user with ID:", userId);
    await connectDB();
    const user = await User.findById(userId).lean<NexeraUser>();

    if (user) {
      console.log("User data found");
      return {
        ...user,
        id: (user as any)._id?.toString() || user.id,
        _id: undefined
      };
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function GetUserByEmail(email: string) {
  try {
    await connectDB();
    const users = await User.find({ email }).lean<NexeraUser[]>();
    
    return users.map(user => ({
      ...user,
      id: (user as any)._id?.toString() || user.id,
      _id: undefined
    }));
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function LogAllUsers() {
  try {
    await connectDB();
    const users = await User.find().lean<NexeraUser[]>();

    if (!users || users.length === 0) {
      console.log("No users found!");
      return;
    }

    const mappedUsers = users.map((user) => ({ 
      ...user,
      id: (user as any)._id?.toString() || user.id,
      _id: undefined
    }));
    console.log("All Users:", mappedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
