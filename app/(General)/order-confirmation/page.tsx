import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface SearchParams {
    orderNumber?: string;
}

export default async function OrderConfirmationPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;
    const orderNumber = params.orderNumber || "N/A";

    return (
        <div className="container mx-auto max-w-2xl px-4 py-16">
            <Card className="border-none shadow-lg">
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-3xl font-bold">
                        Order Confirmed!
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <p className="text-muted-foreground">
                        Thank you for your purchase. Your order has been successfully placed.
                    </p>

                    <div className="rounded-lg bg-muted p-4">
                        <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                        <p className="text-2xl font-bold font-mono">{orderNumber}</p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        You will receive an email confirmation shortly with your order details.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <Button asChild>
                            <Link href="/dashboard/orders">View My Orders</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/">Continue Shopping</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
