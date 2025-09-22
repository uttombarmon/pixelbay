import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  pgEnum,
  varchar,
  jsonb,
  uuid,
  numeric,
} from "drizzle-orm/pg-core";
// import postgres from "postgres"
// import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccountType } from "@auth/core/adapters";
import { sql } from "drizzle-orm";

// const connectionString = "postgres://postgres:postgres@localhost:5432/drizzle"
// const pool = postgres(connectionString, { max: 1 })

// export const db = drizzle(pool)
export const roleEnum = pgEnum("role", ["user", "admin", "seller"]);
// export const providerEnum = pgEnum("provider", [
//   "google",
//   "facebook",
//   "credientials",
// ]);
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  image: text("image"),
  role: roleEnum("role").default("user").notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);
// ----------------------
// Enums
// ----------------------
export const productStatus = pgEnum("product_status", [
  "draft",
  "active",
  "archived",
]);
export const variantStatus = pgEnum("variant_status", ["active", "disabled"]);
export const visibilityStatus = pgEnum("visibility_status", [
  "visible",
  "hidden",
]);

// ----------------------
// Categories
// ----------------------
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  parent_id: integer("parent_id"), // optional self-ref; handle in app/query layer
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull(),
  description: text("description"),
  depth: integer("depth").default(0).notNull(),
  path: text("path"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// ----------------------
// Products
// ----------------------
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  slug: varchar("slug", { length: 300 }).notNull(),
  short_description: varchar("short_description", { length: 512 }),
  description: text("description"),
  status: productStatus("status").notNull().default("draft"),
  visibility: visibilityStatus("visibility").notNull().default("visible"),
  brand: varchar("brand", { length: 160 }),
  category_id: integer("category_id"),
  attributes: jsonb("attributes").default(sql`'{}'::jsonb`),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  created_by: uuid("created_by"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// ----------------------
// Product images
// ----------------------
export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  product_id: integer("product_id").notNull(),
  url: text("url").notNull(),
  alt: varchar("alt", { length: 300 }),
  position: integer("position").default(0).notNull(),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
});

// ----------------------
// Product variants
// ----------------------
export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  product_id: integer("product_id").notNull(),
  sku: varchar("sku", { length: 100 }).notNull(),
  title: varchar("title", { length: 300 }),
  attributes: jsonb("attributes").default(sql`'{}'::jsonb`),
  price: numeric("price", { precision: 12, scale: 2 })
    .notNull()
    .default("0.00"),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  compare_at_price: numeric("compare_at_price", { precision: 12, scale: 2 }),
  cost_price: numeric("cost_price", { precision: 12, scale: 2 }),
  weight_grams: integer("weight_grams"),
  dimensions: jsonb("dimensions").default(sql`'{}'::jsonb`),
  is_active: boolean("is_active").notNull().default(true),
  status: variantStatus("status").notNull().default("active"),
  visibility: visibilityStatus("visibility").notNull().default("visible"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// ----------------------
// Inventory (per variant)
// ----------------------
export const inventory = pgTable("inventory", {
  variant_id: integer("variant_id").primaryKey(),
  quantity: integer("quantity").notNull().default(0),
  safety_stock: integer("safety_stock").notNull().default(0),
  location: varchar("location", { length: 120 }),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// ----------------------
// Tags & tag mapping
// ----------------------
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const productTags = pgTable("product_tags", {
  product_id: integer("product_id").notNull(),
  tag_id: integer("tag_id").notNull(),
});

// ----------------------
// Collections & mapping
// ----------------------
export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull(),
  description: text("description"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  visibility: visibilityStatus("visibility").notNull().default("visible"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const collectionProducts = pgTable("collection_products", {
  collection_id: integer("collection_id").notNull(),
  product_id: integer("product_id").notNull(),
  position: integer("position").default(0).notNull(),
});

// ----------------------
// Reviews
// ----------------------
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  user_id: uuid("user_id").notNull(),
  product_id: integer("product_id").notNull(),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 200 }),
  body: text("body"),
  is_public: boolean("is_public").notNull().default(true),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// ----------------------
// Search & denormalized fields (optional)
// ----------------------
export const productSearch = pgTable("product_search", {
  product_id: integer("product_id").primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  description_text: text("description_text"),
  tags: jsonb("tags").default(sql`'[]'::jsonb`),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
