import { pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    hashedPassword: text("hashed_password").notNull(),
    name: text("name"),
});
