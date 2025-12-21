"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const wishlistItems = [
  {
    id: "p1",
    name: "Wireless Headphones",
    price: "$120.00",
    image: "/images/headphones.jpg",
  },
  {
    id: "p2",
    name: "Smartwatch Series 6",
    price: "$250.00",
    image: "/images/smartwatch.jpg",
  },
  {
    id: "p3",
    name: "Gaming Mouse",
    price: "$60.00",
    image: "/images/mouse.jpg",
  },
];

export default function MyCarts() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <p className="text-sm text-muted-foreground">
          Items you’ve saved for later
        </p>
      </div>

      {/* Wishlist Items */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {wishlistItems.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Your wishlist is empty.
            </p>
          ) : (
            wishlistItems.map((item, index) => (
              <div key={item.id}>
                <div className="flex items-center justify-between">
                  {/* Left side */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-md border"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.price}
                      </p>
                    </div>
                  </div>

                  {/* Right side actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="default">
                      Move to Cart
                    </Button>
                    <Button size="sm" variant="destructive">
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Separator between items */}
                {index < wishlistItems.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
