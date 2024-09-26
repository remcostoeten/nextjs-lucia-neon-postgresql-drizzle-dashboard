import { sql } from "drizzle-orm"
import { boolean, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { folders } from "./folders"

export const notes = pgTable("notes", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    folderId: uuid("folder_id").references(() => folders.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
    updatedAt: timestamp("updated_at").default(sql`now()`),
    labels: jsonb("labels").default([]),
    isFavorite: boolean("is_favorite").default(false),
    isPinned: boolean("is_pinned").default(false),
    pinCode: text("pin_code"),
    isShared: boolean("is_shared").default(false),
})

export type Note = typeof notes.$inferSelect
export type NewNote = typeof notes.$inferInsert
