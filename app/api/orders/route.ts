import { db } from "@/lib/db/drizzle";
import { orders } from "@/lib/db/schema/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    try {
        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        const userOrders = await db
            .select()
            .from(orders)
            .where(eq(orders.user_id, userId))
            .orderBy(desc(orders.created_at));

        return NextResponse.json({ orders: userOrders }, { status: 200 });
    } catch (error) {
        console.error("Orders API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error },
            { status: 500 }
        );
    }
}
