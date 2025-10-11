import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CustomerDetailsProps {
  params: { id: string };
}

// Mock data (replace with db fetch)
const getCustomerById = async (id: string) => {
  return {
    id,
    name: "Jane Doe",
    email: "jane@example.com",
    image: "/avatars/jane.png",
    joinDate: "2023-05-12",
    totalSpent: "$1,240.50",
    orders: [
      { id: "101", date: "2024-09-10", total: "$250.00", status: "Completed" },
      { id: "102", date: "2024-08-02", total: "$120.00", status: "Pending" },
    ],
  };
};

export default async function CustomerDetailsPage({
  params,
}: CustomerDetailsProps) {
  const customer = await getCustomerById(params.id);

  return (
    <div className="space-y-6 bg-accent-foreground">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={customer.image} />
            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg">{customer.name}</p>
            <p className="text-sm text-muted-foreground">{customer.email}</p>
            <p className="text-sm text-gray-500">
              Joined: {new Date(customer.joinDate).toLocaleDateString()}
            </p>
            <p className="text-sm font-medium">
              Total Spent: {customer.totalSpent}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {customer.orders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center border-b pb-2 last:border-0"
            >
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span>{order.total}</span>
                <Badge
                  variant={
                    order.status === "Completed" ? "default" : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="default">Send Email</Button>
        <Button variant="secondary">Message</Button>
      </div>
    </div>
  );
}
