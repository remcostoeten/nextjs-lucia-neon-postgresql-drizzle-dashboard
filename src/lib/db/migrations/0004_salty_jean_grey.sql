ALTER TABLE "folders" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "parent_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "folder_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "user_id" SET DATA TYPE varchar;