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

const orders = [
  {
    id: "1001",
    date: "2025-09-15",
    total: "$120.50",
    status: "Pending",
  },
  {
    id: "1002",
    date: "2025-09-12",
    total: "$89.99",
    status: "Shipped",
  },
  {
    id: "1003",
    date: "2025-09-08",
    total: "$45.00",
    status: "Delivered",
  },
  {
    id: "1004",
    date: "2025-09-01",
    total: "$210.75",
    status: "Cancelled",
  },
];

export default function OrdersPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage all your recent purchases
        </p>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Pending"
                          ? "secondary"
                          : order.status === "Shipped"
                          ? "outline"
                          : order.status === "Delivered"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
