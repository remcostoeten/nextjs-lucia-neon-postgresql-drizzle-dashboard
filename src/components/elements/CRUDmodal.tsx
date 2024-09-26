"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFolder, getFolders, updateFolder } from "@/lib/actions/folders";
import type { Folder } from "@/lib/db/schema/folders";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type CRUDModalProps = {
  folder?: Folder;
  onSuccess?: () => void;
  onClose: () => void;
};

export default function CRUDModal({
  folder,
  onSuccess,
  onClose,
}: CRUDModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const { folders, error } = await getFolders();
      if (error) {
        toast.error(error);
      } else {
        setFolders(folders as Folder[]);
      }
    };
    fetchFolders();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = folder
      ? await updateFolder(folder.id, formData)
      : await createFolder(formData);
    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
    } else {
      setError(null);
      toast.success("Folder saved successfully!");
      if (onSuccess) onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {folder ? "Edit Folder" : "Create Folder"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Folder name"
            defaultValue={folder?.name}
            required
          />
          <Input
            name="color"
            type="color"
            defaultValue={folder?.color || "#000000"}
            required
          />
          <Textarea
            name="description"
            placeholder="Description (optional)"
            defaultValue={folder?.description || ""}
          />
          <select name="parentId" defaultValue={folder?.parentId || ""}>
            <option value="">No Parent</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{folder ? "Update" : "Create"} Folder</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
