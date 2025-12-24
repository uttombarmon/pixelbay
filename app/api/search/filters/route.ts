import { db } from "@/lib/db/drizzle";
import {
    products,
    categories,
    productVariants,
} from "@/lib/db/schema/schema";
import { eq, sql, and } from "drizzle-orm";

export async function GET() {
    try {
        // 1. Get unique brands with counts
        const brandsResult = await db
            .select({
                brand: products.brand,
                count: sql<number>`count(*)`,
            })
            .from(products)
            .where(eq(products.status, "active"))
            .groupBy(products.brand)
            .orderBy(sql`count(*) DESC`);

        // 2. Get categories with counts
        const categoriesResult = await db
            .select({
                id: categories.id,
                name: categories.name,
                slug: categories.slug,
                count: sql<number>`count(*)`,
            })
            .from(categories)
            .leftJoin(products, eq(products.category_id, categories.id))
            .where(and(eq(products.status, "active")))
            .groupBy(categories.id, categories.name, categories.slug)
            .orderBy(categories.name);

        // 3. Get price min/max
        const priceMetaResult = await db
            .select({
                minPrice: sql<number>`MIN(${productVariants.price})::float`,
                maxPrice: sql<number>`MAX(${productVariants.price})::float`,
            })
            .from(productVariants)
            .where(eq(productVariants.status, "active"));

        const conditionCounts = await db
            .select({
                condition: products.condition,
                count: sql<number>`count(*)`,
            })
            .from(products)
            .where(eq(products.status, "active"))
            .groupBy(products.condition);

        return Response.json({
            brands: brandsResult.filter(b => b.brand !== null),
            categories: categoriesResult,
            conditions: conditionCounts,
            price: priceMetaResult[0] || { minPrice: 0, maxPrice: 10000 },
        });
    } catch (err) {
        console.error("Error in Search Filters API:", err);
        return Response.json({ error: "Failed to fetch filter metadata" }, { status: 500 });
    }
}
