import { db } from "@/lib/db/drizzle";
import {
    products as productsTable,
    productVariants,
    productImages,
} from "@/lib/db/schema/schema";
import { NextResponse } from "next/server";
import { eq, sql, desc, and } from "drizzle-orm";

export async function GET() {
    try {
        const superDeals = await db
            .select({
                id: productsTable.id,
                title: productsTable.title,
                slug: productsTable.slug,
                brand: productsTable.brand,
                gadgetType: productsTable.gadgetType,
                variantId: productVariants.id,
                price: sql<number>`${productVariants.price}::float`,
                orginal_price: sql<number>`${productVariants.compare_at_price}::float`,
                discount: sql<number>`${productVariants.discount_percentage}::float`,
                productImage: sql<string>`(
          SELECT url 
          FROM product_images 
          WHERE product_images.product_id = products.id
          ORDER BY product_images.position ASC
          LIMIT 1
        )`.as("productImage"),
            })
            .from(productsTable)
            .innerJoin(productVariants, eq(productsTable.id, productVariants.product_id))
            .where(
                and(
                    eq(productsTable.status, "active"),
                    eq(productVariants.status, "active"),
                    sql`${productVariants.discount_percentage} > 0`
                )
            )
            .orderBy(desc(productVariants.discount_percentage))
            .limit(20);

        return NextResponse.json(superDeals, {
            status: 200,
            headers: {
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            },
        });
    } catch (err) {
        console.error("Error fetching super deals:", err);
        return NextResponse.json(
            { error: "Failed to fetch super deals", details: (err as Error).message },
            { status: 500 }
        );
    }
}
