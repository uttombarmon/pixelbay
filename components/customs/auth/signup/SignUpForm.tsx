"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserI } from "@/types/UserInterface";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { registerUser } from "@/lib/actions/auth";

const SignUpForm = () => {
  const [user, setUser] = useState({
    name: "",
    // role: "user",
    email: "",
    password: "",
  });
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value;
    setUser((prev) => ({ ...prev, name: inputData }));
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value;
    setUser((prev) => ({ ...prev, email: inputData }));
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value;
    setUser((prev) => ({ ...prev, password: inputData }));
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);

      const result = await registerUser(formData);

      if (result.error) {
        console.error(result.error);
        // You might want to show this error to the user via state/toast
        return;
      }

      console.log("Registration success");

      // Sign in after successful registration
      const res = await signIn("credentials", {
        redirect: true,
        callbackUrl: "/",
        email: user.email,
        password: user.password,
      });

      console.log("Sign in result:", res);
    } catch (err) {
      console.error("Signup error:", err);
    }
  };
  return (
    <form className="grid gap-4" onSubmit={handleFormSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="Full Name">Full Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Jhon Deo"
          required
          onChange={(e) => handleName(e)}
        />
        {/* <Label htmlFor="LastName">Last Name</Label>
        <Input
          id="lastname"
          type="text"
          name="lastname"
          placeholder="Deo"
          required
          onChange={(e) => handleLastName(e)}
        /> */}
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="text"
          name="email"
          placeholder="you@example.com"
          required
          onChange={(e) => handleEmail(e)}
        />
        <Label htmlFor="email">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="*****"
          required
          onChange={(e) => handlePassword(e)}
        />
      </div>
      <Button type="submit" className="w-full">
        {"Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
