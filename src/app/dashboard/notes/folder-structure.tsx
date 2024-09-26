"use client";

import RichTextEditor from "@/components/rich-text-editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getNotes, createNote, deleteNote } from "@/core/server/actions/notes";
import {
  createFolder,
  deleteFolder,
  getFolders,
  updateFolderColor,
} from "@/lib/actions/folders";
import { Folder, Note } from "@/lib/db";
import { ChevronDown, ChevronUp, Pin, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const FolderItem: React.FC<{
  folder: Folder;
  onDelete: () => void;
  onUpdateColor: (color: string) => void;
}> = ({ folder, onDelete, onUpdateColor }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<"date" | "title">("date");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchNotes();
    }
  }, [isOpen, folder.id]);

  const fetchNotes = async () => {
    const result = await getNotes(folder.id);
    if ("error" in result) {
      toast.error(result.error);
    } else {
      setNotes(result.notes as unknown as Note[]);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newNoteTitle);
    formData.append("content", newNoteContent);
    formData.append("folderId", folder.id);

    const result = await createNote(formData);
    if ("error" in result) {
      toast.error(result.error);
    } else {
      toast.success("Note created successfully");
      setNewNoteTitle("");
      setNewNoteContent("");
      fetchNotes();
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    const result = await deleteNote(noteId);
    if ("error" in result) {
      toast.error(result.error);
    } else {
      toast.success("Note deleted successfully");
      fetchNotes();
    }
  };

  const handleTogglePin = async (noteId: string) => {
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      const result = await updateNotePinStatus(noteId, !note.isPinned);
      if ("error" in result) {
        toast.error(result.error);
      } else {
        toast.success("Note pin status updated");
        fetchNotes();
      }
    }
  };

  const handleAddTag = async (noteId: string) => {
    if (newTag.trim()) {
      const note = notes.find((n) => n.id === noteId);
      if (note) {
        const updatedTags = [...note.tags, newTag.trim()];
        const result = await updateNoteTags(noteId, updatedTags);
        if ("error" in result) {
          toast.error(result.error);
        } else {
          toast.success("Tag added successfully");
          setNewTag("");
          fetchNotes();
        }
      }
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (sortOption === "date") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold" style={{ color: folder.color }}>
          {folder.name}
        </h3>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Change Color
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="grid grid-cols-6 gap-2">
                {[
                  "#000000",
                  "#FF0000",
                  "#00FF00",
                  "#0000FF",
                  "#FFFF00",
                  "#FF00FF",
                  "#00FFFF",
                ].map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: color }}
                    onClick={() => onUpdateColor(color)}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            size="sm"
          >
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
          <Button onClick={onDelete} variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      </div>
      {isOpen && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <div className="relative flex-grow mr-2">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={sortOption}
              onValueChange={(value) =>
                setSortOption(value as "date" | "title")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="title">Sort by Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <h4 className="font-medium mb-2">Notes:</h4>
          {sortedNotes.map((note) => (
            <div key={note.id} className="mb-2 p-2 bg-white rounded">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">{note.title}</h5>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTogglePin(note.id)}
                >
                  <Pin
                    className={
                      note.isPinned ? "text-blue-500" : "text-gray-400"
                    }
                  />
                </Button>
              </div>
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
              <div className="mt-2">
                {note.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="mr-1">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-2 flex">
                <Input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  className="mr-2"
                />
                <Button onClick={() => handleAddTag(note.id)} size="sm">
                  Add Tag
                </Button>
              </div>
              <Button
                onClick={() => handleDeleteNote(note.id)}
                variant="destructive"
                size="sm"
                className="mt-2"
              >
                Delete Note
              </Button>
            </div>
          ))}
          <form onSubmit={handleCreateNote} className="mt-4">
            <Input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="Note title"
              className="mb-2"
            />
            <RichTextEditor
              content={newNoteContent}
              onChange={setNewNoteContent}
            />
            <Button type="submit" className="mt-2">
              Add Note
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

const FolderStructure: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [newFolderName, setNewFolderName] = useState("");

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const result = await getFolders();
    if ("error" in result) {
      toast.error(result.error);
    } else {
      setFolders(result.folders);
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newFolderName);

    const result = await createFolder(formData);
    if ("error" in result) {
      toast.error(result.error);
    } else {
      toast.success("Folder created successfully");
      setNewFolderName("");
      fetchFolders();
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    const result = await deleteFolder(folderId);
    if ("error" in result) {
      toast.error(result.error);
    } else {
      toast.success("Folder deleted successfully");
      fetchFolders();
    }
  };

  const handleUpdateFolderColor = async (folderId: string, color: string) => {
    const result = await updateFolderColor(folderId, color);
    if ("error" in result) {
      toast.error(result.error);
    } else {
      toast.success("Folder color updated successfully");
      fetchFolders();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Folder Structure</h1>
      <form onSubmit={handleCreateFolder} className="mb-4">
        <Input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New folder name"
          className="mr-2"
        />
        <Button type="submit">Create Folder</Button>
      </form>
      {folders.map((folder) => (
        <FolderItem
          key={folder.id}
          folder={folder}
          onDelete={() => handleDeleteFolder(folder.id)}
          onUpdateColor={(color) => handleUpdateFolderColor(folder.id, color)}
        />
      ))}
    </div>
  );
};

export default FolderStructure;
