"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ShoppingCart, Trash2, Minus, Plus, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function MyCarts() {
  const { data: session } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, [session]);

  async function fetchCart() {
    if (!session?.user?.id) return;
    try {
      const res = await fetch("/api/carts");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        calculateTotal(data.items || []);
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  }

  function calculateTotal(cartItems: any[]) {
    const total = cartItems.reduce((acc, item) => {
      return acc + (Number(item.price) * (item.quantity || 1));
    }, 0);
    setCartTotal(total);
  }

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const res = await fetch(`/api/carts/items/${itemId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (res.ok) {
        const updatedItem = await res.json();
        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, quantity: updatedItem.quantity } : item
          )
        );
        // Recalculate total immediately using client state
        const updatedItems = items.map((item) =>
          item.id === itemId ? { ...item, quantity: updatedItem.quantity } : item
        );
        calculateTotal(updatedItems);
        toast.success("Cart updated");
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error) {
      console.error("Failed to update quantity", error);
      toast.error("Something went wrong");
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      const res = await fetch(`/api/carts/items/${itemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
        calculateTotal(updatedItems);
        toast.success("Item removed");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Failed to remove item", error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="h-10 w-48 bg-muted animate-pulse rounded" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 w-full bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <p className="text-muted-foreground">
          Review your items before checkout
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Cart Items ({items.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {items.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <Button variant="outline" className="mt-4">Start Shopping</Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6 w-[40%]">Product</TableHead>
                      <TableHead className="text-center">Price</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right pr-6">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted border">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full text-xs">No Img</div>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium line-clamp-1" title={item.name}>{item.name}</span>
                              <span className="text-xs text-muted-foreground">Variant: {item.variantId}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-medium">${Number(item.price).toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-4 text-center text-sm">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-bold">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                            <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                              <Trash2 className="h-3 w-3" /> Remove
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm sticky top-6">
            <CardHeader className="bg-muted/50 border-b pb-4">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary text-xl">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full h-12 text-base font-semibold shadow-md"
                size="lg"
                disabled={items.length === 0}
                onClick={() => router.push("/payment?mode=cart")}
              >
                <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="w-full bg-muted h-px" />
                <span className="whitespace-nowrap">Secure Checkout</span>
                <div className="w-full bg-muted h-px" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
