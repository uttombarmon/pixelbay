"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  User,
  LogOut,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { signOut } from "next-auth/react";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  // { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function UserSidebar() {
  const pathname = usePathname();
  const handleLogout = () => signOut();

  return (
    <Card className="h-full w-64 bg-white dark:bg-neutral-900 shadow-lg rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <CardContent className="p-4">
        <nav className="flex flex-col gap-2">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800",
                pathname === href
                  ? "bg-neutral-200 dark:bg-neutral-700 text-primary"
                  : "text-neutral-700 dark:text-neutral-300"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}

          <button
            className="mt-6 flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </CardContent>
    </Card>
  );
}
