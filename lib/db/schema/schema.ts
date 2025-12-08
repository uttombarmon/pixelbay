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
  numeric,
  decimal,
  index,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";
import { sql } from "drizzle-orm";
// roles
export const roleEnum = pgEnum("role", ["user", "admin", "seller"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 191 }),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: roleEnum("role").default("user").notNull(),
});

// OAuth / credential accounts
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

// sessions
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// email / magic-link tokens
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

// WebAuthn authenticators (optional but recommended for passkeys)
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


// =====================================================================
// ENUMS FOR GADGETS/TECH PRODUCTS
// =====================================================================

export const productStatusEnum = pgEnum("product_status", [
  "draft",
  "active",
  "archived",
]);

export const variantStatusEnum = pgEnum("variant_status", [
  "active",
  "disabled",
]);

export const visibilityStatusEnum = pgEnum("visibility_status", [
  "visible",
  "hidden",
]);

// Tech product type enum
export const gadgetTypeEnum = pgEnum("gadget_type", [
  "smartphone",
  "laptop",
  "tablet",
  "smartwatch",
  "headphones",
  "camera",
  "gaming_console",
  "drone",
  "vr_headset",
  "portable_speaker",
  "charger",
  "monitor",
  "keyboard",
  "mouse",
  "router",
  "hard_drive",
  "gpu",
  "cpu",
  "motherboard",
  "ram",
  "ssd",
  "power_supply",
  "case",
  "cooling",
  "accessory",
  "other",
]);

// Condition enum
export const conditionEnum = pgEnum("condition", [
  "new",
  "refurbished",
  "open_box",
  "used",
]);

// Warranty type enum
export const warrantyTypeEnum = pgEnum("warranty_type", [
  "standard",
  "extended",
  "international",
  "accidental_damage",
  "no_warranty",
]);

// Payment status
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "completed",
  "failed",
  "refunded",
]);

// Payment method enum
export const paymentMethodEnum = pgEnum("payment_method", [
  "card",
  "paypal",
  "bank_transfer",
  "cod",
]);

// =====================================================================
// TECH SPECIFICATIONS TABLE (Core for gadgets)
// =====================================================================

