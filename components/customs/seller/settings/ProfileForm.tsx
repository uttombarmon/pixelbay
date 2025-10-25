"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function ProfileForm() {
  const session = useSession();
  const user = session.data?.user;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.image || "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.image || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");
    if (formData.name || formData.email || formData.avatar) {
      const res = await fetch("/api/seller/settings/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Failed to save profile");
      }
      toast.success("Profile saved");
      return;
    }

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
        defaultValue={formData.email}
        readOnly
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
