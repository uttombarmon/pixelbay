"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
// import { signIn } from "@/lib/auth/auth";
import { signIn } from "next-auth/react";

const SignInForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value;
    setUser((prev) => ({ ...prev, email: inputData }));
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value;
    setUser((prev) => ({ ...prev, passwordHash: inputData }));
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = signIn("credentials", user);

      if (!res) throw new Error("Signup failed");

      console.log("Signup success:", res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleFormSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          onChange={(e) => handleEmail(e)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          required
          onChange={(e) => handlePassword(e)}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <Link href="#" className="text-blue-600 hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>

      <div className="text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <Link href="/auth/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
