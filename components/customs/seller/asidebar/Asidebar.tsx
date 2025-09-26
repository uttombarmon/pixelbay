"use client";
import React from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems = [
  { name: "Overview", href: "/seller", icon: Home },
  { name: "Products", href: "/seller/products", icon: Package },
  { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
  { name: "Customers", href: "/seller/customers", icon: Users },
  { name: "Earnings", href: "/seller/earnings", icon: DollarSign },
  { name: "Settings", href: "/seller/settings", icon: Settings },
];

const Asidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 border-r bg-muted/40 p-6">
      <h2 className="text-2xl font-bold mb-6">My Shop</h2>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-accent",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Asidebar;
