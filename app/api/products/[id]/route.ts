import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import {
  products,
  productImages,
  productVariants,
  categories,
  reviews,
  techSpecifications,
} from "@/lib/db/schema/schema";
import { and, eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (
      !/^\d+$/.test(id) ||
      !Number.isSafeInteger(productId) ||
      productId <= 0
    ) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 },
      );
    }

    // Fetch the main product info
    const product = await db.query.products.findFirst({
      where: and(
        eq(products.id, productId),
        eq(products.status, "active"),
        eq(products.visibility, "visible"),
      ),
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    // Fetch tech specs if available
    let techSpecs = null;
    if (product.techSpecId) {
      techSpecs = await db.query.techSpecifications.findFirst({
        where: eq(techSpecifications.id, product.techSpecId),
      });
    }

    // Fetch related data in parallel for performance
    const [images, variants, category, reviewsList] = await Promise.all([
      db.query.productImages.findMany({
        where: eq(productImages.product_id, productId),
        orderBy: (fields, { asc }) => [asc(fields.position)],
      }),
      db.query.productVariants.findMany({
        where: and(
          eq(productVariants.product_id, productId),
          eq(productVariants.status, "active"),
          eq(productVariants.visibility, "visible"),
        ),
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
      techSpecs,
    };

    return NextResponse.json(fullProductData, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}
