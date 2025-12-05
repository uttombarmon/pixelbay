import { NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { categories } from "@/lib/db/schema/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const allCategories = await db
      .select()
      .from(categories)
      .orderBy(asc(categories.id));
    // console.log("all categories:", allCategories);
    return NextResponse.json(allCategories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
// POST new category
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    const [newCategory] = (await db
      .insert(categories)
      .values({
        name: body.name,
        slug: body.slug,
        path: body.path || null,
        metadata: body.metadata || {},
      })
      .returning()) as any[];

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
