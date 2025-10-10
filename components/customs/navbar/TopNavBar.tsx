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

async function TopNavBar() {
  const session = await auth();
  const user = session?.user;
  const u_name = user?.name || "user";
  const categories = await getAllCategories();
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
        <NavigationMenuDemo categories={categories}></NavigationMenuDemo>
      </div>
      {/* right side */}
      <div className=" hidden lg:flex items-center gap-4 justify-between">
        {/* search field  */}
        <SearchBox />
        {session?.user ? (
          <Account user={user} />
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/signin">Sign In</Link>
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
