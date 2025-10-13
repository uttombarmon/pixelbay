import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import {
  products,
  productImages,
  productVariants,
  categories,
  reviews,
} from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";
interface RouteContext {
  params: {
    id: string;
  };
}
export async function GET(
  req: Request,
  context: RouteContext
): Promise<NextResponse<any>> {
  try {
    const productId = parseInt(context.params.id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Fetch the main product info
    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Fetch related data in parallel for performance
    const [images, variants, category, reviewsList] = await Promise.all([
      db.query.productImages.findMany({
        where: eq(productImages.product_id, productId),
        orderBy: (fields, { asc }) => [asc(fields.position)],
      }),
      db.query.productVariants.findMany({
        where: eq(productVariants.product_id, productId),
      }),
      product.category_id
        ? db.query.categories.findFirst({
            where: eq(categories.id, product.category_id),
          })
        : null,
      db.query.reviews.findMany({
        where: eq(reviews.product_id, productId),
      }),
    ]);

    // Combine all data
    const fullProductData = {
      ...product,
      images,
      variants,
      category,
      reviews: reviewsList,
    };

    return NextResponse.json(fullProductData, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
