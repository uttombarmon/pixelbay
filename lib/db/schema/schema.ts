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
  name: varchar("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: roleEnum("role").default("user").notNull(),
});

export const address = pgTable("address", {
  id: serial("id").primaryKey().notNull(),
  address1: varchar("name", { length: 100 }).notNull(),
  address2: varchar("address1", { length: 100 }),
  city: varchar("city", { length: 120 }).notNull(),
  country: varchar("country", { length: 120 }).notNull(),
  postcode: integer().notNull(),
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

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  customer_id: integer("customer_id")
    .notNull()
    .references(() => customers.id, { onDelete: "cascade" }),
  address1: varchar("address1", { length: 200 }).notNull(),
  address2: varchar("address2", { length: 200 }),
  city: varchar("city", { length: 120 }).notNull(),
  country: varchar("country", { length: 120 }).notNull(),
  postcode: varchar("postcode", { length: 20 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  is_default: boolean("is_default").default(false),
});

// ----------------------
// Categories
// ----------------------
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull(),
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
  category_id: integer("category_id").references(() => categories.id),
  attributes: jsonb("attributes").default(sql`'{}'::jsonb`),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  created_by: text("created_by") // seller userId
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// ----------------------
// Product images
// ----------------------
export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  product_id: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
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
  product_id: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  sku: varchar("sku", { length: 100 }).notNull(),
  title: varchar("title", { length: 300 }),
  attributes: jsonb("attributes").default(sql`'{}'::jsonb`),
  price: numeric("price", { precision: 12, scale: 2 })
    .notNull()
    .default("0.00"),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  compare_at_price: numeric("compare_at_price", { precision: 12, scale: 2 }),
  cost_price: numeric("cost_price", { precision: 12, scale: 2 }),
  stock: integer("stock").notNull().default(0),
  status: variantStatus("status").notNull().default("active"),
  visibility: visibilityStatus("visibility").notNull().default("visible"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// ----------------------
// Orders
// ----------------------
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customer_id: integer("customer_id")
    .notNull()
    .references(() => users.id),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  total_amount: numeric("total_amount", { precision: 12, scale: 2 })
    .notNull()
    .default("0.00"),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// ----------------------
// Order items (join orders & products)
// ----------------------
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  product_id: integer("product_id")
    .notNull()
    .references(() => products.id),
  variant_id: integer("variant_id").references(() => productVariants.id),
  quantity: integer("quantity").notNull().default(1),
  unit_price: numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
  total_price: numeric("total_price", { precision: 12, scale: 2 }).notNull(),
});

// ----------------------
// Reviews
// ----------------------
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  customer_id: text("customer_id")
    .notNull()
    .references(() => users.id),
  product_id: integer("product_id")
    .notNull()
    .references(() => products.id),
  rating: integer("rating").notNull(),
  body: text("body"),
  is_public: boolean("is_public").notNull().default(true),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// ----------------------
// Cart (belongs to customer)
// ----------------------
export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  customer_id: text("customer_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// ----------------------
// Cart items (join carts & products)
// ----------------------
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cart_id: integer("cart_id")
    .notNull()
    .references(() => carts.id, { onDelete: "cascade" }),
  product_id: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  variant_id: integer("variant_id").references(() => productVariants.id),
  quantity: integer("quantity").notNull().default(1),
  unit_price: numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
  total_price: numeric("total_price", { precision: 12, scale: 2 }).notNull(),
  added_at: timestamp("added_at").notNull().defaultNow(),
});

// Payment Status Enum
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "completed",
  "failed",
  "refunded",
]);

// Payment Method Enum
export const paymentMethodEnum = pgEnum("payment_method", [
  "card",
  "paypal",
  "bank_transfer",
  "cod",
]);

// Payment Methods Table (Customer Saved Methods)
export const paymentMethods = pgTable("payment_methods", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => users.id, {
    onDelete: "cascade",
  }),
  methodType: paymentMethodEnum("method_type").notNull(),
  provider: varchar("provider", { length: 255 }).notNull(), // ex: Visa, MasterCard, PayPal
  accountNumber: varchar("account_number", { length: 255 }).notNull(),
  expiryDate: varchar("expiry_date", { length: 10 }), // MM/YY format (optional for non-cards)
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Payment Info Table (Stores actual payments done per order)
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  userId: varchar("user_id", { length: 255 }).references(() => users.id),
  paymentMethodId: integer("payment_method_id").references(
    () => paymentMethods.id,
    { onDelete: "set null" }
  ),
  amount: integer("amount").notNull(), // amount in cents for precision
  currency: varchar("currency", { length: 10 }).default("USD").notNull(),
  status: paymentStatusEnum("status").default("pending").notNull(),
  transactionId: varchar("transaction_id", { length: 255 }), // from payment gateway
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Payment Transactions (Full log of each payment step/attempt)
export const paymentTransactions = pgTable("payment_transactions", {
  id: serial("id").primaryKey(),
  paymentId: integer("payment_id")
    .references(() => payments.id, { onDelete: "cascade" })
    .notNull(),
  status: paymentStatusEnum("status").notNull(),
  message: text("message"), // optional response or error message
  createdAt: timestamp("created_at").defaultNow(),
});
