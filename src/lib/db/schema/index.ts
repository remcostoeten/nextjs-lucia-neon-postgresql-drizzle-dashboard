export * from "./auth";

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

export const folders = pgTable("folders", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  color: text("color").default("#000000").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  folderId: uuid("folder_id")
    .references(() => folders.id)
    .notNull(),
  isPinned: boolean("is_pinned").default(false).notNull(),
  tags: jsonb("tags").default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertFolderSchema = createInsertSchema(folders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectFolderSchema = createSelectSchema(folders);

export const insertNoteSchema = createInsertSchema(notes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectNoteSchema = createSelectSchema(notes);

export type Folder = z.infer<typeof selectFolderSchema>;
export type Note = z.infer<typeof selectNoteSchema>;
