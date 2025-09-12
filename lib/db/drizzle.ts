import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

// config({ path: ".env" }); // or .env.local
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not found in environment variables");
}

export const db = drizzle(process.env.DATABASE_URL!);
console.log("Database connected:", !!db);
