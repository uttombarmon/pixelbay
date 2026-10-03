import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db/drizzle";
import {
  orders,
  orderItems,
  productVariants,
  products,
} from "@/lib/db/schema/schema";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

function toCents(value: string | number): number {
  const amount = String(value);

  if (!/^\d{1,10}(?:\.\d{1,2})?$/.test(amount)) {
    throw new Error("INVALID_AMOUNT");
  }

  const [whole, fraction = ""] = amount.split(".");
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));

  if (!Number.isSafeInteger(cents)) {
    throw new Error("INVALID_AMOUNT");
  }

  return cents;
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

    const orderId = (body as Record<string, unknown>).orderId;

    if (
      typeof orderId !== "number" ||
      !Number.isSafeInteger(orderId) ||
      orderId <= 0
    ) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    // An order can only be paid for by its owner.
    const [order] = await db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        userId: orders.user_id,
        status: orders.status,
        subtotal: orders.subtotal,
        tax: orders.tax,
        shipping: orders.shipping,
        discount: orders.discount,
        total: orders.total_amount,
        currency: orders.currency,
      })
      .from(orders)
      .where(and(eq(orders.id, orderId), eq(orders.user_id, session.user.id)))
      .limit(1);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "pending") {
      return NextResponse.json(
        { error: "This order cannot be paid" },
        { status: 409 },
      );
    }

    const currency = order.currency.toLowerCase();

    // This initial implementation supports two-decimal currencies only.
    if (
      !/^[a-z]{3}$/.test(currency) ||
      currency === "jpy" ||
      currency === "krw"
    ) {
      return NextResponse.json(
        { error: "Unsupported payment currency" },
        { status: 400 },
      );
    }

    const items = await db
      .select({
        productName: products.title,
        variantId: productVariants.id,
        quantity: orderItems.quantity,
        unitPrice: orderItems.unit_price,
        lineTotal: orderItems.total_price,
      })
      .from(orderItems)
      .innerJoin(productVariants, eq(orderItems.variant_id, productVariants.id))
      .innerJoin(products, eq(productVariants.product_id, products.id))
      .where(eq(orderItems.order_id, order.id));

    if (items.length === 0) {
      return NextResponse.json(
        { error: "Order has no items" },
        { status: 400 },
      );
    }

    if (
      order.subtotal == null ||
      order.tax == null ||
      order.shipping == null ||
      order.discount == null ||
      order.total == null
    ) {
      return NextResponse.json(
        { error: "Order totals are incomplete" },
        { status: 409 },
      );
    }

    const subtotalCents = toCents(order.subtotal);
    const taxCents = toCents(order.tax);
    const shippingCents = toCents(order.shipping);
    const discountCents = toCents(order.discount);
    const totalCents = toCents(order.total);

    const calculatedItemsSubtotal = items.reduce(
      (sum, item) => sum + toCents(item.lineTotal),
      0,
    );

    const calculatedTotal =
      subtotalCents + taxCents + shippingCents - discountCents;

    // Never let a browser-provided amount determine the Stripe charge.
    if (
      calculatedItemsSubtotal !== subtotalCents ||
      calculatedTotal !== totalCents ||
      totalCents <= 0
    ) {
      return NextResponse.json(
        { error: "Order totals are inconsistent" },
        { status: 409 },
      );
    }

    // Discount handling requires a real discount allocation strategy.
    if (discountCents !== 0) {
      return NextResponse.json(
        { error: "Discounted orders are not supported yet" },
        { status: 400 },
      );
    }

    const lineItems = items.map((item) => {
      if (!Number.isSafeInteger(item.quantity) || item.quantity < 1) {
        throw new Error("INVALID_QUANTITY");
      }

      const unitAmount = toCents(item.unitPrice);

      if (
        unitAmount <= 0 ||
        unitAmount * item.quantity !== toCents(item.lineTotal)
      ) {
        throw new Error("INVALID_AMOUNT");
      }

      return {
        quantity: item.quantity,
        price_data: {
          currency,
          unit_amount: unitAmount,
          product_data: {
            name: item.productName,
          },
        },
      };
    });

    if (taxCents > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency,
          unit_amount: taxCents,
          product_data: {
            name: "Tax",
          },
        },
      });
    }

    if (shippingCents > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency,
          unit_amount: shippingCents,
          product_data: {
            name: "Shipping",
          },
        },
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl) {
      throw new Error("Missing NEXT_PUBLIC_APP_URL");
    }

    const checkout = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        line_items: lineItems,
        client_reference_id: String(order.id),
        metadata: {
          orderId: String(order.id),
          orderNumber: order.orderNumber,
          userId: session.user.id,
        },
        payment_intent_data: {
          metadata: {
            orderId: String(order.id),
            orderNumber: order.orderNumber,
          },
        },
        success_url:
          `${baseUrl}/order-confirmation?orderNumber=${encodeURIComponent(order.orderNumber)}` +
          "&session_id={CHECKOUT_SESSION_ID}",
        cancel_url: `${baseUrl}/payment?payment=cancelled&orderNumber=${encodeURIComponent(order.orderNumber)}`,
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      },
      {
        idempotencyKey: `pixelbay-checkout-order-${order.id}`,
      },
    );

    if (!checkout.url) {
      throw new Error("STRIPE_CHECKOUT_URL_MISSING");
    }
    // console.log("checkout server: ", checkout);
    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON request" },
        { status: 400 },
      );
    }

    const code = error instanceof Error ? error.message : "";

    if (code === "INVALID_AMOUNT" || code === "INVALID_QUANTITY") {
      return NextResponse.json(
        { error: "Invalid order amounts" },
        { status: 400 },
      );
    }

    console.error("Stripe Checkout session creation failed:", error);

    return NextResponse.json(
      { error: "Unable to start checkout" },
      { status: 500 },
    );
  }
}
