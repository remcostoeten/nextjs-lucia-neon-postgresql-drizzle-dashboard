CREATE TABLE IF NOT EXISTS "processed_texts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL,
	"processor_type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
