"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ShopForm() {
  const [formData, setFormData] = useState({
    shopName: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Shop Saved:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Shop Name"
        value={formData.shopName}
        onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
      />
      <Textarea
        placeholder="Shop Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <Button type="submit">Save Shop</Button>
    </form>
  );
}
