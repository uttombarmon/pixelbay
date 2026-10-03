import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";
import { orders } from "@/lib/db/schema/schema";
import { stripe } from "@/lib/stripe";

import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing webhook signature or configuration" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    // Stripe requires the exact, unmodified request body.
    const rawBody = await req.text();

    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);

    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 },
    );
  }

  // Handle only successful Checkout Session payment events for now.
  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  ) {
    return NextResponse.json({ received: true });
  }

  const checkout = event.data.object as Stripe.Checkout.Session;

  // Never mark an unpaid or partially completed session as paid.
  if (checkout.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  const orderId = Number(checkout.metadata?.orderId);
  const orderNumber = checkout.metadata?.orderNumber;
  const userId = checkout.metadata?.userId;

  if (
    !Number.isSafeInteger(orderId) ||
    orderId <= 0 ||
    !orderNumber ||
    !userId ||
    checkout.client_reference_id !== String(orderId) ||
    checkout.mode !== "payment" ||
    checkout.status !== "complete" ||
    checkout.amount_total == null ||
    !checkout.currency
  ) {
    console.error("Stripe Checkout Session has invalid order metadata", {
      eventId: event.id,
      checkoutSessionId: checkout.id,
    });

    // This is a verified but invalid event for our order flow.
    // A retry will not fix its metadata.
    return NextResponse.json({ received: true });
  }

  try {
    const [order] = await db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        userId: orders.user_id,
        status: orders.status,
        total: orders.total_amount,
        currency: orders.currency,
      })
      .from(orders)
      .where(
        and(
          eq(orders.id, orderId),
          eq(orders.orderNumber, orderNumber),
          eq(orders.user_id, userId),
        ),
      )
      .limit(1);

    if (!order) {
      console.error("Stripe payment references an unknown order", {
        eventId: event.id,
        orderId,
      });

      return NextResponse.json({ received: true });
    }

    if (order.total == null) {
      console.error("Order total is missing", { orderId });

      return NextResponse.json({ received: true });
    }

    const amountMatch = /^\d{1,10}(?:\.\d{1,2})?$/.test(order.total);

    if (!amountMatch) {
      console.error("Order has an invalid total", { orderId });

      return NextResponse.json({ received: true });
    }

    const [whole, fraction = ""] = order.total.split(".");
    const expectedAmount =
      Number(whole) * 100 + Number(fraction.padEnd(2, "0"));

    if (
      checkout.amount_total !== expectedAmount ||
      checkout.currency.toLowerCase() !== order.currency.toLowerCase()
    ) {
      console.error("Stripe payment amount or currency mismatch", {
        eventId: event.id,
        orderId,
        expectedAmount,
        receivedAmount: checkout.amount_total,
        expectedCurrency: order.currency,
        receivedCurrency: checkout.currency,
      });

      return NextResponse.json({ received: true });
    }

    // Atomic state transition: duplicate webhook deliveries cannot
    // change an already-transitioned order a second time.
    const updated = await db
      .update(orders)
      .set({ status: "paid" })
      .where(and(eq(orders.id, order.id), eq(orders.status, "pending")))
      .returning({ id: orders.id });

    if (updated.length === 0 && order.status !== "paid") {
      console.warn("Payment received for an order not in pending state", {
        eventId: event.id,
        orderId,
        currentStatus: order.status,
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    // Return a failure for transient database errors so Stripe can retry.
    console.error("Failed to process Stripe webhook:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
