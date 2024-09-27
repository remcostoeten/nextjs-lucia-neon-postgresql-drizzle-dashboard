import { getNotes } from "@/lib/api/notes";
import NoteItem from "./note-item";

export async function NotesList() {
  const notes = await getNotes();

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}
