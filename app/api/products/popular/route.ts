import { db } from "@/lib/db/drizzle";
import {
  productImages,
  products as productsTable,
  productVariants,
} from "@/lib/db/schema/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const response = await db
      .select({
        id: productsTable.id,
        title: productsTable.title,
        slug: productsTable.slug,
        productImage: productImages.url,
        status: productsTable.status,
        price: sql`MIN(${productVariants.price})`.as("price"),
      })
      .from(productsTable)
      .leftJoin(
        productVariants,
        eq(productVariants.product_id, productsTable.id)
      )
      .leftJoin(
        productImages,
        eq(productImages.product_id, productsTable.id)
      )
      .where(eq(productsTable.status, "active"))
      .groupBy(
        productsTable.id,
        productsTable.title,
        productsTable.slug,
        productsTable.status,
        productImages.url
      );
    if (response?.length > 0) {
      return NextResponse.json(response);
    }
    return NextResponse.json({ message: "Not Found!" }, { status: 202 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
