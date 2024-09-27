"use client";

import { deleteNote } from "@/lib/api/notes";
import { motion } from "framer-motion";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "ui";

export default function NoteItem({ note }: { note: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">{note.title}</CardTitle>
          <div className="flex space-x-2">
            <Link href={`/dashboard/notes/${note.id}/edit`}>
              <Button variant="ghost" size="icon">
                <Edit size={20} />
              </Button>
            </Link>
            <form action={deleteNote}>
              <input type="hidden" name="id" value={note.id} />
              <Button variant="ghost" size="icon" type="submit">
                <Trash size={20} />
              </Button>
            </form>
            <Button variant="ghost" size="icon" onClick={toggleExpand}>
              <MoreHorizontal size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isExpanded ? (
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
          ) : (
            <p className="text-muted-foreground">
              {note.content.replace(/<[^>]*>/g, "").substring(0, 100)}...
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
