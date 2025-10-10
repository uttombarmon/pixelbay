"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import React from "react";

export const SignOutButton = ({ children }: { children: string }) => {
  const handleSignOut = async () => {
    signOut();
  };
  return (
    <Button
      className="cursor-pointer m-0 p-0"
      variant="ghost"
      title="Sign Out"
      size="icon"
      onClick={handleSignOut}
    >
      {children}
      <LogOutIcon />
    </Button>
  );
};
