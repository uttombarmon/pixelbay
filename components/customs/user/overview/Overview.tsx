"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShoppingBag, Heart, Clock } from "lucide-react";
import { BillingsTable } from "./Billings";
import { ReviewsTable } from "./Reviews";

export default function UserDashboardPage() {
  return (
    <div className=" w-full flex flex-col">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Orders */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">My Orders</CardTitle>
            <ShoppingBag className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">
              Total completed orders
            </p>
          </CardContent>
        </Card>

        {/* Wishlist */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Wishlist</CardTitle>
            <Heart className="h-5 w-5 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Saved items</p>
          </CardContent>
        </Card>

        {/* Last Login */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Last Login</CardTitle>
            <Clock className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">Sep 18, 2025 • 10:32 AM</div>
            <p className="text-sm text-muted-foreground">
              Logged in from Chrome
            </p>
          </CardContent>
        </Card>
      </div>
      <div className=" mt-2">
        <BillingsTable />
        <ReviewsTable />
      </div>
    </div>
  );
}
