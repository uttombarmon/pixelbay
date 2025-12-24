import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";
import { SignOutButton } from "../../buttons/SignOutButton";
import SearchField from "../Search";
import {
  Flame,
  Zap,
  Smartphone,
  Monitor,
  Gamepad2,
  Tv,
  Camera,
  ChevronRight,
  LogOut,
  Search
} from "lucide-react";

const MenuProducts = async ({ session }: { session: any }) => {
  return (
    <div className="flex flex-col min-h-full pb-10">
      {/* Mobile Search - Prominent at the top */}
      <div className="px-6 pt-2 pb-6">
        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 border border-transparent focus-within:border-red-500/50 transition-all">
          <Search className="w-5 h-5 text-gray-400" />
          <SearchField />
        </div>
      </div>

      <div className="flex-1 px-6">
        <nav className="space-y-8">
          {/* Section: Discovery */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 px-2">Discovery</h4>
            <ul className="space-y-1">
              <MobileNavLink href="/search?s=hot-products" icon={<Flame className="w-4 h-4 text-orange-500" />} label="Hot Products" />
              <MobileNavLink href="/search?s=latest-products" icon={<Zap className="w-4 h-4 text-blue-500" />} label="New Arrivals" />
            </ul>
          </div>

          {/* Section: Categories */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 px-2">Shop by Category</h4>
            <div className="space-y-1">
              <MobileMenuCollapse
                label="Mobile & Tech"
                icon={<Smartphone className="w-4 h-4 text-red-500" />}
                items={[
                  { label: "Smartphones", href: "/search?s=smartphones" },
                  { label: "iPads & Tablets", href: "/search?s=ipads" },
                  { label: "Accessories", href: "/search?s=smartphones-accessories" },
                ]}
              />
              <MobileMenuCollapse
                label="Computers"
                icon={<Monitor className="w-4 h-4 text-indigo-500" />}
                items={[
                  { label: "Laptops", href: "/search?s=laptops" },
                  { label: "Desktops", href: "/search?s=computers" },
                  { label: "PC Components", href: "/search?s=computer-laptop-accessories" },
                ]}
              />
              <MobileNavLink href="/search?s=gaming-gadgets" icon={<Gamepad2 className="w-4 h-4 text-emerald-500" />} label="Gaming & Gear" />
              <MobileNavLink href="/search?s=entartainment-electronics" icon={<Tv className="w-4 h-4 text-amber-500" />} label="Entertainment" />
              <MobileNavLink href="/search?s=camera-drones" icon={<Camera className="w-4 h-4 text-purple-500" />} label="Camera & Drones" />
            </div>
          </div>
        </nav>
      </div>

      {/* User Area footer */}
      <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 mt-10 mx-4 rounded-3xl">
        {session?.user ? (
          <div className="space-y-4">
            <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all group">
              <Avatar className="h-12 w-12 ring-2 ring-white dark:ring-gray-700 shadow-sm transition-all group-hover:ring-red-400">
                <AvatarImage src={session.user.image} className="object-cover" />
                <AvatarFallback className="bg-red-100 text-red-600 font-bold">
                  {session.user.name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{session.user.name}</span>
                <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                  View Dashboard <ChevronRight className="w-2 h-2" />
                </span>
              </div>
            </Link>
            <SignOutButton>
              <div className="flex items-center gap-3 w-full py-3 px-4 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all font-bold text-xs uppercase tracking-widest cursor-pointer">
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </div>
            </SignOutButton>
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="flex items-center justify-center w-full rounded-2xl bg-gray-900 dark:bg-red-600 py-4 text-sm font-bold text-white hover:bg-red-700 transition-all shadow-lg shadow-red-500/10"
          >
            Sign In to PixelBay
          </Link>
        )}
      </div>
    </div>
  );
};

const MobileNavLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link
    href={href}
    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-all group"
  >
    <span className="opacity-70 group-hover:opacity-100 transition-opacity">{icon}</span>
    {label}
  </Link>
);

const MobileMenuCollapse = ({ label, icon, items }: { label: string; icon: React.ReactNode; items: { label: string; href: string }[] }) => (
  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-bold"> {label} </span>
      </div>
      <ChevronRight className="w-4 h-4 shrink-0 transition duration-300 group-open:rotate-90 text-gray-400" />
    </summary>
    <ul className="mt-2 space-y-1 ml-11 border-l border-gray-100 dark:border-gray-800">
      {items.map((item, id) => (
        <li key={id}>
          <Link
            href={item.href}
            className="block px-4 py-2 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </details>
);

export default MenuProducts;
