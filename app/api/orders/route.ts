import { db } from "@/lib/db/drizzle";
import {
  orders,
  orderItems,
  cartItems,
  carts,
  products,
  productVariants,
} from "@/lib/db/schema/schema";
import { and, desc, eq, gte, inArray, sql } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.user_id, session.user.id))
      .orderBy(desc(orders.created_at));

    return NextResponse.json({ orders: userOrders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);

    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const body: unknown = await req.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const data = body as Record<string, unknown>;
    const isCartMode = data.isCartMode === true;
    const shipping = data.shippingAddress;

    if (!shipping || typeof shipping !== "object" || Array.isArray(shipping)) {
      return NextResponse.json(
        { error: "Shipping address is required" },
        { status: 400 },
      );
    }

    const address = shipping as Record<string, unknown>;

    const name = typeof address.name === "string" ? address.name.trim() : "";
    const street =
      typeof address.address === "string" ? address.address.trim() : "";
    const city = typeof address.city === "string" ? address.city.trim() : "";
    const zip = typeof address.zip === "string" ? address.zip.trim() : "";

    if (
      !name ||
      !street ||
      !city ||
      !zip ||
      name.length > 120 ||
      street.length > 200 ||
      city.length > 120 ||
      zip.length > 20
    ) {
      return NextResponse.json(
        { error: "Please provide a valid shipping address" },
        { status: 400 },
      );
    }

    type RequestedItem = {
      variantId: number;
      quantity: number;
    };

    let requestedItems: RequestedItem[];

    if (isCartMode) {
      // Never trust cart contents or prices supplied by the browser.
      const [cart] = await db
        .select({ id: carts.id })
        .from(carts)
        .where(eq(carts.user_id, session.user.id))
        .limit(1);

      if (!cart) {
        return NextResponse.json(
          { error: "Your cart is empty" },
          { status: 400 },
        );
      }

      const savedItems = await db
        .select({
          variantId: cartItems.variant_id,
          quantity: cartItems.quantity,
          cartProductId: cartItems.product_id,
          variantProductId: productVariants.product_id,
        })
        .from(cartItems)
        .innerJoin(
          productVariants,
          eq(cartItems.variant_id, productVariants.id),
        )
        .where(eq(cartItems.cart_id, cart.id));

      if (savedItems.length === 0) {
        return NextResponse.json(
          { error: "Your cart is empty" },
          { status: 400 },
        );
      }

      if (
        savedItems.some((item) => item.cartProductId !== item.variantProductId)
      ) {
        return NextResponse.json(
          { error: "Invalid cart item" },
          { status: 400 },
        );
      }

      requestedItems = savedItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));
    } else {
      if (!Array.isArray(data.items) || data.items.length === 0) {
        return NextResponse.json(
          { error: "No items in order" },
          { status: 400 },
        );
      }

      if (data.items.length > 50) {
        return NextResponse.json(
          { error: "Too many items in one order" },
          { status: 400 },
        );
      }

      requestedItems = [];

      for (const item of data.items) {
        if (!item || typeof item !== "object" || Array.isArray(item)) {
          return NextResponse.json(
            { error: "Invalid order item" },
            { status: 400 },
          );
        }

        const value = item as Record<string, unknown>;

        if (
          typeof value.variantId !== "number" ||
          !Number.isSafeInteger(value.variantId) ||
          value.variantId <= 0 ||
          typeof value.quantity !== "number" ||
          !Number.isSafeInteger(value.quantity) ||
          value.quantity < 1 ||
          value.quantity > 99
        ) {
          return NextResponse.json(
            { error: "Invalid product or quantity" },
            { status: 400 },
          );
        }

        requestedItems.push({
          variantId: value.variantId,
          quantity: value.quantity,
        });
      }
    }

    // Reject duplicate variant IDs rather than allowing ambiguous lines.
    const variantIds = requestedItems.map((item) => item.variantId);

    if (new Set(variantIds).size !== variantIds.length) {
      return NextResponse.json(
        { error: "Duplicate order items are not allowed" },
        { status: 400 },
      );
    }

    if (
      requestedItems.some(
        (item) =>
          !Number.isSafeInteger(item.quantity) ||
          item.quantity < 1 ||
          item.quantity > 99,
      )
    ) {
      return NextResponse.json(
        { error: "Invalid item quantity" },
        { status: 400 },
      );
    }

    const result = await db.transaction(async (tx) => {
      const purchasableVariants = await tx
        .select({
          id: productVariants.id,
          productId: productVariants.product_id,
          price: productVariants.price,
          currency: productVariants.currency,
          stock: productVariants.stock,
        })
        .from(productVariants)
        .innerJoin(products, eq(productVariants.product_id, products.id))
        .where(
          and(
            inArray(productVariants.id, variantIds),
            eq(productVariants.status, "active"),
            eq(productVariants.visibility, "visible"),
            eq(products.status, "active"),
            eq(products.visibility, "visible"),
          ),
        );

      if (purchasableVariants.length !== requestedItems.length) {
        throw new Error("INVALID_PRODUCTS");
      }

      const variantMap = new Map(
        purchasableVariants.map((variant) => [variant.id, variant]),
      );

      // Use integer cents for accurate money calculations.
      const pricedItems = requestedItems.map((item) => {
        const variant = variantMap.get(item.variantId);

        if (!variant) {
          throw new Error("INVALID_PRODUCTS");
        }

        const priceMatch = /^\d{1,10}(?:\.\d{1,2})?$/.test(variant.price);

        if (!priceMatch) {
          throw new Error("INVALID_PRICE");
        }

        const [whole, fraction = ""] = variant.price.split(".");
        const unitPriceCents =
          Number(whole) * 100 + Number(fraction.padEnd(2, "0"));

        if (!Number.isSafeInteger(unitPriceCents) || unitPriceCents <= 0) {
          throw new Error("INVALID_PRICE");
        }

        return {
          ...item,
          variant,
          unitPriceCents,
          lineTotalCents: unitPriceCents * item.quantity,
        };
      });

      const currencies = new Set(
        pricedItems.map((item) => item.variant.currency),
      );

      if (currencies.size !== 1) {
        throw new Error("MIXED_CURRENCIES");
      }

      const subtotalCents = pricedItems.reduce(
        (sum, item) => sum + item.lineTotalCents,
        0,
      );

      if (!Number.isSafeInteger(subtotalCents) || subtotalCents <= 0) {
        throw new Error("INVALID_TOTAL");
      }

      // Preserve the current checkout's 10% tax policy.
      const taxCents = Math.round(subtotalCents * 0.1);
      const totalCents = subtotalCents + taxCents;

      const money = (cents: number) =>
        `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;

      const currency = pricedItems[0].variant.currency;

      // Atomically reserve stock. Concurrent checkouts cannot
      // both decrement stock below zero.
      for (const item of pricedItems) {
        const updated = await tx
          .update(productVariants)
          .set({
            stock: sql`${productVariants.stock} - ${item.quantity}`,
            updated_at: new Date(),
          })
          .where(
            and(
              eq(productVariants.id, item.variantId),
              eq(productVariants.status, "active"),
              eq(productVariants.visibility, "visible"),
              gte(productVariants.stock, item.quantity),
            ),
          )
          .returning({ id: productVariants.id });

        if (updated.length !== 1) {
          throw new Error("INSUFFICIENT_STOCK");
        }
      }

      const orderNumber = `ORD-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;

      const [newOrder] = await tx
        .insert(orders)
        .values({
          user_id: session.user.id,
          orderNumber,
          status: "pending",
          subtotal: money(subtotalCents),
          tax: money(taxCents),
          shipping: "0.00",
          discount: "0.00",
          total_amount: money(totalCents),
          currency,
          shippingAddress: { name, address: street, city, zip },
          billingAddress: { name, address: street, city, zip },
        })
        .returning({
          id: orders.id,
          orderNumber: orders.orderNumber,
        });

      await tx.insert(orderItems).values(
        pricedItems.map((item) => ({
          order_id: newOrder.id,
          variant_id: item.variant.id,
          quantity: item.quantity,
          unit_price: money(item.unitPriceCents),
          total_price: money(item.lineTotalCents),
        })),
      );

      if (isCartMode) {
        const [cart] = await tx
          .select({ id: carts.id })
          .from(carts)
          .where(eq(carts.user_id, session.user.id))
          .limit(1);

        if (cart) {
          await tx.delete(cartItems).where(eq(cartItems.cart_id, cart.id));
        }
      }

      return newOrder;
    });

    return NextResponse.json(
      {
        success: true,
        orderId: result.id,
        orderNumber: result.orderNumber,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON request" },
        { status: 400 },
      );
    }

    const code = error instanceof Error ? error.message : "";

    if (code === "INVALID_PRODUCTS") {
      return NextResponse.json(
        { error: "One or more products are unavailable" },
        { status: 400 },
      );
    }

    if (code === "INVALID_PRICE" || code === "INVALID_TOTAL") {
      return NextResponse.json(
        { error: "Unable to calculate order price" },
        { status: 400 },
      );
    }

    if (code === "MIXED_CURRENCIES") {
      return NextResponse.json(
        { error: "All items must use the same currency" },
        { status: 400 },
      );
    }

    if (code === "INSUFFICIENT_STOCK") {
      return NextResponse.json(
        { error: "One or more products are out of stock" },
        { status: 409 },
      );
    }

    console.error("Order creation failed:", error);

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
