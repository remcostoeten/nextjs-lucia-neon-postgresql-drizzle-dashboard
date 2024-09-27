"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button, Input } from "ui";
import { CreateFolderButton } from "./_components/create-folder-button";
import { CreateNoteButton } from "./_components/create-note-button";
export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen ">
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 border-b">
          <h1 className="text-2xl font-bold">Notes</h1>
          <div className="flex items-center space-x-2">
            <CreateFolderButton />
            <CreateNoteButton />
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 p-4 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
