import { db } from "@/lib/db/drizzle";
import {
  products,
  categories,
  productVariants,
  productImages,
} from "@/lib/db/schema/schema";
import { ilike, eq, and, sql, gte, lte, desc, asc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const s = searchParams.get("s") || "";
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort");

    const whereConditions = [];

    // Search term filtering
    if (s) {
      const terms = s.split(/\s+/);
      const termConditions = terms.map((term) =>
        ilike(products.title, `%${term}%`)
      );
      whereConditions.push(and(...termConditions));
    }

    // Category filtering
    if (category) {
      // Assuming category is passed as a slug
      whereConditions.push(eq(categories.slug, category));
    }

    // Price range filtering
    if (minPrice) {
      whereConditions.push(gte(productVariants.price, parseFloat(minPrice)));
    }
    if (maxPrice) {
      whereConditions.push(lte(productVariants.price, parseFloat(maxPrice)));
    }

    // Default where condition (active products and variants)
    whereConditions.push(eq(products.status, "active"));
    whereConditions.push(eq(productVariants.status, "active"));

    // Sorting logic
    let orderBy: any = desc(products.created_at);
    if (sort === "price-asc") orderBy = asc(productVariants.price);
    else if (sort === "price-desc") orderBy = desc(productVariants.price);
    else if (sort === "newest") orderBy = desc(products.created_at);
    // Add popular sorting logic if there's a field for it, e.g., view_count or order_count

    const result = await db
      .select({
        id: products.id,
        title: products.title,
        slug: products.slug,
        price: sql<number>`${productVariants.price}::float`,
        compare_at_price: sql<number>`${productVariants.compare_at_price}::float`,
        discount: sql<number>`${productVariants.discount_percentage}::float`,
        variantId: productVariants.id,
        category: categories.name,
        productImage: sql<string>`(
          SELECT url 
          FROM product_images 
          WHERE product_images.product_id = products.id
          ORDER BY product_images.position ASC
          LIMIT 1
        )`.as("productImage"),
      })
      .from(products)
      .leftJoin(productVariants, eq(productVariants.product_id, products.id))
      .leftJoin(categories, eq(categories.id, products.category_id))
      .where(whereConditions.length ? and(...whereConditions) : undefined)
      .orderBy(orderBy)
      .limit(50); // Limit results for performance

    return Response.json(result);
  } catch (err) {
    console.error("Error in Search API:", err);
    return Response.json({ error: "Search failed" }, { status: 500 });
  }
}
