import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { cartItems, carts, products, productVariants } from "@/lib/db/schema/schema";
import { auth } from "@/lib/auth/auth";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    const [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.user_id, session.user.id));

    if (!cart)
      return NextResponse.json({ items: [] }); // empty cart

    const items = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        total_price: cartItems.total_price,
        product: products,
        variant: productVariants,
      })
      .from(cartItems)
      .leftJoin(productVariants, eq(cartItems.variant_id, productVariants.id))
      .leftJoin(products, eq(productVariants.product_id, products.id))
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
