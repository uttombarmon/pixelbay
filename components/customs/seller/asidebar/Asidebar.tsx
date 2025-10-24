"use client";

import React, { useState } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Settings,
  Menu,
  X,
  LayoutGrid,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "../../buttons/SignOutButton";

const navItems = [
  { name: "Overview", href: "/seller", icon: Home },
  { name: "Products", href: "/seller/products", icon: Package },
  { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
  { name: "Customers", href: "/seller/customers", icon: Users },
  { name: "Earnings", href: "/seller/earnings", icon: DollarSign },
  { name: "Settings", href: "/seller/settings", icon: Settings },
  { name: "Categories", href: "/seller/categories", icon: LayoutGrid },
];

const Asidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b bg-background">
        <h2 className="text-xl font-bold">My Shop</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static top-0 left-0 h-full lg:h-auto w-64 border-r bg-muted/40 p-6 z-50 transform transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <h2 className="text-2xl font-bold mb-6 hidden lg:block">My Shop</h2>
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
              onClick={() => setOpen(false)} // close on mobile click
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
          <li className="flex items-center gap-3 rounded-lg pl-8 py-2 text-sm font-medium transition hover:bg-accent">
            <SignOutButton>SignOut</SignOutButton>
          </li>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Asidebar;
