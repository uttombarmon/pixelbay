import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { carts } from "@/lib/db/schema/schema";
import { auth } from "@/lib/auth/auth";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id)
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    // check existing cart
    const [existingCart] = await db
      .select()
      .from(carts)
      .where(eq(carts.user_id, session.user.id));

    // create if not found
    if (!existingCart) {
      const [newCart] = await db
        .insert(carts)
        .values({ user_id: session.user.id })
        .returning();
      return NextResponse.json(newCart);
    }

    return NextResponse.json(existingCart);
  } catch (err) {
    console.error("❌ GET CART ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}
