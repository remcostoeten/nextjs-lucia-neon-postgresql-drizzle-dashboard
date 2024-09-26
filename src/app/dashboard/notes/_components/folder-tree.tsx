"use client";

import { Button } from "@/components/ui/button";
import { deleteFolder } from "@/lib/actions/folders";
import type { Folder } from "@/lib/db/schema/folders";
import { toast } from "sonner";

type FolderTreeProps = {
  folders: Folder[];
  onEdit: (folder: Folder) => void;
  onDelete: () => void;
};

export default function FolderTree({
  folders = [],
  onEdit,
  onDelete,
}: FolderTreeProps) {
  const handleDelete = async (folderId: string) => {
    const result = await deleteFolder(folderId);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Folder deleted successfully!");
      onDelete();
    }
  };

  const renderFolders = (parentId: string | null) => {
    return folders
      .filter((folder) => folder.parentId === parentId)
      .map((folder) => (
        <li key={folder.id} className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
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
            <span className="text-sm font-medium text-subtitle">
              {folder.name}
            </span>
            <Button onClick={() => onEdit(folder)}>Edit</Button>
            <Button
              onClick={() => handleDelete(folder.id)}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
          <ul className="pl-4">{renderFolders(folder.id)}</ul>
        </li>
      ));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Folders</h2>
      <ul className="space-y-2">{renderFolders(null)}</ul>
    </div>
  );
}
