import { folders } from "@/lib/db/schema/folders";
import { date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

// User table
export const users = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  name: text("name"),
});

// Session table
export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

// User profile info table
export const userProfiles = pgTable("user_profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  firstName: text("first_name"),
  lastName: text("last_name"),
  dateOfBirth: date("date_of_birth"),
  occupation: text("occupation"),
  gender: text("gender"),
  bio: text("bio"),
  github: text("github"),
  facebook: text("facebook"),
  linkedin: text("linkedin"),
  twitter: text("twitter"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schemas
export const authenticationSchema = z.object({
  email: z.string().email().min(5).max(31),
  password: z
    .string()
    .min(4, { message: "must be at least 4 characters long" })
    .max(15, { message: "cannot be more than 15 characters long" }),
});

export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().min(4).optional(),
});

export const userProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  dateOfBirth: z.date().optional(),
  occupation: z.string().optional(),
  gender: z.string().optional(),
  bio: z.string().optional(),
  github: z.string().url().optional(),
  facebook: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
});

// Types
export type UsernameAndPassword = z.infer<typeof authenticationSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;

// Relationships (if you're using Drizzle ORM's relations)
export const relations = {
  users: {
    userProfile: {
      relationshipType: "one-to-one",
      schema: userProfiles,
      fields: [users.id, userProfiles.userId],
    },
    folders: {
      relationshipType: "one-to-many",
      schema: folders,
      fields: [users.id, folders.userId],
    },
  },
  userProfiles: {
    user: {
      relationshipType: "one-to-one",
      schema: users,
      fields: [userProfiles.userId, users.id],
    },
  },
  folders: {
    user: {
      relationshipType: "one-to-one",
      schema: users,
      fields: [folders.userId, users.id],
    },
  },
};
