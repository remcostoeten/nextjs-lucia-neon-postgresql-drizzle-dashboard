ALTER TABLE "folders" ADD COLUMN "path" text NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "folders" ("parent_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "path_idx" ON "folders" ("path");