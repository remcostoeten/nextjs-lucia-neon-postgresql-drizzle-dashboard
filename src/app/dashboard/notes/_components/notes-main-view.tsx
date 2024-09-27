"use client";

import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createNote, deleteNote, getNotes, updateNote } from "@/lib/api/notes";
import { useEffect, useState } from "react";
import { useNotesStore } from "stores";
import NoteItem from "./note-item";

export default function NotesMainView() {
  const [notes, setNotes] = useState([]);
  const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const { selectedFolderId } = useNotesStore();

  useEffect(() => {
    fetchNotes();
  }, [selectedFolderId]);

  const fetchNotes = async () => {
    const fetchedNotes = await getNotes(selectedFolderId);
    setNotes(fetchedNotes || []);
  };

  const handleCreateNote = async () => {
    const formData = new FormData();
    formData.append("title", newNoteTitle);
    formData.append("content", newNoteContent);
    if (selectedFolderId) {
      formData.append("folderId", selectedFolderId);
    }
    await createNote(formData);
    setIsNewNoteDialogOpen(false);
    setNewNoteTitle("");
    setNewNoteContent("");
    fetchNotes();
  };

  const handleUpdateNote = async (noteId, title, content) => {
    const formData = new FormData();
    formData.append("id", noteId);
    formData.append("title", title);
    formData.append("content", content);
    if (selectedFolderId) {
      formData.append("folderId", selectedFolderId);
    }
    await updateNote(formData);
    fetchNotes();
  };

  const handleDeleteNote = async (noteId) => {
    const formData = new FormData();
    formData.append("id", noteId);
    await deleteNote(formData);
    fetchNotes();
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            {selectedFolderId ? "Folder Notes" : "All Notes"}
          </CardTitle>
          <Button onClick={() => setIsNewNoteDialogOpen(true)}>New Note</Button>
        </CardHeader>
        <CardContent>
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onUpdate={(title, content) =>
                  handleUpdateNote(note.id, title, content)
                }
                onDelete={() => handleDeleteNote(note.id)}
              />
            ))
          ) : (
            <p className="text-muted-foreground">No notes found.</p>
          )}
        </CardContent>
      </Card>
      <Dialog open={isNewNoteDialogOpen} onOpenChange={setIsNewNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
          </DialogHeader>
          <Input
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            placeholder="Note Title"
          />
          <RichTextEditor
            content={newNoteContent}
            onChange={setNewNoteContent}
          />
          <Button onClick={handleCreateNote}>Create Note</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
