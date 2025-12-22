import { db } from "@/lib/db/drizzle";
import { orders, wishlists, wishlistItems } from "@/lib/db/schema/schema";
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
        const wishlistCountPromise = (async () => {
            const userWishlist = await db.query.wishlists.findFirst({
                where: eq(wishlists.user_id, userId),
            });

            if (!userWishlist) return [{ count: 0 }];

            return db
                .select({ count: count() })
                .from(wishlistItems)
                .where(eq(wishlistItems.wishlist_id, userWishlist.id));
        })();

        const [ordersCountResult, wishlistCountResult] = await Promise.all([
            ordersCountPromise,
            wishlistCountPromise,
        ]);

        const ordersCount = ordersCountResult[0]?.count || 0;
        const wishlistCount = wishlistCountResult[0]?.count || 0;

        return NextResponse.json(
            {
                stats: {
                    orders: ordersCount,
                    wishlist: wishlistCount,
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
