"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CheckoutFormProps {
  product?: {
    id: number;
    title: string;
    image?: string;
  };
  variant?: {
    id: number;
    name?: string;
    price: string;
  };
  quantity?: number;
  items?: Array<{
    id: number;
    productId: number;
    variantId: number;
    name: string;
    price: string;
    quantity: number;
    image?: string;
    slug?: string;
  }>;
}

export default function CheckoutForm({
  product,
  variant,
  quantity = 1,
  items,
}: CheckoutFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvc: "",
  });

  // Calculate totals based on mode
  const isCartMode = !!items && items.length > 0;

  const subtotal = isCartMode
    ? items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
    : variant
      ? parseFloat(variant.price) * quantity
      : 0;

  const total = subtotal.toFixed(2);
  const taxes = (subtotal * 0.1).toFixed(2);
  const grandTotal = (subtotal + parseFloat(taxes)).toFixed(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare order data
      const orderData = {
        items: isCartMode
          ? items!.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: item.price,
          }))
          : [
            {
              variantId: variant!.id,
              quantity,
              unitPrice: variant!.price,
            },
          ],
        shippingAddress: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
        },
        subtotal: parseFloat(total),
        tax: parseFloat(taxes),
        total: parseFloat(grandTotal),
        isCartMode,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create order");
      }

      const result = await response.json();

      toast.success("Order placed successfully! 🎉");

      // Redirect to order confirmation
      router.push(`/order-confirmation?orderNumber=${result.orderNumber}`);
    } catch (error: any) {
      console.error("Order creation error:", error);
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column: Forms */}
      <div className="space-y-8">
        {/* Shipping Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, Apt 4B"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="New York"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  name="zip"
                  placeholder="10001"
                  required
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Payment Details</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="card">Card Number</Label>
              <Input
                id="card"
                name="card"
                placeholder="0000 0000 0000 0000"
                required
                value={formData.card}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  required
                  value={formData.expiry}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  name="cvc"
                  placeholder="123"
                  required
                  value={formData.cvc}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="h-fit space-y-6 rounded-lg border bg-slate-50 p-6 dark:bg-slate-900">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        {isCartMode ? (
          // Cart mode: Display all items
          <div className="max-h-64 space-y-3 overflow-y-auto">
            {items!.map((item) => (
              <div key={item.id} className="flex gap-3 border-b pb-3 last:border-0">
                {item.image && (
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Single item mode: Display one item
          <div className="flex gap-4">
            {product?.image && (
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-white">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <div>
              <h3 className="font-medium line-clamp-2">{product?.title}</h3>
              <p className="text-sm text-muted-foreground">{variant?.name}</p>
              <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
            </div>
          </div>
        )}

        <div className="space-y-2 border-t pt-4 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes (10%)</span>
            <span>${taxes}</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-base font-semibold">
            <span>Total</span>
            <span>${grandTotal}</span>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${grandTotal}`
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Encrypted and secure payment courtesy of Stripe.
        </p>
      </div>
    </div>
  );
}
