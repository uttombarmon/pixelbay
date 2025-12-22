import { db } from "@/lib/db/drizzle";
import { orders, wishlists, wishlistItems, carts, cartItems } from "@/lib/db/schema/schema";
import { eq, count } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

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

        // Parallel fetch for efficiency

        // 1. Order count
        const ordersCountPromise = db
            .select({ count: count() })
            .from(orders)
            .where(eq(orders.user_id, userId));

        // 2. Wishlist count
        const cartlistCountPromise = (async () => {
            const userCart = await db.query.carts.findFirst({
                where: eq(carts.user_id, userId),
            });

            if (!userCart) return [{ count: 0 }];

            return db
                .select({ count: count() })
                .from(cartItems)
                .where(eq(cartItems.cart_id, userCart.id));
        })();

        const [ordersCountResult, cartlistCountResult] = await Promise.all([
            ordersCountPromise,
            cartlistCountPromise,
        ]);

        const ordersCount = ordersCountResult[0]?.count || 0;
        const cartlistCount = cartlistCountResult[0]?.count || 0;

        return NextResponse.json(
            {
                stats: {
                    orders: ordersCount,
                    cartlist: cartlistCount,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Dashboard Stats API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error },
            { status: 500 }
        );
    }
}
