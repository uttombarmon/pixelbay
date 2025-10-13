import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { cartItems, carts, customers, products } from "@/lib/db/schema/schema";
import { auth } from "@/lib/auth/auth";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    const [customer] = await db
      .select()
      .from(customers)
      .where(eq(customers.userId, session.user.id));

    if (!customer || !customer.id)
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });

    const [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.customer_id, String(customer.id)));

    if (!cart)
      return NextResponse.json({ items: [] }); // empty cart

    const items = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        total_price: cartItems.total_price,
        product: products,
      })
      .from(cartItems)
      .leftJoin(products, eq(cartItems.product_id, products.id))
      .where(eq(cartItems.cart_id, cart.id));

    return NextResponse.json(items);
  } catch (err) {
    console.error("❌ GET CART ITEMS ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}
