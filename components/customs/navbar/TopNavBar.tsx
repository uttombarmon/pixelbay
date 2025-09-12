import React from "react";
import { NavigationMenuDemo } from "./MiddleNav";
import Account from "./Account";
import { ModeToggle } from "@/components/themes/ChangeTheme";
import { auth } from "@/lib/auth/auth";
import { Button } from "@/components/ui/button";

async function TopNavBar() {
  const session = await auth();
  const image =
    session?.user?.image ||
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  return (
    <div className="w-full h-16 flex items-center justify-between px-4 border-b border-gray-300 dark:border-gray-700">
      {/* logo */}
      <div className=" font-bold text-2xl font-sans">
        <i>
          Pixel<span className=" text-red-400">Bay</span>
        </i>
      </div>
      {/* middle nav  */}
      <div className=" hidden md:flex">
        <NavigationMenuDemo></NavigationMenuDemo>
      </div>
      <div className=" flex items-center gap-4">
        {session?.user ? (
          <Account image={image} />
        ) : (
          <Button variant="outline" size="sm" asChild>
            <a href="/signin">Sign In</a>
          </Button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}

export default TopNavBar;
