import React from "react";
import { NavigationMenuDemo } from "./MiddleNav";
import Account from "./Account";
import { ModeToggle } from "@/components/themes/ChangeTheme";
import { auth } from "@/lib/auth/auth";
import { Button } from "@/components/ui/button";
import SearchBox from "./SearchBox";
import MenuContext from "./menu_button/MenuContext";
import Link from "next/link";

async function TopNavBar() {
  const session = await auth();
  const u_name = session?.user?.name || "user";
  const image =
    session?.user?.image ||
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  return (
    <div className="w-full h-16 flex items-center justify-between px-4 border-b border-gray-300 dark:border-gray-700">
      {/* logo */}
      <div className=" font-bold text-2xl font-sans">
        <Link href={"/"}>
          {" "}
          <i>
            Pixel<span className=" text-red-400">Bay</span>
          </i>
        </Link>
      </div>
      {/* middle nav  */}
      <div className=" hidden lg:flex">
        <NavigationMenuDemo></NavigationMenuDemo>
      </div>
      {/* right side */}
      <div className=" hidden lg:flex items-center gap-4 justify-between">
        {/* search field  */}
        <SearchBox />
        {session?.user ? (
          <Account image={image} />
        ) : (
          <Button variant="outline" size="sm" asChild>
            <a href="/signin">Sign In</a>
          </Button>
        )}
        <ModeToggle />
      </div>
      {/* mobile screen menu button and context */}
      <div className=" lg:hidden flex items-center gap-2">
        <MenuContext session={session} />
      </div>
    </div>
  );
}

export default TopNavBar;
