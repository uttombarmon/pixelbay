"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
    role: "User",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated user:", user);
    // TODO: send update to backend
  };

  return (
    <div className="grid gap-6 max-w-3xl mx-auto">
      {/* Profile Card */}
      <Card className="p-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">My Profile</h2>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-medium">{user.name}</p>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
          </div>
        </CardContent>
      </Card>

      {/* Update Profile Form */}
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
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
