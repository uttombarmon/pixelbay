"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import GIcon from "@/public/google-color-icon.svg";
import Image from "next/image";

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    const res = await signIn("google");
    console.log(res);
  };
  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="outline"
      className="w-full flex gap-2"
    >
      <Image
        width={24}
        height={24}
        src={GIcon}
        alt="Google Icon"
        className=" size-5"
      />
      Google
    </Button>
  );
};

export default GoogleSignIn;
