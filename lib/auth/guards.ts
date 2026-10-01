import "server-only";

import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/session";
import {
    hasPermission,
    type Permission,
    type Role,
} from "@/lib/auth/permissions";

export type CurrentUser = NonNullable<
    Awaited<ReturnType<typeof getCurrentUser>>
>;

type GuardResult =
    | { ok: true; user: CurrentUser }
    | { ok: false; response: NextResponse };

export async function requireUser(): Promise<GuardResult> {
    const user = await getCurrentUser();

    if (!user) {
        return {
            ok: false,
            response: NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            ),
        };
    }

    return { ok: true, user };
}

export async function requireRole(
    allowedRoles: readonly Role[],
): Promise<GuardResult> {
    const result = await requireUser();

    if (!result.ok) {
        return result;
    }

    if (!allowedRoles.includes(result.user.role)) {
        return {
            ok: false,
            response: NextResponse.json(
                { error: "Forbidden" },
                { status: 403 },
            ),
        };
    }

    return result;
}

export async function requirePermission(
    permission: Permission,
): Promise<GuardResult> {
    const result = await requireUser();

    if (!result.ok) {
        return result;
    }

    if (!hasPermission(result.user.role, permission)) {
        return {
            ok: false,
            response: NextResponse.json(
                { error: "Forbidden" },
                { status: 403 },
            ),
        };
    }

    return result;
}