CREATE TYPE "public"."provider" AS ENUM('google', 'facebook', 'credientials');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'seller');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "firstName" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lastName" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "provider" "provider" DEFAULT 'credientials';--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "name";