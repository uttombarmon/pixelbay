"use client";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import type { ReactNode } from "react";

export const SignOutButton = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  const handleSignOut = async () => {
    signOut();
  };
  return (
    <button
      className={cn(
        "cursor-pointer m-0 p-0 flex gap-2 font-semibold text-base hover:text-red-500 hover:underline hover:bg-gray-500/25 rounded-sm px-2 py-1 items-center text-center",
        className
      )}
      title="Sign Out"
      onClick={handleSignOut}
    >
      {children}
      <LogOutIcon />
    </button>
  );
};
