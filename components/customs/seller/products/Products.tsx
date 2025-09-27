import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

import { auth } from "@/lib/auth/auth";
import AddProductButton from "./AddProductButton";
import { Button } from "@/components/ui/button";

export default async function ProductPage() {
  const session = await auth();
  const userId = session?.user?.id;
  // Fetch products created by the seller
  let products = [];
  if (userId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/seller/products?userId=${userId}`
      );
      products = await response.json();
      console.log(products);
    } catch (error) {
      return <p>Fetching error</p>;
    }
  } else {
    return <p>Something Wrong</p>;
  }

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold">Products</h2>
        <AddProductButton userId={userId} />
      </div>
      {products?.error == "Not Found Data" ? (
        <p>Not Found Data</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product?.images?.length >= 1 ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-md" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.title}
                    </TableCell>
                    <TableCell>{product.category_id}</TableCell>
                    <TableCell>${product.price ?? 0}</TableCell>
                    <TableCell>{product.stock ?? 0}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          product.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell className=" flex justify-between gap-2 items-center my-auto">
                      <Button className="" variant={"outline"} size={"sm"}>
                        <Edit className="w-4 h-4" /> Edit
                      </Button>
                      <Button className="btn-sm bg-red-400" size={"sm"}>
                        <Trash2 className="w-4 h-4" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
