import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { folders } from "./folders";

export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  folderId: uuid("folder_id")
    .references(() => folders.id)
    .notNull(),
  userId: uuid("user_id").notNull(),
  isPinned: boolean("is_pinned").default(false).notNull(),
  tags: jsonb("tags").default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertNoteSchema = createInsertSchema(notes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectNoteSchema = createSelectSchema(notes);

export type Note = z.infer<typeof selectNoteSchema>;
