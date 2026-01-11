import { NexeraUser } from "@/components/types";

interface UpdateUserResponse {
  success: boolean;
  user?: NexeraUser;
  error?: string;
}

export async function UpdateUser(
  userId: string,
  updates: Partial<NexeraUser>
): Promise<UpdateUserResponse> {
  try {
    const response = await fetch(`/api/user-update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        ...updates,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const data = await response.json();
    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}