export const roles = ["user", "seller", "admin"] as const;

export type Role = (typeof roles)[number];

export const permissions = {
  user: ["profile:read", "orders:read"],

  seller: [
    "profile:read",
    "orders:read",
    "products:create",
    "products:update",
    "products:delete",
  ],

  admin: ["*"],
} as const;

export type Permission =
  | "profile:read"
  | "orders:read"
  | "products:create"
  | "products:update"
  | "products:delete";

export function hasPermission(
  role: Role,
  permission: Permission,
): boolean {
  const rolePermissions: readonly string[] = permissions[role];

  return (
    rolePermissions.includes("*") ||
    rolePermissions.includes(permission)
  );
}