export const techSpecifications = pgTable("tech_specifications", {
  id: serial("id").primaryKey(),
  
  // CPU/Processor
  processor: varchar("processor", { length: 255 }), // e.g., "Apple M3 Max", "Intel Core i9-13900KS"
  processorCores: integer("processor_cores"), // Number of cores
  processorThreads: integer("processor_threads"), // Number of threads
  processorSpeed: varchar("processor_speed", { length: 50 }), // e.g., "3.5 GHz"
  processorArch: varchar("processor_arch", { length: 100 }), // e.g., "ARM64", "x86-64"
  
  // Memory
  ram: integer("ram"), // in GB
  ramType: varchar("ram_type", { length: 50 }), // e.g., "DDR5", "LPDDR5"
  ramSpeed: varchar("ram_speed", { length: 50 }), // e.g., "6400 MHz"
  
  // Storage
  storage: integer("storage"), // in GB/TB
  storageType: varchar("storage_type", { length: 50 }), // e.g., "SSD", "NVMe", "HDD"
  storageInterface: varchar("storage_interface", { length: 50 }), // e.g., "PCIe 5.0", "SATA"
  storageExpansion: varchar("storage_expansion", { length: 255 }), // e.g., "microSD up to 1TB"
  
  // GPU/Graphics
  gpu: varchar("gpu", { length: 255 }), // e.g., "RTX 4090", "AMD Radeon RX 7900 XTX"
  gpuMemory: integer("gpu_memory"), // in GB
  gpuMemoryType: varchar("gpu_memory_type", { length: 50 }), // e.g., "GDDR6X"
  
  // Display
  displaySize: decimal("display_size", { precision: 5, scale: 2 }), // in inches
  displayTech: varchar("display_tech", { length: 100 }), // e.g., "AMOLED", "IPS LCD", "Mini-LED"
  displayResolution: varchar("display_resolution", { length: 100 }), // e.g., "2560x1600"
  refreshRate: integer("refresh_rate"), // in Hz
  colorDepth: varchar("color_depth", { length: 50 }), // e.g., "10-bit"
  brightness: integer("brightness"), // in nits
  screenCoating: varchar("screen_coating", { length: 100 }), // e.g., "Gorilla Glass Victus 2"
  
  // Battery
  batteryCapacity: integer("battery_capacity"), // in mAh
  batteryType: varchar("battery_type", { length: 100 }), // e.g., "Li-Po", "Li-ion"
  batteryLife: varchar("battery_life", { length: 100 }), // e.g., "20 hours"
  fastCharging: varchar("fast_charging", { length: 100 }), // e.g., "120W"
  wirelessCharging: boolean("wireless_charging").default(false),
  
  // Camera (for devices with cameras)
  rearCameraMP: varchar("rear_camera_mp", { length: 100 }), // e.g., "200MP"
  rearCameraAperture: varchar("rear_camera_aperture", { length: 50 }), // e.g., "f/1.7"
  frontCameraMP: varchar("front_camera_mp", { length: 100 }),
  frontCameraAperture: varchar("front_camera_aperture", { length: 50 }),
  videoCapability: varchar("video_capability", { length: 100 }), // e.g., "8K@60fps"
  opticalZoom: varchar("optical_zoom", { length: 50 }),
  
  // Audio
  speakerCount: integer("speaker_count"),
  speakerWatts: varchar("speaker_watts", { length: 50 }), // e.g., "2x5W"
  audioCodec: varchar("audio_codec", { length: 100 }), // e.g., "Hi-Res Audio"
  microphone: varchar("microphone", { length: 100 }), // e.g., "Dual with noise cancellation"
  
  // Connectivity
  bluetooth: varchar("bluetooth", { length: 50 }), // e.g., "5.4"
  wifi: varchar("wifi", { length: 50 }), // e.g., "WiFi 7"
  nfc: boolean("nfc").default(false),
  usb: varchar("usb", { length: 100 }), // e.g., "USB-C 3.2"
  ports: text("ports"), // JSON array of ports
  
  // Network
  cellular: varchar("cellular", { length: 100 }), // e.g., "5G sub-6 GHz"
  sim: varchar("sim", { length: 100 }), // e.g., "Nano SIM + eSIM"
  
  // Physical
  weight: decimal("weight", { precision: 6, scale: 2 }), // in grams
  dimensions: varchar("dimensions", { length: 100 }), // e.g., "160 x 77 x 8.3mm"
  material: varchar("material", { length: 255 }), // e.g., "Aluminum frame with glass back"
  
  // Durability
  ipRating: varchar("ip_rating", { length: 20 }), // e.g., "IP68"
  mrlRating: varchar("mrl_rating", { length: 20 }), // Military spec
  dropProtection: varchar("drop_protection", { length: 100 }), // e.g., "Gorilla Glass with drop protection"
  
  // OS & Software
  operatingSystem: varchar("operating_system", { length: 100 }), // e.g., "iOS 18"
  maxOSUpdate: varchar("max_os_update", { length: 100 }), // Latest OS support
  softwareSupport: integer("software_support"), // in years
  
  // Performance
  antutuScore: integer("antutu_score"), // Benchmark score
  geekbenchScore: integer("geekbench_score"),
  fps: integer("fps"), // Frames per second in gaming
  
  // Thermal
  thermalDesignPower: integer("thermal_design_power"), // TDP in Watts
  maxTemperature: integer("max_temperature"), // in Celsius
  
  // Additional attributes (JSONB for flexibility)
  specialFeatures: jsonb("special_features").default(sql`'[]'::jsonb`), // e.g., ["5G", "Satellite", "Always-On Display"]
  certifications: jsonb("certifications").default(sql`'[]'::jsonb`), // e.g., ["FCC", "CE", "RoHS"]
  additionalSpecs: jsonb("additional_specs").default(sql`'{}'::jsonb`), // Catch-all for custom specs
  
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// =====================================================================
// PRODUCTS TABLE (Enhanced for tech)
// =====================================================================

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    
    // Basic info
    title: varchar("title", { length: 300 }).notNull(),
    slug: varchar("slug", { length: 1000 }).notNull(),
    short_description: varchar("short_description", { length: 2000 }),
    description: text("description"),
    
    // Status
    status: productStatusEnum("status").notNull().default("draft"),
    visibility: visibilityStatusEnum("visibility").notNull().default("visible"),
    
    // Brand info
    brand: varchar("brand", { length: 160 }),
    model: varchar("model", { length: 160 }),
    
    // Tech specs linking
    gadgetType: gadgetTypeEnum("gadget_type").notNull(),
    techSpecId: integer("tech_spec_id").references(() => techSpecifications.id, {
      onDelete: "set null",
    }),
    
    // Condition
    condition: conditionEnum("condition").default("new"),
    
    // Warranty
    warrantyType: warrantyTypeEnum("warranty_type").default("standard"),
    warrantyMonths: integer("warranty_months"),
    warrantyDescription: text("warranty_description"),
    
    // Category
    category_id: integer("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),
    
    // Release & Availability
    releaseDate: timestamp("release_date", { mode: "date" }),
    discontinuedDate: timestamp("discontinued_date", { mode: "date" }),
    availabilityStatus: varchar("availability_status", { length: 50 }), // e.g., "In Stock", "Pre-order", "Out of Stock"
    
    // Generic attributes (for things like color, size if variant-specific)
    attributes: jsonb("attributes").default(sql`'{}'::jsonb`),
    
    // SEO & Meta
    metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
    
    // Creator info
    created_by: text("created_by")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    
    // Timestamps
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_gadget_type").on(table.gadgetType),
    index("idx_brand").on(table.brand),
    index("idx_status").on(table.status),
  ]
);

// =====================================================================
// PRODUCT VARIANTS (Color, Storage, RAM combos, etc.)
// =====================================================================

export const productVariants = pgTable(
  "product_variants",
  {
    id: serial("id").primaryKey(),
    product_id: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    
    sku: varchar("sku", { length: 100 }).notNull(),
    
    // Variant naming
    variantName: varchar("variant_name", { length: 300 }), // e.g., "iPhone 15 Pro Max - Space Black - 256GB"
    
    // Specific variant attributes (stored in JSON for flexibility)
    color: varchar("color", { length: 100 }),
    storageVariant: varchar("storage_variant", { length: 100 }), // e.g., "256GB", "1TB"
    ramVariant: varchar("ram_variant", { length: 100 }), // e.g., "8GB", "16GB"
    regionVariant: varchar("region_variant", { length: 100 }), // e.g., "Global", "India", "US"
    
    // Pricing
    price: numeric("price", { precision: 12, scale: 2 })
      .notNull()
      .default("0.00"),
    currency: varchar("currency", { length: 3 }).notNull().default("USD"),
    compare_at_price: numeric("compare_at_price", { precision: 12, scale: 2 }),
    cost_price: numeric("cost_price", { precision: 12, scale: 2 }),
    discount_percentage: numeric("discount_percentage", { precision: 5, scale: 2 }),
    
    // Inventory
    stock: integer("stock").notNull().default(0),
    lowStockThreshold: integer("low_stock_threshold").default(10),
    
    // Status
    status: variantStatusEnum("status").notNull().default("active"),
    visibility: visibilityStatusEnum("visibility").notNull().default("visible"),
    
    // Timestamps
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_product_id").on(table.product_id),
    index("idx_sku").on(table.sku),
  ]
);

// =====================================================================
// PRODUCT IMAGES
// =====================================================================

export const productImages = pgTable(
  "product_images",
  {
    id: serial("id").primaryKey(),
    product_id: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    
    url: text("url").notNull(),
    alt: varchar("alt", { length: 300 }),
    position: integer("position").default(0).notNull(),
    
    // Image metadata
    isMain: boolean("is_main").default(false), // Main product image
    imageType: varchar("image_type", { length: 50 }), // e.g., "product", "lifestyle", "specs"
    metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  },
  (table) => [index("idx_product_id_images").on(table.product_id)]
);

// =====================================================================
// CATEGORIES
// =====================================================================

export const categories:any = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull(),
  
  // Hierarchy
  parent_id: integer("parent_id").references(() => categories.id, {
    onDelete: "cascade",
  }),
  path: text("path"), // e.g., "/electronics/computers/laptops"
  
  // Description
  description: text("description"),
  
  // Metadata
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// =====================================================================
// TECH COMPARISON TABLE (for spec comparison across products)
// =====================================================================

export const techComparisons = pgTable("tech_comparisons", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // Products being compared (stored as JSON array of product IDs)
  productIds: jsonb("product_ids").default(sql`'[]'::jsonb`),
  
  // User who created
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  
  // Shared comparison (public/private)
  isPublic: boolean("is_public").default(false),
  shareToken: varchar("share_token", { length: 100 }).unique(),
  
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// =====================================================================
// REVIEWS & RATINGS
// =====================================================================

export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    product_id: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    
    // Rating
    rating: integer("rating").notNull(), // 1-5
    
    // Review content
    title: varchar("title", { length: 255 }),
    body: text("body"),
    
    // Helpful votes
    helpfulCount: integer("helpful_count").default(0),
    unhelpfulCount: integer("unhelpful_count").default(0),
    
    // Variant reviewed (if applicable)
    variantId: integer("variant_id").references(() => productVariants.id, {
      onDelete: "set null",
    }),
    
    // Visibility
    is_public: boolean("is_public").notNull().default(true),
    verified_purchase: boolean("verified_purchase").default(false),
    
    // Metadata
    metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
    
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_product_id_reviews").on(table.product_id),
    index("idx_rating").on(table.rating),
  ]
);

