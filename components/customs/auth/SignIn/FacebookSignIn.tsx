"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import GIcon from "@/public/google-color-icon.svg";
import Image from "next/image";
import { FacebookIcon } from "lucide-react";

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
      <FacebookIcon className=" size-5 text-blue-600" />
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
