import { NextResponse } from "next/server";

import { db } from "@/lib/db/drizzle";
import { reviews } from "@/lib/db/schema/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";

// ✅ PATCH — Update a review
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const reviewId = Number(id);
  const { rating, body } = await req.json();
  if (!session.user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // if (!rating || rating < 1 || rating > 5)
  //   return NextResponse.json(
  //     { error: "Rating must be between 1 and 5" },
  //     { status: 400 }
  //   );
  try {
    // Update only if it's the user's own review
    const updated = await db
      .update(reviews)
      .set({ rating, body })
      .where(
        and(
          eq(reviews.id, reviewId),
          eq(reviews.user_id, session.user.id)
        )
      )
      .returning();

    if (!updated.length)
      return NextResponse.json(
        { error: "Review not found or not authorized" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, review: updated[0] });
  } catch (err) {
    console.error("❌ Error updating review:", err);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

// ✅ DELETE — Delete a review
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const reviewId = Number(id);
  if (!session.user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const deleted = await db
      .delete(reviews)
      .where(
        and(
          eq(reviews.id, reviewId),
          eq(reviews.user_id, session.user.id)
        )
      )
      .returning();

    if (!deleted.length)
      return NextResponse.json(
        { error: "Review not found or not authorized" },
        { status: 404 }
      );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting review:", err);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
