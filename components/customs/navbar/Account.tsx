import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SignOutButton } from "../buttons/SignOutButton";
import { User, LayoutDashboard, ShoppingCart, CreditCard, LogOut, ShieldCheck } from "lucide-react";

const Account = async ({ user }: { user: any }) => {
  return (
    <div className="flex items-center">
      {user?.role === "admin" ? (
        <div className="flex items-center gap-3">
          <Link href="/seller" className="group flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full pl-1 pr-4 py-1 border border-transparent hover:border-red-200 dark:hover:border-red-900 transition-all duration-300">
            <Avatar className="h-8 w-8 ring-2 ring-transparent group-hover:ring-red-400 transition-all">
              <AvatarImage src={user?.image} alt={user?.name} className="object-cover" />
              <AvatarFallback className="bg-red-100 text-red-600 font-bold">
                {user?.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-red-600 flex items-center gap-1">
              Admin <ShieldCheck className="w-3 h-3" />
            </span>
          </Link>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1 hidden md:block"></div>
          <SignOutButton>
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500 hover:text-red-500">
              <LogOut className="w-5 h-5" />
            </div>
          </SignOutButton>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="h-10 w-10 ring-2 ring-transparent hover:ring-red-500 transition-all shadow-md">
              <AvatarImage src={user?.image} alt={user?.name} className="object-cover" />
              <AvatarFallback className="bg-red-100 text-red-600 font-extrabold">
                {user?.name?.[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 mt-2 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl">
            <DropdownMenuLabel className="px-4 py-3">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{user?.name}</span>
                <span className="text-xs text-gray-500 font-medium truncate">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800 mx-2" />

            <div className="p-1 space-y-0.5">
              <DropdownMenuItem className="rounded-xl focus:bg-red-50 dark:focus:bg-red-950/30 transition-colors cursor-pointer">
                <Link href="/dashboard" className="flex items-center gap-3 w-full py-2 px-2">
                  <LayoutDashboard className="w-4 h-4 text-red-600" />
                  <span className="font-semibold text-sm">Dashboard Overview</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="rounded-xl focus:bg-red-50 dark:focus:bg-red-950/30 transition-colors cursor-pointer">
                <Link href="/dashboard/profile" className="flex items-center gap-3 w-full py-2 px-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-sm">My Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="rounded-xl focus:bg-red-50 dark:focus:bg-red-950/30 transition-colors cursor-pointer">
                <Link href="/dashboard/mycart" className="flex items-center gap-3 w-full py-2 px-2">
                  <ShoppingCart className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-sm">Shopping Cart</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="rounded-xl focus:bg-red-50 dark:focus:bg-red-950/30 transition-colors cursor-pointer">
                <Link href="/dashboard/billing" className="flex items-center gap-3 w-full py-2 px-2">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-sm">Billing & Payments</span>
                </Link>
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800 mx-2" />

            <div className="p-1">
              <SignOutButton>
                <div className="flex items-center gap-3 w-full py-2.5 px-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 transition-all font-bold text-sm cursor-pointer">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </div>
              </SignOutButton>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Account;
