import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  try {
    if (userId) {
      const user = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
          role: users.role,
        })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1)
        .then((rows) => rows[0]);
      return NextResponse.json({ user: user }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Couldn't find user id! in url" },
        { status: 406 }
      );
    }
  } catch (error) {
    console.log("User Get Error: ", error);
    return NextResponse.json(
      { message: "Something happend in server!", error: error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const reqData = await req.json();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!reqData) {
    console.log("User Patch Error: Not Found Update data");
    return NextResponse.json(
      { message: "Something happend in server!" },
      { status: 500 }
    );
  }
  try {
    if (!userId) {
      console.log("User Patch Error: userId not found in URL");
      return NextResponse.json(
        { message: "Couldn't find user id! in url" },
        { status: 406 }
      );
    }
    const [updatedUser] = await db
      .update(users)
      .set(reqData)
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
      });
    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.log("User Patch Error: ", error);
    return NextResponse.json(
      { message: "Something happend in server!", error: error },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    if (!userId) {
      console.log("User Patch Error: userId not found in URL");
      return NextResponse.json(
        { message: "Couldn't find user id! in url" },
        { status: 406 }
      );
    }
    await db.delete(users).where(eq(users.id, userId));
    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.log("User Patch Error: ", error);
    return NextResponse.error();
  }
}
