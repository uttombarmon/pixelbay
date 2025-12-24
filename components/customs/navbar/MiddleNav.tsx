"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { ChevronRight, Sparkles, Smartphone, Monitor, Gamepad2, Tv, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, any> = {
  "Mobile & Accessories": <Smartphone className="w-4 h-4" />,
  "Computers & Accessories": <Monitor className="w-4 h-4" />,
  "Gaming Gadgets": <Gamepad2 className="w-4 h-4" />,
  "Entertainment Electronics": <Tv className="w-4 h-4" />,
  "Others": <LayoutGrid className="w-4 h-4" />,
};

export function NavigationMenuDemo({ categories }: { categories: any }) {
  const [categoriess, setCategoriess] = useState<any[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    const safeCategories = Array.isArray(categories) ? categories : [];
    const mainCategories = safeCategories.filter(c => c?.name?.toLowerCase() !== "others");
    const othersCategory = safeCategories.find(c => c?.name?.toLowerCase() === "others");

    let visible = [];
    if (windowWidth > 1400) {
      visible = mainCategories.slice(0, 5);
    } else if (windowWidth > 1200) {
      visible = mainCategories.slice(0, 4);
    } else if (windowWidth > 1024) {
      visible = mainCategories.slice(0, 2);
    }

    if (othersCategory) visible.push(othersCategory);
    setCategoriess(visible);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth, categories]);

  return (
    <NavigationMenu viewport={false} className="hidden lg:block">
      <NavigationMenuList className="gap-1">
        {categoriess.length >= 1 ? (
          categoriess.map((category: any) => (
            <NavigationMenuItem key={category?.id || category?.name}>
              <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-semibold rounded-full px-4 h-11">
                <span className="flex items-center gap-2">
                  {categoryIcons[category?.name] || <Sparkles className="w-4 h-4 text-red-500" />}
                  {category?.name}
                </span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-6 grid-cols-2 bg-white dark:bg-gray-950 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
                  {category?.metadata?.children?.map((item: any) => (
                    <ListItem
                      key={item?.slug}
                      href={item?.path || `/search?s=${item?.slug}`}
                      title={item?.name}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))
        ) : (
          /* Fallback static menu for better UX when API is slow/empty */
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent font-semibold rounded-full h-11">
                <span className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-500" />
                  Mobile & Tech
                </span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-6 grid-cols-2">
                  <ListItem href="/search?s=smartphone" title="Smartphones" />
                  <ListItem href="/search?s=tablet+ipad" title="Tablets & iPads" />
                  <ListItem href="/search?s=smartwatch" title="Smartwatches" />
                  <ListItem href="/search?s=phone+case" title="Accessories" />
                  <ListItem href="/search?s=earbuds" title="Wireless Audio" />
                  <ListItem href="/search?s=power+bank" title="Power Solutions" />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent font-semibold rounded-full h-11">
                <span className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-purple-500" />
                  Computing
                </span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-6 grid-cols-2">
                  <ListItem href="/search?s=laptop" title="Laptops" />
                  <ListItem href="/search?s=gaming+laptop" title="Gaming Rigs" />
                  <ListItem href="/search?s=monitor" title="Monitors" />
                  <ListItem href="/search?s=keyboard" title="Peripherals" />
                  <ListItem href="/search?s=gpu" title="Components" />
                  <ListItem href="/search?s=external+ssd" title="Storage" />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent font-semibold rounded-full h-11">
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-emerald-500" />
                  Gaming
                </span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-6 grid-cols-2">
                  <ListItem href="/search?s=gaming+console" title="Consoles" />
                  <ListItem href="/search?s=vr+headset" title="VR/AR" />
                  <ListItem href="/search?s=gaming+controller" title="Controllers" />
                  <ListItem href="/search?s=gaming+headset" title="Headsets" />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function ListItem({
  title,
  children,
  href,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; title: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-2xl p-4 leading-none no-underline outline-none transition-all duration-300 group hover:bg-red-50 dark:hover:bg-red-950/20",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none flex items-center justify-between group-hover:text-red-600 transition-colors">
            {title}
            <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </div>
          {children && (
            <p className="line-clamp-2 text-xs leading-snug text-gray-500 dark:text-gray-400 mt-1.5">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
