import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon, XIcon } from "lucide-react";
import React from "react";
import MenuProducts from "./MenuProducts";

function MenuContext({session}: {session: any}) {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <MenuIcon className=" w-6 h-6 text-gray-800 dark:text-gray-200" />
      </DrawerTrigger>

      <DrawerContent className=" top-0 dark:bg-gray-100 bg-gray-900 text-gray-700">
        <div className=" p-2">
          <DrawerClose title="Close">
            <XIcon className=" w-6 h-6 text-red-400 dark:text-red-400" />
          </DrawerClose>
        </div>
        <DrawerTitle className=" dark:text-gray-700 text-xl font-bold pl-4">
          Menu
        </DrawerTitle>
        <div>
          <MenuProducts session={session}/>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MenuContext;
