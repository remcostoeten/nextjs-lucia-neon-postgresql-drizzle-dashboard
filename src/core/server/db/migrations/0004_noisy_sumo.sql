DROP TABLE "inspiration_boards";--> statement-breakpoint
DROP TABLE "inspiration_categories";--> statement-breakpoint
DROP TABLE "inspiration_entries";--> statement-breakpoint
DROP TABLE "boards";--> statement-breakpoint
DROP TABLE "entries";--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "folder_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "user_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "parent_id" varchar;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "path" text NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "folders" ("parent_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "path_idx" ON "folders" ("path");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folders" ADD CONSTRAINT "folders_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folders" ADD CONSTRAINT "folders_parent_id_folders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "folders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN IF EXISTS "updated_at";