"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShoppingBag, Heart, Clock } from "lucide-react";
import { BillingsTable } from "./Billings";
import { ReviewsTable } from "./Reviews";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserDashboardPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [stats, setStats] = useState({ orders: 0, wishlist: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!userId) return;
      try {
        const res = await fetch(`/api/dashboard/stats?userId=${userId}`);
        const data = await res.json();
        if (res.ok) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [userId]);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name || "User"}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your account today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Orders */}
        <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl transition-all hover:scale-[1.02]">
          <div className="absolute inset-0 bg-white/40 dark:bg-black/40 z-0" />
          <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total Orders
            </CardTitle>
            <div className="p-2 bg-blue-500/20 rounded-full">
              <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold text-foreground">
              {loading ? "..." : stats.orders}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Lifetime completed orders
            </p>
          </CardContent>
        </Card>

        {/* Wishlist */}
        <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-xl transition-all hover:scale-[1.02]">
          <div className="absolute inset-0 bg-white/40 dark:bg-black/40 z-0" />
          <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Wishlist
            </CardTitle>
            <div className="p-2 bg-pink-500/20 rounded-full">
              <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold text-foreground">
              {loading ? "..." : stats.wishlist}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Items saved for later
            </p>
          </CardContent>
        </Card>

        {/* Last Login */}
        <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl transition-all hover:scale-[1.02]">
          <div className="absolute inset-0 bg-white/40 dark:bg-black/40 z-0" />
          <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Active Session
            </CardTitle>
            <div className="p-2 bg-amber-500/20 rounded-full">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-xl font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">
              Online Now
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently logged in
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BillingsTable />
        <ReviewsTable />
      </div>
    </div>
  );
}
