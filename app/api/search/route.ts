import { db } from "@/lib/db/drizzle";
import {
  products,
  categories,
  productVariants,
  productImages,
} from "@/lib/db/schema/schema";
import { ilike, eq, and, sql } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const s = searchParams.get("s") || "";
  // const category = searchParams.get("category");
  // const brand = searchParams.get("brand");

  const whereConditions = [];

  if (s) {
    const terms = s.split(/\s+/);
    const termConditions = terms.map((term) =>
      ilike(products.title, `%${term}%`)
    );
    whereConditions.push(and(...termConditions));
  }

  // if (category) {
  //   whereConditions.push(eq(products.category_id, Number(category)));
  // }

  // if (brand) {
  //   whereConditions.push(ilike(products.brand, `%${brand}%`));
  // }

  // const result = await db
  //   .select()
  //   .from(products)
  //   .where(whereConditions.length ? and(...whereConditions) : undefined);
  // .leftJoin(categories, eq(products.category_id, categories.id))
  const result = await db
    .select({
      id: products.id,
      title: products.title,
      slug: products.slug,
      price: productVariants.price,
      currency: productVariants.currency,
      image: sql`(SELECT url FROM ${productImages} WHERE ${productImages.product_id} = ${products.id} ORDER BY ${productImages.position} ASC LIMIT 1)`,
      category: categories.name,
    })
    .from(products)
    .leftJoin(productVariants, eq(productVariants.product_id, products.id))
    .leftJoin(categories, eq(categories.id, products.category_id))
    .where(and(...whereConditions))
    .groupBy(
      products.id,
      products.title,
      products.slug,
      productVariants.price,
      productVariants.currency,
      categories.name
    );

  return Response.json(result);
}
