import { db } from "@/lib/db/drizzle";
import { categories } from "@/lib/db/schema/schema";
import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";

export async function GET() {
    try {
        const allCategories = await db
            .select()
            .from(categories)
            .orderBy(asc(categories.name));

        return NextResponse.json(allCategories, {
            status: 200,
            headers: {
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
            },
        });
    } catch (err) {
        console.error("Error fetching categories:", err);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
