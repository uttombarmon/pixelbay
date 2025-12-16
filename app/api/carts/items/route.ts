import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { cartItems, carts, users } from "@/lib/db/schema/schema";
import { auth } from "@/lib/auth/auth";
import { and, eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();
    const { product_id, variant_id, quantity, unit_price } = body;
    if (!product_id || !variant_id || !unit_price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!session?.user?.id)
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    // find customer
    const [customer] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id));

    if (!customer)
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );

    // find or create cart
    // find or create cart
    let [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.user_id, String(customer.id)));

    if (!cart) {
      [cart] = await db
        .insert(carts)
        .values({ user_id: String(customer.id) })
        .returning();
    }
    // check if product already exists in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.cart_id, cart.id),
          eq(cartItems.variant_id, Number(variant_id))
        )
      );

    if (existingItem) {
      // update quantity instead of adding duplicate

      return NextResponse.json(
        {
          message: "Already in cart, update quantity instead",
        },
        { status: 202 }
      );
    }

    // add item
    const total_price = Number(unit_price) * quantity;
    const [newItem] = await db
      .insert(cartItems)
      .values({
        cart_id: Number(cart.id),
        variant_id: Number(variant_id),
        quantity: Number(quantity),
        unit_price: String(unit_price),
        total_price: String(Number(unit_price) * Number(quantity)),
      })
      .returning();

    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    console.error("❌ ADD TO CART ERROR:", err);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
