"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFolder, updateFolder } from "@/lib/actions/folders";
import type { Folder } from "@/lib/db/schema/folders";
import { useState } from "react";
import { toast } from "sonner";

type FolderFormProps = {
  folder?: Folder;
  onSuccess?: () => void;
};

export default function FolderForm({ folder, onSuccess }: FolderFormProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = folder
      ? await updateFolder(folder.id, formData)
      : await createFolder(formData);

    if (result.error) {
      setError(result.error);
      toast.error(result.error);
    } else {
      setError(null);
      toast.success("Folder saved successfully!");
      if (onSuccess) onSuccess();
    }
  };

  return (
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
        defaultValue={folder?.description || ''}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">{folder ? "Update" : "Create"} Folder</Button>
    </form>
  );
}
