import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import {
  carts,
  cartItems,
  products,
  productVariants,
  productImages,
} from "@/lib/db/schema/schema";
import { auth } from "@/lib/auth/auth";
import { and, eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    let [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.user_id, session.user.id))
      .limit(1);

    if (!cart) {
      [cart] = await db
        .insert(carts)
        .values({ user_id: session.user.id })
        .returning();
    }

    const rows = await db
      .select({
        id: cartItems.id,
        productId: products.id,
        variantId: productVariants.id,
        name: products.title,
        price: productVariants.price,
        quantity: cartItems.quantity,
        image: productImages.url,
        slug: products.slug,
        stock: productVariants.stock,
        productStatus: products.status,
        productVisibility: products.visibility,
        variantStatus: productVariants.status,
        variantVisibility: productVariants.visibility,
        variantProductId: productVariants.product_id,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.product_id, products.id))
      .innerJoin(productVariants, eq(cartItems.variant_id, productVariants.id))
      .leftJoin(
        productImages,
        and(
          eq(productImages.product_id, products.id),
          eq(productImages.isMain, true),
        ),
      )
      .where(eq(cartItems.cart_id, cart.id));

    const items = rows.map((item) => ({
      id: item.id,
      productId: item.productId,
      variantId: item.variantId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      slug: item.slug,
      stock: item.stock,
      available:
        item.variantProductId === item.productId &&
        item.productStatus === "active" &&
        item.productVisibility === "visible" &&
        item.variantStatus === "active" &&
        item.variantVisibility === "visible" &&
        item.stock > 0,
    }));

    return NextResponse.json({ cart, items });
  } catch (error) {
    console.error("Failed to fetch cart:", error);

    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 },
    );
  }
}
