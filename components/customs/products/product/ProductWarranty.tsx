"use client";

interface ProductWarrantyProps {
  product: any;
}

export default function ProductWarranty({ product }: ProductWarrantyProps) {
  if (!product.warrantyType) return null;

  return (
    <div className="border rounded-lg p-4 bg-card">
      <h3 className="font-semibold mb-2">Warranty</h3>
      <p className="text-sm">
        <strong>Type:</strong> {product.warrantyType.replace(/_/g, " ")}
      </p>
      {product.warrantyMonths && (
        <p className="text-sm">
          <strong>Duration:</strong> {product.warrantyMonths} months
        </p>
      )}
      {product.warrantyDescription && (
        <p className="text-sm text-muted-foreground mt-1">
          {product.warrantyDescription}
        </p>
      )}
    </div>
  );
}
