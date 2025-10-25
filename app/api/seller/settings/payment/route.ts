// app/api/payment-methods/route.ts

import { db } from "@/lib/db/drizzle";
import { NextRequest, NextResponse } from "next/server";

import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";
import { paymentMethods } from "@/lib/db/schema/schema";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { methodType, provider, accountNumber, expiryDate, isDefault } = body;

    if (!methodType || !provider || !accountNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If user marks this as default, set all other methods to false
    if (isDefault) {
      await db
        .update(paymentMethods)
        .set({ isDefault: false })
        .where(eq(paymentMethods.userId, userId));
    }

    // Store new payment method
    const result = await db
      .insert(paymentMethods)
      .values({
        userId,
        methodType,
        provider,
        accountNumber,
        expiryDate: expiryDate || null,
        isDefault: isDefault || false,
      })
      .returning();

    return NextResponse.json(
      { message: "Payment method saved successfully", data: result[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving payment method:", error);
    return NextResponse.json(
      { error: "Failed to save payment method" },
      { status: 500 }
    );
  }
}
