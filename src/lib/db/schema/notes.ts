import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { folders } from "./folders";

export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title"),
  content: text("content"),
  folderId: uuid("folder_id")
    .references(() => folders.id),
  isPinned: boolean("is_pinned"),
  tags: jsonb("tags"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;

export const insertNoteSchema = createInsertSchema(notes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectNoteSchema = createSelectSchema(notes);
