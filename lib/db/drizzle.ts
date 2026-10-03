
import Schema from "./schema";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL not found in environment variables");
}

const pool = new Pool({
  connectionString,
  max: 5,
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 20_000,
});

export const db = drizzle({
  client: pool,
  schema: Schema,
});