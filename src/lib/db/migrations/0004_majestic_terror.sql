ALTER TABLE "notes" ALTER COLUMN "folder_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folders" ADD CONSTRAINT "folders_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN IF EXISTS "color";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN IF EXISTS "is_pinned";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN IF EXISTS "tags";