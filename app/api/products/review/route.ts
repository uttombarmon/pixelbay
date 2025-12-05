import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db/drizzle";
import { reviews, users } from "@/lib/db/schema/schema";
import { eq, desc } from "drizzle-orm";

// ✅ GET — Fetch all reviews or by product
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("product_id");

    const query = db
      .select({
        id: reviews.id,
        product_id: reviews.product_id,
        rating: reviews.rating,
        body: reviews.body,
        created_at: reviews.created_at,
        user: users.name,
      })
      .from(reviews)
      .leftJoin(users, eq(reviews.user_id, users.id))
      .orderBy(desc(reviews.created_at));

    if (productId) query.where(eq(reviews.product_id, Number(productId)));

    const result = await query;
    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ Error fetching reviews:", err);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST — Add a new review
export async function POST(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { product_id, rating, body } = await req.json();
    console.log("product_id:", product_id, "rating:", rating, "body:", body);

    if (!product_id || !rating || !body)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    if (!session.user.id)
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 400 }
      );

    const [newReview] = await db
      .insert(reviews)
      .values({
        product_id,
        user_id: session.user.id,
        rating,
        body,
        is_public: true,
      })
      .returning();

    return NextResponse.json({ success: true, review: newReview });
  } catch (err) {
    console.error("❌ Error creating review:", err);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
