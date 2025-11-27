"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import { AddProductForm } from "./AddProductForm";

export default function ProductDialog({
  userId,
  productToEdit,
  onClose,
  isOpen,
  onOpenChange,
}: {
  userId: string;
  productToEdit?: any | null;
  onClose: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full lg:min-w-4xl max-h-[80vh] overflow-auto">
        <DialogTitle>
          {productToEdit ? "Edit Product" : "Create Product"}
        </DialogTitle>
        <AddProductForm />
        {/* <ProductForm
          userId={userId}
          productToEdit={productToEdit}
          onClose={() => {
            onOpenChange(false);
            onClose();
          }}
        /> */}
      </DialogContent>
    </Dialog>
  );
}
