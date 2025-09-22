"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";

export function BillingsTable() {
  const bills = [
    { id: "INV-1001", amount: "$120.00", status: "Paid", date: "2025-09-12" },
    { id: "INV-1002", amount: "$85.00", status: "Pending", date: "2025-09-05" },
    { id: "INV-1003", amount: "$42.50", status: "Failed", date: "2025-08-29" },
  ];

  return (
    <div className="rounded-2xl border shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Billing History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill, i) => (
            <TableRow key={i}>
              <TableCell>{bill.id}</TableCell>
              <TableCell>{bill.amount}</TableCell>
              <TableCell
                className={
                  bill.status === "Paid"
                    ? "text-green-600 font-medium"
                    : bill.status === "Pending"
                    ? "text-yellow-600 font-medium"
                    : "text-red-600 font-medium"
                }
              >
                {bill.status}
              </TableCell>
              <TableCell>{bill.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
