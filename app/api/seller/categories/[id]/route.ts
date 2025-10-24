import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { categories } from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";

// PUT (Update) a category by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Basic validation
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    const updatedCategory = await db
      .update(categories)
      .set({
        name: body.name,
        slug: body.slug,
        path: body.path,
        metadata: body.metadata,
      })
      .where(eq(categories.id, id))
      .returning();

    if (updatedCategory.length === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCategory[0], { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE a category by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }
    await db.delete(categories).where(eq(categories.id, id));
    return NextResponse.json({ message: "Category deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
