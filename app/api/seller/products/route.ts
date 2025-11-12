import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import {
  products as productsTable,
  productImages,
  categories,
  products,
  productVariants,
} from "@/lib/db/schema/schema";
import { and, eq, gt, gte, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }
    console.log("UserId: ", userId);

    // Fetch products created by this user (seller)
    const productList = await db
      .select({
        id: productsTable.id,
        title: productsTable.title,
        slug: productsTable.slug,
        status: productsTable.status,
        price: sql`MIN(${productVariants.price})`.as("price"),
        variants: sql<any>`json_agg(${productVariants})`.as("variants"),
        visibility: productsTable.visibility,
        category_id: productsTable.category_id,
        created_by: productsTable.created_by,
        created_at: productsTable.created_at,
        updated_at: productsTable.updated_at,
      })
      .from(productsTable)
      .leftJoin(
        productVariants,
        eq(productVariants.product_id, productsTable.id)
      )
      .where(eq(productsTable.created_by, userId))
      .groupBy(
        productsTable.id,
        productsTable.title,
        productsTable.slug,
        productsTable.status,
        productsTable.visibility,
        productsTable.category_id,
        productsTable.created_by,
        productsTable.created_at,
        productsTable.updated_at
      );

    if (productList.length === 0) {
      return NextResponse.json({ error: "Not Found Data" }, { status: 404 });
    }

    // Fetch images and category names
    const results = await Promise.all(
      productList.map(async (product) => {
        const images = await db
          .select({ url: productImages.url })
          .from(productImages)
          .where(eq(productImages.product_id, product.id));

        const category = product.category_id
          ? await db
              .select({ name: categories.name })
              .from(categories)
              .where(eq(categories.id, product.category_id))
              .then((res) => res[0]?.name || null)
          : null;

        return {
          ...product,
          images: images.map((img) => img.url),
          categoryName: category,
        };
      })
    );

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = req.nextUrl.searchParams.get("userId");
  console.log("slug: ", body?.slug);
  if (userId) {
    const newProduct = await db
      .insert(products)
      .values({
        title: body.title,
        slug: body.slug,
        short_description: body.short_description,
        description: body.description,
        brand: body.brand,
        category_id: body.category_id,
        status: body.status,
        visibility: body.visibility,
        attributes: body.attributes,
        created_by: userId,
      })
      .returning();

    // Insert images
    if (body.images?.length) {
      await db.insert(productImages).values(
        body.images.map((img: any) => ({
          product_id: newProduct[0].id,
          url: img.url,
          alt: img.alt,
        }))
      );
    }

    // Insert variants
    if (body.variants?.length) {
      await db.insert(productVariants).values(
        body.variants.map((v: any) => ({
          product_id: newProduct[0].id,
          sku: v.sku,
          title: v.title,
          price: v.price,
          stock: v.stock,
          attributes: v.attributes,
        }))
      );
    }
    return NextResponse.json({
      message: "Product created",
      product: newProduct[0],
    });
  } else {
    return NextResponse.json(
      {
        message: "Product create failed",
      },
      { status: 403 }
    );
  }
}
