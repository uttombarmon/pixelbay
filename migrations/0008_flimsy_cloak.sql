CREATE TYPE "public"."payment_method" AS ENUM('card', 'paypal', 'bank_transfer', 'cod');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'completed', 'failed', 'refunded');--> statement-breakpoint
CREATE TABLE "payment_methods" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255),
	"method_type" "payment_method" NOT NULL,
	"provider" varchar(255) NOT NULL,
	"account_number" varchar(255) NOT NULL,
	"expiry_date" varchar(10),
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payment_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"payment_id" integer NOT NULL,
	"status" "payment_status" NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"user_id" varchar(255),
	"payment_method_id" integer,
	"amount" integer NOT NULL,
	"currency" varchar(10) DEFAULT 'USD' NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"transaction_id" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_payment_method_id_payment_methods_id_fk" FOREIGN KEY ("payment_method_id") REFERENCES "public"."payment_methods"("id") ON DELETE set null ON UPDATE no action;