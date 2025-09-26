CREATE TABLE "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"address1" varchar(100),
	"city" varchar(120) NOT NULL,
	"country" varchar(120) NOT NULL,
	"postcode" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"address1" varchar(200) NOT NULL,
	"address2" varchar(200),
	"city" varchar(120) NOT NULL,
	"country" varchar(120) NOT NULL,
	"postcode" varchar(20) NOT NULL,
	"phone" varchar(20),
	"is_default" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "product_search" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "product_tags" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "tags" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "product_search" CASCADE;--> statement-breakpoint
DROP TABLE "product_tags" CASCADE;--> statement-breakpoint
DROP TABLE "tags" CASCADE;--> statement-breakpoint
ALTER TABLE "collection_products" RENAME TO "customers";--> statement-breakpoint
ALTER TABLE "collections" RENAME TO "order_items";--> statement-breakpoint
ALTER TABLE "inventory" RENAME TO "orders";--> statement-breakpoint
ALTER TABLE "customers" RENAME COLUMN "collection_id" TO "id";--> statement-breakpoint
ALTER TABLE "customers" RENAME COLUMN "product_id" TO "userId";--> statement-breakpoint
ALTER TABLE "customers" RENAME COLUMN "position" TO "metadata";--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "created_by" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "created_by" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "order_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "product_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "variant_id" integer;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "quantity" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "unit_price" numeric(12, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "total_price" numeric(12, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "customer_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "status" varchar(50) DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "total_amount" numeric(12, 2) DEFAULT '0.00' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "currency" varchar(3) DEFAULT 'USD' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "metadata" jsonb DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variants" ADD COLUMN "stock" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "customer_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_variant_id_product_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN "parent_id";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN "depth";--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN "slug";--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN "metadata";--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN "visibility";--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "variant_id";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "quantity";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "safety_stock";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "location";--> statement-breakpoint
ALTER TABLE "product_variants" DROP COLUMN "weight_grams";--> statement-breakpoint
ALTER TABLE "product_variants" DROP COLUMN "dimensions";--> statement-breakpoint
ALTER TABLE "product_variants" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "password";