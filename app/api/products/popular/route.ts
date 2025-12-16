import { db } from "@/lib/db/drizzle";
import {
  productImages,
  products as productsTable,
  productVariants,
} from "@/lib/db/schema/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, sql, and, asc, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    // Fetch products with their minimum price and first image only
    const popularProducts = await db
      .select({
        id: productsTable.id,
        title: productsTable.title,
        slug: productsTable.slug,
        brand: productsTable.brand,
        gadgetType: productsTable.gadgetType,
        status: productsTable.status,
        // Get minimum price from variants using raw SQL
        variantId: sql<string>`(
          SELECT id
          FROM product_variants
          WHERE product_variants.product_id = products.id
          ORDER BY price ASC
          LIMIT 1
        )`.as("variantId"),
        price: sql<string>`(
          SELECT MIN(price)::text
          FROM product_variants 
          WHERE product_variants.product_id = products.id
        )`.as("price"),
        // Get first image URL (by position) using raw SQL
        productImage: sql<string>`(
          SELECT url 
          FROM product_images 
          WHERE product_images.product_id = products.id
          ORDER BY product_images.position ASC
          LIMIT 1
        )`.as("productImage"),
      })
      .from(productsTable)
      .where(eq(productsTable.status, "active"))
      .orderBy(desc(productsTable.created_at))
      .limit(20); // Limit to 20 popular products for performance

    // console.log("Fetched popular products:", popularProducts.length);
    
    // Log first product to debug
    // if (popularProducts.length > 0) {
    //   console.log("First product sample:", JSON.stringify(popularProducts[0], null, 2));
    // }

    if (popularProducts && popularProducts.length > 0) {
      return NextResponse.json(popularProducts, { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    }

    return NextResponse.json(
      { message: "No products found" },
      { status: 404 }
    );
  } catch (err) {
    console.error("Error fetching popular products:", err);
    return NextResponse.json(
      { error: "Failed to fetch products", details: (err as Error).message },
      { status: 500 }
    );
  }
}
