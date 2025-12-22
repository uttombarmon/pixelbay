import { db } from "@/lib/db/drizzle";
import { orders, orderItems, cartItems, carts } from "@/lib/db/schema/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    try {
        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        const userOrders = await db
            .select()
            .from(orders)
            .where(eq(orders.user_id, userId))
            .orderBy(desc(orders.created_at));

        return NextResponse.json({ orders: userOrders }, { status: 200 });
    } catch (error) {
        console.error("Orders API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Not signed in" }, { status: 401 });
        }

        const body = await req.json();
        const { items, shippingAddress, subtotal, tax, total, isCartMode } = body;

        // Validate required fields
        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "No items in order" },
                { status: 400 }
            );
        }

        if (!shippingAddress || !shippingAddress.name || !shippingAddress.address) {
            return NextResponse.json(
                { error: "Shipping address is required" },
                { status: 400 }
            );
        }

        // Generate unique order number
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
        const orderNumber = `ORD-${timestamp}-${randomString}`;

        // Create order
        const [newOrder] = await db
            .insert(orders)
            .values({
                user_id: session.user.id,
                orderNumber,
                status: "pending",
                subtotal: subtotal.toString(),
                tax: tax.toString(),
                shipping: "0.00",
                discount: "0.00",
                total_amount: total.toString(),
                currency: "USD",
                shippingAddress: shippingAddress,
                billingAddress: shippingAddress, // Using same address for now
            })
            .returning();

        // Create order items
        const orderItemsData = items.map((item: any) => ({
            order_id: newOrder.id,
            variant_id: item.variantId,
            quantity: item.quantity,
            unit_price: item.unitPrice,
            total_price: (parseFloat(item.unitPrice) * item.quantity).toFixed(2),
        }));

        await db.insert(orderItems).values(orderItemsData);

        // If cart mode, clear the user's cart
        if (isCartMode) {
            const [userCart] = await db
                .select()
                .from(carts)
                .where(eq(carts.user_id, session.user.id));

            if (userCart) {
                await db.delete(cartItems).where(eq(cartItems.cart_id, userCart.id));
            }
        }

        return NextResponse.json(
            {
                success: true,
                orderId: newOrder.id,
                orderNumber: newOrder.orderNumber,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("❌ CREATE ORDER ERROR:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
