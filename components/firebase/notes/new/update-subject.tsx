import { NexeraUser } from "@/components/types";

interface UpdateSubjectResponse {
  success: boolean;
  subject?: NexeraUser;
  error?: string;
}

export async function CreateSubject(
  subjectId: string,
  updates: Partial<NexeraUser>
): Promise<UpdateSubjectResponse> {
  try {
    const response = await fetch(`/api/subject-update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: subjectId,
        ...updates,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create subject" + response.statusText);
    }

    const data = await response.json();
    return {
      success: true,
      subject: data.subject,
    };
  } catch (error) {
    console.error("Error creating subject:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}