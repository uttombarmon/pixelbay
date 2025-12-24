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
        const newArrivals = await db
            .select({
                id: productsTable.id,
                title: productsTable.title,
                slug: productsTable.slug,
                brand: productsTable.brand,
                gadgetType: productsTable.gadgetType,
                variantId: sql<number>`(
          SELECT id
          FROM product_variants
          WHERE product_variants.product_id = products.id
          ORDER BY price ASC
          LIMIT 1
        )`.as("variantId"),
                price: sql<number>`(
          SELECT MIN(price)::float
          FROM product_variants 
          WHERE product_variants.product_id = products.id
        )`.as("price"),
                productImage: sql<string>`(
          SELECT url 
          FROM product_images 
          WHERE product_images.product_id = products.id
          ORDER BY product_images.position ASC
          LIMIT 1
        )`.as("productImage"),
                created_at: productsTable.created_at,
            })
            .from(productsTable)
            .where(eq(productsTable.status, "active"))
            .orderBy(desc(productsTable.created_at))
            .limit(20);

        return NextResponse.json(newArrivals, {
            status: 200,
            headers: {
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            },
        });
    } catch (err) {
        console.error("Error fetching new arrivals:", err);
        return NextResponse.json(
            { error: "Failed to fetch new arrivals", details: (err as Error).message },
            { status: 500 }
        );
    }
}
