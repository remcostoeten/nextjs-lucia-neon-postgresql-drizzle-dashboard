"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "ui";

export default function FolderItem({ folder }: { folder: any }) {
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
          <CardTitle className="text-xl font-semibold">{folder.name}</CardTitle>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleExpand}>
              <MoreHorizontal size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isExpanded ? (
            <div dangerouslySetInnerHTML={{ __html: folder.description }} />
          ) : (
            <p className="text-muted-foreground">
              {folder.description.replace(/<[^>]*>/g, "").substring(0, 100)}...
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
