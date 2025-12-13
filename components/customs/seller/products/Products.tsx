"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Loader2, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import ToggleStatusButton from "./ToggleStatusButton";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import ProductDialog from "./AddProduct/ProductDialog";
import { toast } from "sonner";
import Product from "./Product";

export default function ProductPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log(products);
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    if (!userId) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/products?userId=${userId}`
      );
      // if (!response.ok) throw new Error("Failed to fetch products");
      if (!response.ok) {
        setProducts([]);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
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
    fetchProducts();
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = async (product: any) => {
    try {
      // Fetch full product details including tech specs
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/products/${product.id}`
      );

      if (!response.ok) {
        toast.error("Failed to fetch product details");
        return;
      }

      const fullProductData = await response.json();
      console.log("Full product data:", fullProductData);

      setEditingProduct(fullProductData);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Error loading product details");
    }
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
    fetchProducts();
  };

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button onClick={handleAddClick}>
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
        {/* <Button onClick={handleAddClick}>
          <Plus className="w-4 h-4 mr-2" /> Add Product2
        </Button> */}
      </div>
      {loading ? (
        <div className="flex h-[calc(100vh-10rem)] items-center justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : products?.error == "Not Found Data" ? (
        <div className="flex h-[calc(100vh-10rem)] items-center justify-center items-center">
          <p className="text-2xl font-bold">No Data Found</p>
        </div>
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
                  <TableHead>Variants</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product: any) => (
                  <Product
                    key={product.id}
                    product={product}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
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
