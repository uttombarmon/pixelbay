"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    bankAccount: "",
    paypal: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment Saved:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Bank Account Number"
        value={formData.bankAccount}
        onChange={(e) =>
          setFormData({ ...formData, bankAccount: e.target.value })
        }
      />
      <Input
        placeholder="PayPal Email"
        value={formData.paypal}
        onChange={(e) => setFormData({ ...formData, paypal: e.target.value })}
      />
      <Button type="submit">Save Payment</Button>
    </form>
  );
}
