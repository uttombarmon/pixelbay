"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";

export function ReviewsTable() {
  const reviews = [
    { product: "Nike Air Zoom", rating: 5, date: "2025-09-10" },
    { product: "Adidas Ultraboost", rating: 4, date: "2025-08-28" },
    { product: "Puma Hoodie", rating: 3, date: "2025-08-15" },
  ];

  return (
    <div className="rounded-2xl border shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">My Reviews</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review, i) => (
            <TableRow key={i}>
              <TableCell>{review.product}</TableCell>
              <TableCell>{"⭐".repeat(review.rating)}</TableCell>
              <TableCell>{review.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
