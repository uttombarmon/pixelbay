"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import ProductForm from "./ProductForm";
// import { AddProductForm } from "./AddProductForm";
import { AddProductFormm, type ProductFormValues } from "./product-form";

export default function ProductDialog({
  productToEdit,
  onClose,
  isOpen,
  onOpenChange,
}: {
  productToEdit?: Partial<ProductFormValues> | Record<string, unknown> | null;
  onClose: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full lg:min-w-4xl max-h-[80vh] overflow-auto">
        <DialogTitle>
          {productToEdit ? "Edit Product" : "Create Product"}
        </DialogTitle>
        <AddProductFormm
          defaultValues={(productToEdit as Partial<ProductFormValues>) || undefined}
          onSubmit={() => {
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
