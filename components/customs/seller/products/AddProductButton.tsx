"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import ProductForm from "./AddProductModal";

export default function AddProductButton({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="w-full lg:min-w-4xl max-h-[80vh] overflow-auto">
        <ProductForm userId={userId} />
      </DialogContent>
    </Dialog>
  );
}
