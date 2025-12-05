import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sellerId = searchParams?.get("sid");
  const customerId = searchParams?.get("cid");
  try {
    if (sellerId && customerId) {
      const customer = await db
        .select()
        .from(users)
        .where(eq(users.id, customerId))
        .limit(1);
    }
  } catch (error) {
    console.log("Error Form get customer Api:", error);
    return NextResponse.error();
  }
}
