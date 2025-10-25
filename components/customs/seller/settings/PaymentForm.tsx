"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    methodType: "card", // default
    provider: "",
    accountNumber: "",
    expiryDate: "",
    isDefault: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/settings/payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success("Payment method saved ✅");
      console.log("Saved:", data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save payment ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      {/* Payment Method Type */}
      <div>
        <label className="text-sm font-medium">Payment Method Type</label>
        <Select
          value={formData.methodType}
          onValueChange={(value) =>
            setFormData({ ...formData, methodType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="card">Card</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="upi">UPI</SelectItem>
            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Provider Input */}
      <Input
        placeholder="Provider (Visa, PayPal, HDFC Bank)"
        value={formData.provider}
        onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
      />

      {/* Account Number / Email / UPI ID */}
      <Input
        placeholder={
          formData.methodType === "card"
            ? "Card Number (**** **** 1234)"
            : formData.methodType === "paypal"
            ? "PayPal Email"
            : formData.methodType === "upi"
            ? "UPI ID (e.g. user@bank)"
            : "Bank Account Number"
        }
        value={formData.accountNumber}
        onChange={(e) =>
          setFormData({ ...formData, accountNumber: e.target.value })
        }
      />

      {/* Expiry date only if Card */}
      {formData.methodType === "card" && (
        <Input
          placeholder="Expiry Date (MM/YY)"
          value={formData.expiryDate}
          onChange={(e) =>
            setFormData({ ...formData, expiryDate: e.target.value })
          }
        />
      )}

      {/* Default Method Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="default"
          checked={formData.isDefault}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isDefault: !!checked })
          }
        />
        <label htmlFor="default" className="text-sm">
          Set as default payment method
        </label>
      </div>

      <Button type="submit" className="w-full">
        Save Payment Method
      </Button>
    </form>
  );
}
