"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!userId) return;
      try {
        const res = await fetch(`/api/orders?userId=${userId}`);
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userId]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">
          Track and manage all your recent purchases
        </p>
      </div>

      {/* Orders Table */}
      <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-muted/50 border-b">
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/20">
              <TableRow>
                <TableHead className="pl-6">Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order: any) => (
                  <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="pl-6 font-medium">#{order.orderNumber || order.id}</TableCell>
                    <TableCell>{new Date(order.created_at || order.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">${order.total_amount || order.total}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "pending"
                            ? "secondary"
                            : order.status === "shipped"
                              ? "outline"
                              : order.status === "delivered" || order.status === "completed"
                                ? "default"
                                : "destructive"
                        }
                        className="capitalize"
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6 text-muted-foreground hover:text-foreground cursor-pointer">
                      View Details
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
