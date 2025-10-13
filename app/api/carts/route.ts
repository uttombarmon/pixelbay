import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { carts, customers } from "@/lib/db/schema/schema";
import { auth } from "@/lib/auth/auth";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id)
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    // find customer
    const [customer] = await db
      .select()
      .from(customers)
      .where(eq(customers.userId, session.user.id));

    if (!customer || !customer.id)
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );

    // check existing cart
    const [existingCart] = await db
      .select()
      .from(carts)
      .where(eq(carts.customer_id, String(customer.id)));

    // create if not found
    if (!existingCart) {
      const [newCart] = await db
        .insert(carts)
        .values({ customer_id: String(customer.id) })
        .returning();
      return NextResponse.json(newCart);
    }

    return NextResponse.json(existingCart);
  } catch (err) {
    console.error("❌ GET CART ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}
