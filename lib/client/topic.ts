import { nexTopic } from "@/components/types";

interface UpdateTopicResponse {
  success: boolean;
  topic?: nexTopic;
  error?: string;
}

export async function CreateTopic(
  topicId: string,
  updates: Partial<nexTopic>
): Promise<UpdateTopicResponse> {
  try {
    const response = await fetch(`/api/topic-update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: topicId,
        ...updates,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create topic" + response.statusText);
    }

    const data = await response.json();
    return {
      success: true,
      topic: data.topic,
    };
  } catch (error) {
    console.error("Error creating topic:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export const UpdateTopic = CreateTopic;

export async function DeleteTopic(
  topicId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/topic-update?id=${topicId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete topic " + response.statusText);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting topic:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}