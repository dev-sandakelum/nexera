import { nexNoteAbout, nexNoteData } from "@/components/types";

interface UpdateNoteResponse {
  success: boolean;
  note?: nexNoteAbout;
  error?: string;
}

export async function CreateNote(
  noteId: string,
  updatesAbout: Partial<nexNoteAbout>,
  updatesData: Partial<nexNoteData>
): Promise<UpdateNoteResponse> {
  try {
    const response = await fetch(`/api/note-update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: noteId,
        updatesAbout,
        updatesData,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create note" + response.statusText);
    }

    const data = await response.json();
    return {
      success: true,
      note: data.note,
    };
  } catch (error) {
    console.error("Error creating note:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export const UpdateNote = CreateNote;

export async function DeleteNote(
  noteId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/note-update?id=${noteId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete note " + response.statusText);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting note:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}