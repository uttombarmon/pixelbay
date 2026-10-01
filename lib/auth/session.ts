import "server-only";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema/schema";

export async function getCurrentUser() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return null;
    }

    const [user] = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
            image: users.image,
            role: users.role,
        })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

    return user ?? null;
}