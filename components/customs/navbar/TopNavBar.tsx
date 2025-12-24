import React from "react";
import { NavigationMenuDemo } from "./MiddleNav";
import Account from "./Account";
import { ModeToggle } from "@/components/themes/ChangeTheme";
import { auth } from "@/lib/auth/auth";
import { Button } from "@/components/ui/button";
import SearchBox from "./SearchBox";
import MenuContext from "./menu_button/MenuContext";
import Link from "next/link";
import { getAllCategories } from "@/lib/apiClients/categorie";
import { Cpu } from "lucide-react";

async function TopNavBar() {
  const session = await auth();
  const user = session?.user;
  const categories = await getAllCategories();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto h-16 md:h-20 flex items-center justify-between px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-4 lg:gap-8">
          <Link href="/" className="group flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-500 to-red-700 text-white p-1.5 md:p-2 rounded-xl shadow-lg shadow-red-500/20 group-hover:scale-110 transition-all duration-300">
              <Cpu className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
              PIXEL<span className="text-red-600">BAY</span>
            </span>
          </Link>

          {/* middle nav (Desktop) */}
          <div className="hidden lg:block ml-4">
            <NavigationMenuDemo categories={categories} />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Desktop/Tablet Search */}
          <div className="hidden md:flex items-center bg-gray-100/50 dark:bg-gray-800/50 rounded-full px-4 py-1.5 border border-transparent focus-within:border-red-500/50 transition-all duration-300">
            <SearchBox />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:block">
              <ModeToggle />
            </div>

            {session?.user ? (
              <div className="flex items-center">
                <Account user={user} />
              </div>
            ) : (
              <div className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors font-semibold"
                  asChild
                >
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu & Right-side controls */}
            <div className="flex items-center">
              <MenuContext session={session} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavBar;
