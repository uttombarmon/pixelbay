"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { UserI } from "@/types/UserInterface";
interface FormProps {
  id?: string;
  name: string;
  email: string;
  image: string;
  passsword?: string;
  role: string;
}
const Form = ({ userData }: { userData: UserI }) => {
  const [user, setUser] = useState<FormProps>({
    name: userData?.name,
    email: userData?.email,
    role: userData?.role,
    image: userData?.image || " ",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated user:", user);
    // TODO: send update to backend
  };
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Update Information</h3>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full my-2">
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Form;
