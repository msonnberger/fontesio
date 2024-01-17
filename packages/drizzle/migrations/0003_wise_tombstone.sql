ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "email_verification_codes" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "email_verification_codes" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "resources" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "resources" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_keys" ALTER COLUMN "user_id" SET DATA TYPE text;