"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

const FacebookSignIn = () => {
  const handleFacebookSignIn = async () => {
    await signIn("facebook");
  };
  return (
    <Button
      onClick={() => handleFacebookSignIn}
      variant="outline"
      className="w-full flex gap-2"
    >
      <span
        aria-hidden="true"
        className="flex size-5 items-center justify-center rounded-sm bg-[#1877F2] text-base font-bold leading-none text-white"
      >
        f
      </span>
      {/* <Image
        width={24}
        height={24}
        src={GIcon}
        alt="Google Icon"
        className=" size-5"
      /> */}
      Facebook
    </Button>
  );
};

export default FacebookSignIn;
