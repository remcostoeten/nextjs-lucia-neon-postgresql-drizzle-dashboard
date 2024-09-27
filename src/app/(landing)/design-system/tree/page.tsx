import FolderStructure from "@/app/dashboard/notes/folder-structure";

export default function NotesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-100">Notes Dashboard</h1>
      <FolderStructure />
    </div>
  );
}
