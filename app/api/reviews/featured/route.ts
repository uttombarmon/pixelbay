import { db } from "@/lib/db/drizzle";
import {
    reviews as reviewsTable,
    users as usersTable,
    products as productsTable,
} from "@/lib/db/schema/schema";
import { NextResponse } from "next/server";
import { eq, desc, and } from "drizzle-orm";

export async function GET() {
    try {
        const featuredReviews = await db
            .select({
                id: reviewsTable.id,
                rating: reviewsTable.rating,
                title: reviewsTable.title,
                comment: reviewsTable.body,
                date: reviewsTable.created_at,
                userName: usersTable.name,
                userImage: usersTable.image,
                productName: productsTable.title,
                productSlug: productsTable.slug,
            })
            .from(reviewsTable)
            .innerJoin(usersTable, eq(reviewsTable.user_id, usersTable.id))
            .innerJoin(productsTable, eq(reviewsTable.product_id, productsTable.id))
            .where(eq(reviewsTable.is_public, true))
            .orderBy(desc(reviewsTable.rating), desc(reviewsTable.created_at))
            .limit(10);

        return NextResponse.json(featuredReviews, {
            status: 200,
            headers: {
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            },
        });
    } catch (err) {
        console.error("Error fetching featured reviews:", err);
        return NextResponse.json(
            { error: "Failed to fetch featured reviews", details: (err as Error).message },
            { status: 500 }
        );
    }
}
