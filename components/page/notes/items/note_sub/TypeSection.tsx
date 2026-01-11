import { nexNoteAbout, nexNoteData } from "@/components/types";
import NoteCard from "./NoteCard";

export default function NoteTypeSection({
  title,
  notes,
  notesData,
  users,
  getStatusBadge,
}: {
  title: string;
  notes: nexNoteAbout[];
  notesData: nexNoteData[];
  users: { id: string; name: string }[];
  getStatusBadge: (status: string) => { bg: string; fg: string; text: string };
}) {
  return (
    <div className="note-type-section">
      <h4 className="note-type-title">
        {title} ({notes.length})
      </h4>
      <div className="note-list">
        {notes.map((note: any) => (
          <NoteCard
            key={note.id}
            note={note}
            noteData={
              note.type == "pdf"
                ? notesData.find((nd) => nd.noteId === note.id)
                : ({} as nexNoteData)
            }
            getStatusBadge={getStatusBadge}
            users={users}
          />
        ))}
      </div>
    </div>
  );
}
