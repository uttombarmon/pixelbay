"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

export const SignOutButton = ({ children }: { children?: string }) => {
  const handleSignOut = async () => {
    signOut();
  };
  return (
    <button
      className="cursor-pointer m-0 p-0 flex gap-2 font-semibold text-base hover:text-red-500 hover:underline hover:bg-gray-500/25 rounded-sm px-2 py-1 items-center text-center"
      title="Sign Out"
      onClick={handleSignOut}
    >
      {children}
      <LogOutIcon />
    </button>
  );
};
