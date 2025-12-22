import { db } from "@/lib/db/drizzle";
import { wishlists, wishlistItems, products, productImages, productVariants } from "@/lib/db/schema/schema";
import { eq, and } from "drizzle-orm";
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

        // 1. Get the user's wishlist
        const userWishlist = await db.query.wishlists.findFirst({
            where: eq(wishlists.user_id, userId),
        });

        if (!userWishlist) {
            return NextResponse.json({ items: [] }, { status: 200 });
        }

        // 2. Get items in the wishlist with product details
        const items = await db
            .select({
                id: wishlistItems.id,
                productId: products.id,
                variantId: wishlistItems.variant_id,
                name: products.title,
                price: productVariants.price,
                image: productImages.url,
                addedAt: wishlistItems.added_at,
                slug: products.slug,
            })
            .from(wishlistItems)
            .innerJoin(products, eq(wishlistItems.product_id, products.id))
            .leftJoin(productVariants, eq(wishlistItems.variant_id, productVariants.id))
            .leftJoin(productImages, and(eq(productImages.product_id, products.id), eq(productImages.isMain, true)))
            .where(eq(wishlistItems.wishlist_id, userWishlist.id));
        console.log(items)
        return NextResponse.json({ items }, { status: 200 });
    } catch (error) {
        console.error("Wishlist API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error },
            { status: 500 }
        );
    }
}
