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
        unit_price: cartItems.unit_price,
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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    const { id: itemId } = await params;

    // Verify item belongs to user's cart
    const [item] = await db
      .select({
        id: cartItems.id,
        cartId: cartItems.cart_id,
        userId: carts.user_id,
      })
      .from(cartItems)
      .innerJoin(carts, eq(cartItems.cart_id, carts.id))
      .where(eq(cartItems.id, Number(itemId)));

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    if (item.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await db.delete(cartItems).where(eq(cartItems.id, Number(itemId)));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ DELETE CART ITEM ERROR:", err);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    const { id: itemId } = await params;
    const body = await req.json();
    const { quantity } = body;

    if (!quantity || quantity < 1) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    // Verify ownership
    const [item] = await db
      .select({
        id: cartItems.id,
        cartId: cartItems.cart_id,
        userId: carts.user_id,
      })
      .from(cartItems)
      .innerJoin(carts, eq(cartItems.cart_id, carts.id))
      .where(eq(cartItems.id, Number(itemId)));

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    if (item.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity: Number(quantity) })
      .where(eq(cartItems.id, Number(itemId)))
      .returning();

    return NextResponse.json(updatedItem);
  } catch (err) {
    console.error("❌ UPDATE CART ITEM ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}
