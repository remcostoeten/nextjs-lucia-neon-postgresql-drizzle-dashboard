"use client";

import { Button } from "@/components/ui/button";
import { deleteFolder, getFolders } from "@/lib/actions/folders";
import type { Folder } from "@/lib/db/schema/folders";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FolderForm from "./folder-form";

export default function FolderTree() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFolders = async () => {
    const { folders, error } = await getFolders();
    if (error) {
      toast.error(error);
    } else {
      setFolders(folders || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleDelete = async (folderId: string) => {
    const result = await deleteFolder(folderId);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Folder deleted successfully!");
      setFolders(folders.filter((folder) => folder.id !== folderId));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Folders</h2>
      <ul className="space-y-2">
        {folders.map((folder) => (
          <FolderItem key={folder.id} folder={folder} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

function FolderItem({ folder, onDelete }: { folder: Folder; onDelete: (id: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="flex items-center space-x-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={folder.color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 6C2 4.89543 2.89543 4 4 4H9L11 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{folder.name}</span>
      <Button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit"}
      </Button>
      <Button onClick={() => onDelete(folder.id)} variant="destructive">
        Delete
      </Button>
      {isEditing && (
        <FolderForm
          folder={folder}
          onSuccess={() => {
            setIsEditing(false);
            getFolders();
          }}
        />
      )}
    </li>
  );
}
