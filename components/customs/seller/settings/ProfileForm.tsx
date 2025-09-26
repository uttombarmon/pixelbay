"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile Saved:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Input
        placeholder="Avatar URL"
        value={formData.avatar}
        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
      />
      <Button type="submit">Save Profile</Button>
    </form>
  );
}
