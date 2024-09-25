import { boolean, date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
import { users } from "./auth";

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

export type OnboardingInfo = z.infer<typeof onboardingInfoSchema>;
