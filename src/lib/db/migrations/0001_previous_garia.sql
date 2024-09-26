ALTER TABLE "notes" DROP CONSTRAINT "notes_folder_id_folders_id_fk";
--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "content" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "folder_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notes" ADD CONSTRAINT "notes_folder_id_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN IF EXISTS "color";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN IF EXISTS "parent_id";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN IF EXISTS "labels";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN IF EXISTS "is_favorite";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN IF EXISTS "is_pinned";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN IF EXISTS "pin_code";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN IF EXISTS "is_shared";