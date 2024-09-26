import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";
import { users } from "./auth";

export const folders = pgTable("folders", {
    id: text("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    color: varchar("color", { length: 7 }).notNull(),
    description: text("description"),
    userId: text("user_id").notNull().references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const folderSchema = z.object({
    name: z.string().min(1).max(255),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    description: z.string().optional(),
});

export type Folder = typeof folders.$inferSelect;
export type NewFolder = typeof folders.$inferInsert;
