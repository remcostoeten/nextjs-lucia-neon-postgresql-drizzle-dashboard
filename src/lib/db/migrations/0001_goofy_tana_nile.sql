CREATE TABLE IF NOT EXISTS "onboarding_info" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"date_of_birth" date,
	"occupation" text,
	"gender" text,
	"bio" text,
	"github" text,
	"facebook" text,
	"linkedin" text,
	"twitter" text,
	"onboarding_completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "onboarding_info" ADD CONSTRAINT "onboarding_info_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
