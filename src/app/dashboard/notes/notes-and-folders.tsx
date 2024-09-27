"use client";

import { getFolders } from "@/lib/actions/folders";
import { getNotes } from "@/lib/api/notes";
import { useEffect, useState } from "react";
import FolderItem from "./_components/folder-item";
import NoteItem from "./_components/note-item";

export default function NotesAndFolders() {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const foldersData = await getFolders();
      const notesData = await getNotes();
      setFolders(foldersData?.folders || []);
      setNotes(notesData || []);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      {folders.map((folder) => (
        <div key={folder.id} className="mb-6">
          <FolderItem folder={folder} />
          <div className="ml-6 mt-2 space-y-2">
            {notes
              .filter((note) => note.folderId === folder.id)
              .map((note) => (
                <NoteItem key={note.id} note={note} />
              ))}
          </div>
        </div>
      ))}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Uncategorized Notes</h3>
        <div className="space-y-2">
          {notes
            .filter((note) => !note.folderId)
            .map((note) => (
              <NoteItem key={note.id} note={note} />
            ))}
        </div>
      </div>
    </div>
  );
}
