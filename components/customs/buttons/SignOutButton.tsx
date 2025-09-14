"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import React from "react";

export const SignOutButton = () => {
  const handleSignOut = async () => {
    signOut();
  };
  return (
    <Button
      variant="ghost"
      title="Sign Out"
      size="icon"
      onClick={handleSignOut}
    >
      <LogOutIcon />
    </Button>
  );
};
