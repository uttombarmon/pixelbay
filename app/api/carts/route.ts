import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { carts, cartItems, products, productVariants, productImages } from "@/lib/db/schema/schema";
import { auth } from "@/lib/auth/auth";
import { eq, and } from "drizzle-orm";

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

    let cartId = existingCart?.id;

    // create if not found
    if (!existingCart) {
      const [newCart] = await db
        .insert(carts)
        .values({ user_id: session.user.id })
        .returning();
      cartId = newCart.id;
    }

    // Fetch items
    const items = await db
      .select({
        id: cartItems.id,
        productId: products.id,
        variantId: cartItems.variant_id,
        name: products.title,
        price: cartItems.unit_price, // Or productVariants.price if you want live price
        quantity: cartItems.quantity,
        image: productImages.url,
        slug: products.slug,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.product_id, products.id))
      .leftJoin(productVariants, eq(cartItems.variant_id, productVariants.id))
      .leftJoin(productImages, and(eq(productImages.product_id, products.id), eq(productImages.isMain, true)))
      .where(eq(cartItems.cart_id, cartId));
    console.log("items:", items);
    return NextResponse.json({ cart: existingCart || { id: cartId }, items });
  } catch (err) {
    console.error("❌ GET CART ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}
