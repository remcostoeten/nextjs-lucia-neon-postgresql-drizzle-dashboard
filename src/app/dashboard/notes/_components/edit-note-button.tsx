"use client";

import TipTapEditor from "@/components/tiptap-editor";
import { updateNote } from "@/lib/api/notes";
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

export default function EditNoteButton({ note }: { note: any }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(note.content);
  const router = useRouter();

  async function handleSubmit(event: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("id", note.id);
    formData.append("content", content);
    try {
      await updateNote(formData);
      setOpen(false);
      router.refresh();
      toast.success("Note updated successfully");
    } catch (error) {
      toast.error("Failed to update note");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            const target = event.target as HTMLFormElement;
            handleSubmit({ preventDefault: event.preventDefault, target });
          }}
          className="space-y-4"
        >
          <Input name="title" defaultValue={note.title} required />
          <TipTapEditor content={content} onChange={setContent} />
          <Button type="submit">Update Note</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
