import { boolean, date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
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

// Onboarding info table
export const onboardingInfo = pgTable("onboarding_info", {
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
  onboardingCompleted: boolean("onboarding_completed").default(false),
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

export const onboardingInfoSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  dateOfBirth: z.date().optional(),
  occupation: z.string().optional(),
  gender: z.string().optional(),
  bio: z.string().optional(),
  github: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  onboardingCompleted: z.boolean().optional(),
});

// Types
export type UsernameAndPassword = z.infer<typeof authenticationSchema>;
export type OnboardingInfo = z.infer<typeof onboardingInfoSchema>;

// Relationships (if you're using Drizzle ORM's relations)
export const relations = {
  users: {
    onboardingInfo: {
      relationshipType: "one-to-one",
      schema: onboardingInfo,
      fields: [users.id, onboardingInfo.userId],
    },
  },
  onboardingInfo: {
    user: {
      relationshipType: "one-to-one",
      schema: users,
      fields: [onboardingInfo.userId, users.id],
    },
  },
};
