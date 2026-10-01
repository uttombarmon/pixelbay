
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { requireRole } from "@/lib/auth/guards";
import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema/schema";

export async function PATCH(req: Request) {
  // Authenticate and verify the current database role.
  const result = await requireRole(["seller", "admin"]);

  if (!result.ok) {
    return result.response;
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    Array.isArray(body)
  ) {
    return NextResponse.json(
      { error: "Request body must be a JSON object" },
      { status: 400 },
    );
  }

  const input = body as Record<string, unknown>;
  const updates: {
    name?: string | null;
    image?: string | null;
  } = {};

  if ("name" in input) {
    if (
      input.name !== null &&
      (typeof input.name !== "string" ||
        input.name.trim().length === 0 ||
        input.name.trim().length > 191)
    ) {
      return NextResponse.json(
        { error: "Name must be between 1 and 191 characters, or null" },
        { status: 400 },
      );
    }

    updates.name =
      typeof input.name === "string" ? input.name.trim() : null;
  }

  if ("image" in input) {
    if (input.image !== null && typeof input.image !== "string") {
      return NextResponse.json(
        { error: "Image must be a URL string or null" },
        { status: 400 },
      );
    }

    if (typeof input.image === "string") {
      const imageUrl = input.image.trim();

      if (imageUrl.length > 2048) {
        return NextResponse.json(
          { error: "Image URL is too long" },
          { status: 400 },
        );
      }

      try {
        const parsedUrl = new URL(imageUrl);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          throw new Error("Unsupported URL protocol");
        }
      } catch {
        return NextResponse.json(
          { error: "Image must be a valid HTTP or HTTPS URL" },
          { status: 400 },
        );
      }

      updates.image = imageUrl;
    } else {
      updates.image = null;
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "Provide at least one valid field: name or image" },
      { status: 400 },
    );
  }

  try {
    const [updatedUser] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, result.user.id))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
      });

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Failed to update seller profile", error);

    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}