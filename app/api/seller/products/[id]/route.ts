import { db } from "@/lib/db/drizzle";
import {
  products,
  categories,
  productImages,
  productVariants,
} from "@/lib/db/schema/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!session || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Fetch the product along with its images and variants
    const productRows = await db
      .select()
      .from(products)
      .where(and(eq(products.id, productId), eq(products.created_by, userId)));

    if (!productRows || productRows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productData = productRows[0];

    const images = await db
      .select()
      .from(productImages)
      .where(eq(productImages.product_id, productId))
      .orderBy(productImages.position);

    const variants = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.product_id, productId));

    const product = {
      id: Number(productData.id),
      title: productData.title,
      slug: productData.slug,
      short_description: productData.short_description,
      description: productData.description,
      brand: productData.brand,
      category_id: productData.category_id,
      status: productData.status,
      visibility: productData.visibility,
      attributes: productData.attributes || {},
      images,
      variants,
    };

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const role = session?.user?.role;
  const userId = session?.user?.id;
  if (
    !session ||
    typeof role !== "string" ||
    !["admin", "seller"].includes(role) ||
    typeof userId !== "string"
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const productId = Number(id);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { images, variants, created_at, updated_at, ...productData } = body;
    delete productData.created_at;
    delete productData.updated_at;
    let clearVariants;
    if (variants) {
      clearVariants = variants.map((v: any) => {
        delete v.created_at;
        delete v.updated_at;
        return v;
      });
    }
    // Update product
    const updatedProduct = await db
      .update(products)
      .set({ ...productData, updated_at: new Date() })
      .where(and(eq(products.id, productId), eq(products.created_by, userId)))
      .returning();

    if (updatedProduct.length === 0) {
      return NextResponse.json(
        {
          error: "Product not found or you do not have permission to edit it.",
        },
        { status: 404 }
      );
    }

    // Update images
    await db
      .delete(productImages)
      .where(eq(productImages.product_id, productId));
    if (images && images.length > 0) {
      await db.insert(productImages).values(
        images.map((img: { url: string; alt: string }, index: number) => ({
          product_id: productId,
          url: img.url,
          alt: img.alt,
          position: index,
        }))
      );
    }

    // Update variants
    await db
      .delete(productVariants)
      .where(eq(productVariants.product_id, productId));
    if (variants && variants.length > 0) {
      await db.insert(productVariants).values(
        variants.map((variant: any) => ({
          ...variant,
          product_id: productId,
        }))
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const role = session?.user?.role;
  const userId = session?.user?.id;
  if (
    !session ||
    typeof role !== "string" ||
    !["admin", "seller"].includes(role) ||
    typeof userId !== "string"
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    await db
      .delete(products)
      .where(and(eq(products.id, productId), eq(products.created_by, userId)));

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
