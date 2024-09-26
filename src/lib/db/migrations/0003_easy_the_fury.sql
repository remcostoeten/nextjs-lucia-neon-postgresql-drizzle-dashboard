ALTER TABLE "folders" ADD COLUMN "color" text DEFAULT '#000000' NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "is_pinned" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "tags" jsonb DEFAULT '[]'::jsonb NOT NULL;