"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { NexeraUser } from "../types";

export async function GetUserNameList() {
  try {
    await connectDB();
    const users = await User.find().select("name").lean();
    
    const names = users.map((user) => ({ 
      id: (user as any)._id?.toString() || user.id, 
      name: user.name 
    }));
    
    console.log("User names list:", names);
    return names as { id: string; name: string }[];
  } catch (error) {
    console.error("Error fetching user list:", error);
    return [];
  }
}

export async function GetProfilePicList() {
  try {
    await connectDB();
    const users = await User.find().select("profilePicture").lean();
    
    const pics = users.map((user) => ({
      id: (user as any)._id?.toString() || user.id,
      profilePic: user.profilePicture,
    }));
    
    console.log("Profile pictures list:", pics);
    return pics as { id: string; profilePic: string }[];
  } catch (error) {
    console.error("Error fetching profile picture list:", error);
    return [];
  }
}
