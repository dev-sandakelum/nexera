import NoteCard from "./NoteCard";

export default function NoteTypeSection({
  title,
  notes,
  users,
  getStatusBadge,
}: {
  title: string;
  notes: any[];
  users : { id: string; name: string }[];
  getStatusBadge: (status: string) => { bg: string; fg: string; text: string };
}) {
  return (
    <div className="note-type-section">
      <h4 className="note-type-title">
        {title} ({notes.length})
      </h4>
      <div className="note-list">
        {notes.map((note: any) => (
          <NoteCard key={note.id} note={note} getStatusBadge={getStatusBadge} users={users} />
        ))}
      </div>
    </div>
  );
}
