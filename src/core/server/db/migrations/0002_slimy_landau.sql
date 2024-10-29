CREATE TABLE IF NOT EXISTS "boards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" text,
	"style" jsonb DEFAULT '[]'::jsonb,
	"url" text NOT NULL,
	"type" text NOT NULL,
	"board_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "folders";--> statement-breakpoint
DROP TABLE "inspiration_boards";--> statement-breakpoint
DROP TABLE "inspiration_categories";--> statement-breakpoint
DROP TABLE "inspiration_entries";--> statement-breakpoint
DROP TABLE "key";--> statement-breakpoint
DROP TABLE "label";--> statement-breakpoint
DROP TABLE "notes";--> statement-breakpoint
DROP TABLE "session";--> statement-breakpoint
DROP TABLE "task_label";--> statement-breakpoint
DROP TABLE "task";--> statement-breakpoint
DROP TABLE "user";--> statement-breakpoint
DROP TABLE "activities";--> statement-breakpoint
DROP TABLE "activity_logs";--> statement-breakpoint
DROP TABLE "user_profile";--> statement-breakpoint
DROP TABLE "budgets";--> statement-breakpoint
DROP TABLE "goals";--> statement-breakpoint
DROP TABLE "transactions";--> statement-breakpoint
DROP TABLE "parsed_outputs";--> statement-breakpoint
DROP TABLE "processed_texts";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards" ADD CONSTRAINT "boards_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entries" ADD CONSTRAINT "entries_board_id_boards_id_fk" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