// =====================================================================
// WISHLIST/FAVORITES
// =====================================================================

export const wishlists = pgTable(
  "wishlists",
  {
    id: serial("id").primaryKey(),
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    
    name: varchar("name", { length: 200 }).default("My Wishlist"),
    description: text("description"),
    isDefault: boolean("is_default").default(false),
    isPublic: boolean("is_public").default(false),
    
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("idx_user_id_wishlists").on(table.user_id)]
);

export const wishlistItems = pgTable(
  "wishlist_items",
  {
    id: serial("id").primaryKey(),
    wishlist_id: integer("wishlist_id")
      .notNull()
      .references(() => wishlists.id, { onDelete: "cascade" }),
    product_id: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    
    // Specific variant if desired
    variant_id: integer("variant_id").references(() => productVariants.id, {
      onDelete: "set null",
    }),
    
    priority: integer("priority"), // 1 = high, 5 = low
    notes: text("notes"),
    
    added_at: timestamp("added_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_wishlist_id").on(table.wishlist_id),
    index("idx_product_id_wishlist").on(table.product_id),
  ]
);

// =====================================================================
// INVENTORY & STOCK TRACKING
// =====================================================================

export const inventoryLog = pgTable(
  "inventory_log",
  {
    id: serial("id").primaryKey(),
    variant_id: integer("variant_id")
      .notNull()
      .references(() => productVariants.id, { onDelete: "cascade" }),
    
    quantityChange: integer("quantity_change").notNull(),
    reason: varchar("reason", { length: 100 }), // e.g., "purchase", "return", "adjustment", "damage"
    
    notes: text("notes"),
    createdBy: text("created_by"),
    
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [index("idx_variant_id_inventory").on(table.variant_id)]
);

// =====================================================================
// BUNDLE/DEALS (Tech bundles like laptop + mouse + keyboard)
// =====================================================================

export const bundles = pgTable("bundles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 300 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull(),
  description: text("description"),
  
  // Bundle pricing
  bundlePrice: numeric("bundle_price", { precision: 12, scale: 2 }).notNull(),
  regularPrice: numeric("regular_price", { precision: 12, scale: 2 }), // Sum of individual prices
  bundleDiscount: numeric("bundle_discount", { precision: 5, scale: 2 }), // e.g., 10% off
  
  // Contents
  productIds: jsonb("product_ids").notNull(), // Array of product IDs
  
  // Status
  isActive: boolean("is_active").default(true),
  
  created_by: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// =====================================================================
// PRICE HISTORY (Track price changes over time)
// =====================================================================

export const priceHistory = pgTable(
  "price_history",
  {
    id: serial("id").primaryKey(),
    variant_id: integer("variant_id")
      .notNull()
      .references(() => productVariants.id, { onDelete: "cascade" }),
    
    oldPrice: numeric("old_price", { precision: 12, scale: 2 }),
    newPrice: numeric("new_price", { precision: 12, scale: 2 }).notNull(),
    
    reason: varchar("reason", { length: 100 }), // e.g., "seasonal", "promotion", "market", "adjustment"
    
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [index("idx_variant_id_price").on(table.variant_id)]
);

// =====================================================================
// COMPATIBILITY (e.g., Charger compatible with phone, GPU compatible with PSU)
// =====================================================================

export const productCompatibility = pgTable(
  "product_compatibility",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    
    compatibleProductId: integer("compatible_product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    
    compatibilityType: varchar("compatibility_type", { length: 100 }), // e.g., "charger", "mount", "case", "accessory"
    notes: text("notes"),
    
    isVerified: boolean("is_verified").default(false),
  },
  (table) => [
    index("idx_product_compatibility").on(table.productId),
    index("idx_compatible_product").on(table.compatibleProductId),
  ]
);

// =====================================================================
// RESTORED EXISTING TABLES FROM YOUR SCHEMA
// =====================================================================

// export const users = pgTable("user", {
//   id: text("id")
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   name: varchar("name"),
//   email: text("email").unique(),
//   emailVerified: timestamp("emailVerified", { mode: "date" }),
//   image: text("image"),
//   role: pgEnum("role", ["user", "admin", "seller"])("role")
//     .default("user")
//     .notNull(),
// });

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  address1: varchar("address1", { length: 200 }).notNull(),
  address2: varchar("address2", { length: 200 }),
  city: varchar("city", { length: 120 }).notNull(),
  country: varchar("country", { length: 120 }).notNull(),
  postcode: varchar("postcode", { length: 20 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  is_default: boolean("is_default").default(false),
});

// =====================================================================
// CART & ORDERS
// =====================================================================

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const cartItems = pgTable(
  "cart_items",
  {
    id: serial("id").primaryKey(),
    cart_id: integer("cart_id")
      .notNull()
      .references(() => carts.id, { onDelete: "cascade" }),
    variant_id: integer("variant_id")
      .notNull()
      .references(() => productVariants.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    unit_price: numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
    total_price: numeric("total_price", { precision: 12, scale: 2 }).notNull(),
    added_at: timestamp("added_at").notNull().defaultNow(),
  },
  (table) => [index("idx_cart_id").on(table.cart_id)]
);

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    user_id: text("user_id")
      .notNull()
      .references(() => users.id),
    
    orderNumber: varchar("order_number", { length: 50 }).unique().notNull(),
    
    status: varchar("status", { length: 50 }).notNull().default("pending"),
    total_amount: numeric("total_amount", { precision: 12, scale: 2 })
      .notNull()
      .default("0.00"),
    subtotal: numeric("subtotal", { precision: 12, scale: 2 }),
    tax: numeric("tax", { precision: 12, scale: 2 }),
    shipping: numeric("shipping", { precision: 12, scale: 2 }),
    discount: numeric("discount", { precision: 12, scale: 2 }),
    
    currency: varchar("currency", { length: 3 }).notNull().default("USD"),
    
    // Shipping info
    shippingAddress: jsonb("shipping_address").notNull(),
    billingAddress: jsonb("billing_address"),
    
    metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
    
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_user_id_orders").on(table.user_id),
    index("idx_order_status").on(table.status),
  ]
);

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    order_id: integer("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    variant_id: integer("variant_id")
      .notNull()
      .references(() => productVariants.id),
    
    quantity: integer("quantity").notNull().default(1),
    unit_price: numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
    total_price: numeric("total_price", { precision: 12, scale: 2 }).notNull(),
  },
  (table) => [index("idx_order_id").on(table.order_id)]
);

// =====================================================================
// PAYMENTS
// =====================================================================

export const paymentMethods = pgTable(
  "payment_methods",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 255 }).references(() => users.id, {
      onDelete: "cascade",
    }),
    methodType: paymentMethodEnum("method_type").notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    accountNumber: varchar("account_number", { length: 255 }).notNull(),
    expiryDate: varchar("expiry_date", { length: 10 }),
    isDefault: boolean("is_default").default(false),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("idx_user_id_payment").on(table.userId)]
);

export const payments = pgTable(
  "payments",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").notNull(),
    userId: varchar("user_id", { length: 255 }).references(() => users.id),
    paymentMethodId: integer("payment_method_id").references(
      () => paymentMethods.id,
      { onDelete: "set null" }
    ),
    amount: integer("amount").notNull(),
    currency: varchar("currency", { length: 10 }).default("USD").notNull(),
    status: paymentStatusEnum("status").default("pending").notNull(),
    transactionId: varchar("transaction_id", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_order_id_payment").on(table.orderId),
    index("idx_payment_status").on(table.status),
  ]
);

export const paymentTransactions = pgTable(
  "payment_transactions",
  {
    id: serial("id").primaryKey(),
    paymentId: integer("payment_id")
      .references(() => payments.id, { onDelete: "cascade" })
      .notNull(),
    status: paymentStatusEnum("status").notNull(),
    message: text("message"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("idx_payment_id").on(table.paymentId)]
);
