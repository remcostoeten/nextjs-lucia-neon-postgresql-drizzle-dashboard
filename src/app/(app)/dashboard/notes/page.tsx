'use client';

import FolderForm from "./_components/folder-form";
import FolderTree from "./_components/folder-tree";

export default function NotesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notes Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Create New Folder</h2>
          <FolderForm onSuccess={() => window.location.reload()} />
        </div>
        <div>
          <FolderTree />
        </div>
      </div>
    </div>
  );
}
