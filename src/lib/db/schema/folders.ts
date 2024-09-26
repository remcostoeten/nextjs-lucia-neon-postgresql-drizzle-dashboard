import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const folders = pgTable("folders", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    color: text("color").notNull(),
    description: text("description"),
    parentId: uuid("parent_id").references(() => folders.id),
    userId: uuid("user_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertFolderSchema = createInsertSchema(folders).omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
});

export const selectFolderSchema = createSelectSchema(folders);

export const folderSchema = z.object({
    name: z.string().min(1).max(255),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    description: z.string().max(1000).optional(),
    parentId: z.string().uuid().nullable().optional(),
});

export type Folder = z.infer<typeof selectFolderSchema>;
export type NewFolder = z.infer<typeof insertFolderSchema>;
