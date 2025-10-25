import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user?.id;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, image } = await req.json();

  try {
    const updatedUser = await db
      .update(users)
      .set({
        name,
        image,
      })
      .where(eq(users.id, userId))
      .returning();
    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
