"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import ToggleStatusButton from "./ToggleStatusButton";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import ProductDialog from "./ProductDialog";
import { toast } from "sonner";

export default function ProductPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";
  const [products, setProducts] = useState<any>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/products?userId=${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching products.");
    }
  }, [userId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDialogClose = () => {
    setEditingProduct(null);
    setIsDialogOpen(false);
    fetchProducts(); // Re-fetch products after add/edit
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (product: any) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };
  const handleDeleteClick = async (productId: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/products/${productId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to delete product");
    }
    toast.success("Product Deleted");
    fetchProducts(); // Re-fetch products after delete
  };

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button onClick={handleAddClick}>
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
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
                      {product.title.length > 20
                        ? product.title.slice(0, 20) + "..."
                        : product.title}
                    </TableCell>
                    <TableCell>{product.category_id}</TableCell>
                    <TableCell>${product.price ?? 0}</TableCell>
                    <TableCell>{product.stock ?? 0}</TableCell>
                    <TableCell>
                      <ToggleStatusButton
                        productId={product.id}
                        initialStatus={product.status}
                      />
                    </TableCell>
                    <TableCell className=" flex justify-between gap-2 items-center my-auto">
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => handleEditClick(product)}
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size={"sm"}
                        onClick={() => handleDeleteClick(product.id)}
                      >
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
      <ProductDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        userId={userId}
        productToEdit={editingProduct}
        onClose={handleDialogClose}
      />
    </div>
  );
}
