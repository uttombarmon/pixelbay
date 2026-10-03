import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import {
  cartItems,
  carts,
  products,
  productVariants,
} from "@/lib/db/schema/schema";
import { auth } from "@/lib/auth/auth";
import { and, eq } from "drizzle-orm";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function getOwnedItem(itemId: number, userId: string) {
  const [item] = await db
    .select({
      id: cartItems.id,
      cartId: cartItems.cart_id,
      userId: carts.user_id,
      quantity: cartItems.quantity,
      variantId: productVariants.id,
      stock: productVariants.stock,
      productId: products.id,
      variantProductId: productVariants.product_id,
      productStatus: products.status,
      productVisibility: products.visibility,
      variantStatus: productVariants.status,
      variantVisibility: productVariants.visibility,
    })
    .from(cartItems)
    .innerJoin(carts, eq(cartItems.cart_id, carts.id))
    .innerJoin(productVariants, eq(cartItems.variant_id, productVariants.id))
    .innerJoin(products, eq(cartItems.product_id, products.id))
    .where(and(eq(cartItems.id, itemId), eq(carts.user_id, userId)))
    .limit(1);

  return item;
}

function parseItemId(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null;

  const id = Number(value);

  return Number.isSafeInteger(id) ? id : null;
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const [cart] = await db
      .select({ id: carts.id })
      .from(carts)
      .where(eq(carts.user_id, session.user.id))
      .limit(1);

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    const rows = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        price: productVariants.price,
        stock: productVariants.stock,
        productId: products.id,
        productName: products.title,
        productSlug: products.slug,
        productStatus: products.status,
        productVisibility: products.visibility,
        variantId: productVariants.id,
        variantName: productVariants.variantName,
        sku: productVariants.sku,
        variantStatus: productVariants.status,
        variantVisibility: productVariants.visibility,
        variantProductId: productVariants.product_id,
      })
      .from(cartItems)
      .innerJoin(productVariants, eq(cartItems.variant_id, productVariants.id))
      .innerJoin(products, eq(cartItems.product_id, products.id))
      .where(eq(cartItems.cart_id, cart.id));

    const items = rows.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
      product: {
        id: item.productId,
        title: item.productName,
        slug: item.productSlug,
        status: item.productStatus,
        visibility: item.productVisibility,
      },
      variant: {
        id: item.variantId,
        variantName: item.variantName,
        sku: item.sku,
        price: item.price,
        stock: item.stock,
        status: item.variantStatus,
        visibility: item.variantVisibility,
      },
      available:
        item.variantProductId === item.productId &&
        item.productStatus === "active" &&
        item.productVisibility === "visible" &&
        item.variantStatus === "active" &&
        item.variantVisibility === "visible" &&
        item.stock > 0,
    }));

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Failed to fetch cart items:", error);

    return NextResponse.json(
      { error: "Failed to fetch cart items" },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const { id } = await params;
    const itemId = parseItemId(id);

    if (itemId === null) {
      return NextResponse.json(
        { error: "Invalid cart item ID" },
        { status: 400 },
      );
    }

    const item = await getOwnedItem(itemId, session.user.id);

    if (!item) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 },
      );
    }

    await db
      .delete(cartItems)
      .where(
        and(eq(cartItems.id, item.id), eq(cartItems.cart_id, item.cartId)),
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete cart item:", error);

    return NextResponse.json(
      { error: "Failed to delete cart item" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const { id } = await params;
    const itemId = parseItemId(id);

    if (itemId === null) {
      return NextResponse.json(
        { error: "Invalid cart item ID" },
        { status: 400 },
      );
    }

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request" },
        { status: 400 },
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const quantity = (body as Record<string, unknown>).quantity;

    if (
      typeof quantity !== "number" ||
      !Number.isSafeInteger(quantity) ||
      quantity < 1 ||
      quantity > 99
    ) {
      return NextResponse.json(
        { error: "Quantity must be an integer between 1 and 99" },
        { status: 400 },
      );
    }

    const item = await getOwnedItem(itemId, session.user.id);

    if (!item) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 },
      );
    }

    if (
      item.variantProductId !== item.productId ||
      item.productStatus !== "active" ||
      item.productVisibility !== "visible" ||
      item.variantStatus !== "active" ||
      item.variantVisibility !== "visible"
    ) {
      return NextResponse.json(
        { error: "This product is unavailable" },
        { status: 409 },
      );
    }

    if (quantity > item.stock) {
      return NextResponse.json(
        { error: "Requested quantity exceeds available stock" },
        { status: 409 },
      );
    }

    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(and(eq(cartItems.id, item.id), eq(cartItems.cart_id, item.cartId)))
      .returning();

    if (!updatedItem) {
      return NextResponse.json(
        { error: "Cart item could not be updated" },
        { status: 409 },
      );
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Failed to update cart item:", error);

    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 },
    );
  }
}
