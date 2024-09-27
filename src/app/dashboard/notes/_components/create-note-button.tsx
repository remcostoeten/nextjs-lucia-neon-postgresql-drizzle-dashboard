"use client";

import RichTextEditor from "@/components/rich-text-editor";
import { createNote } from "@/lib/api/notes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "ui";

export function CreateNoteButton() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    try {
      await createNote(formData);
      setOpen(false);
      router.refresh();
      toast.success("Note created successfully");
    } catch (error) {
      toast.error("Failed to create note");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add a new note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new note</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <Input name="title" placeholder="Note title" required />
          <RichTextEditor
            content={content}
            onChange={(newContent) => {
              setContent(newContent);
              const existingFormData = new FormData(
                document.querySelector("form") as HTMLFormElement,
              );
              existingFormData.set("content", newContent);
            }}
          />
          <Button type="submit">Create Note</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
