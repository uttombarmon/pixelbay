"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function MyCarts() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Re-fetching wishlist on load
  useEffect(() => {
    async function fetchWishlist() {
      if (!userId) return;
      try {
        const res = await fetch(`/api/wishlist?userId=${userId}`);
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          if (res.ok) {
            setItems(data.items || []);
          }
        } else {
          // Handle 404 or HTML response gracefully
          console.error("Wishlist API invalid response:", await res.text());
          setItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, [userId]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Wishlist</h1>
        <p className="text-muted-foreground">
          Items you've saved for later
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden border-none shadow-md bg-card/40 animate-pulse">
              <div className="h-48 bg-muted" />
              <CardHeader className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-3 w-1/2 bg-muted rounded" />
              </CardHeader>
            </Card>
          ))
        ) : items.length === 0 ? (
          <div className="col-span-full py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Your wishlist is empty</h3>
            <p className="text-muted-foreground">Start exploring products to add them here.</p>
          </div>
        ) : (
          items.map((item: any) => (
            <Card key={item.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-muted">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">No Image</div>
                )}
                <div className="absolute top-2 right-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:text-red-600 transition-colors">
                    <Heart className="h-4 w-4 fill-current text-red-600" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-semibold truncate" title={item.name}>{item.name}</h3>
                  <p className="text-lg font-bold text-primary">${item.price}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button className="w-full" size="sm">
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
