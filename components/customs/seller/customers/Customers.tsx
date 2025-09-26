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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const customers = [
  {
    id: "CUST-101",
    name: "Alice Cooper",
    email: "alice@example.com",
    totalOrders: 5,
    totalSpent: "$450.00",
    lastOrder: "2025-09-20",
    avatar: "https://i.pravatar.cc/150?u=alice",
  },
  {
    id: "CUST-102",
    name: "Bob Dylan",
    email: "bob@example.com",
    totalOrders: 2,
    totalSpent: "$180.00",
    lastOrder: "2025-09-21",
    avatar: "https://i.pravatar.cc/150?u=bob",
  },
  {
    id: "CUST-103",
    name: "Charlie Puth",
    email: "charlie@example.com",
    totalOrders: 8,
    totalSpent: "$960.00",
    lastOrder: "2025-09-23",
    avatar: "https://i.pravatar.cc/150?u=charlie",
  },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-muted-foreground">
          Manage and view your customers' details.
        </p>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={customer.avatar} alt={customer.name} />
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{customer.name}</span>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
