"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon, X, Zap } from "lucide-react";
import React from "react";
import MenuProducts from "./MenuProducts";
import { ModeToggle } from "@/components/themes/ChangeTheme";
import Link from "next/link";

function MenuContext({ session }: { session: any }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
          <MenuIcon className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="flex lg:hidden top-0 right-0 h-full w-[300px] bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800/50">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-red-600 text-white p-1.5 rounded-lg">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-black text-lg tracking-tight">PIXEL<span className="text-red-600">BAY</span></span>
            </Link>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <DrawerClose asChild>
                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-500 hover:text-red-600 rounded-full transition-all">
                  <X className="w-6 h-6" />
                </button>
              </DrawerClose>
            </div>
          </div>

          <DrawerTitle className="sr-only">Mobile Navigation Menu</DrawerTitle>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <MenuProducts session={session} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MenuContext;
