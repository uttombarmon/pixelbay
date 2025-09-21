import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth";
import React from "react";

const SignUpForm = () => {
  return (
    <form
      className="grid gap-4"
      action={async (formData) => {
        "use server";
        await signIn("resend", formData);
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="FirstName">First Name</Label>
        <Input
          id="firstname"
          type="text"
          name="firstname"
          placeholder="Jhon"
          required
        />
        <Label htmlFor="LastName">Last Name</Label>
        <Input
          id="lastname"
          type="text"
          name="lastname"
          placeholder="Deo"
          required
        />
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="text"
          name="email"
          placeholder="you@example.com"
          required
        />
        <Label htmlFor="email">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="*****"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {"Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
