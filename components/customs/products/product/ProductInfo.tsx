"use client";

interface ProductInfoProps {
  product: any;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-bold">{product.title}</h1>

      <div className="flex flex-wrap gap-4 text-sm">
        {product.brand && (
          <span className="px-3 py-1 bg-secondary rounded-full">
            <strong>Brand:</strong> {product.brand}
          </span>
        )}
        {product.model && (
          <span className="px-3 py-1 bg-secondary rounded-full">
            <strong>Model:</strong> {product.model}
          </span>
        )}
        {product.condition && (
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
            <strong>Condition:</strong> {product.condition}
          </span>
        )}
        {product.gadgetType && (
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 rounded-full">
            <strong>Type:</strong> {product.gadgetType.replace(/_/g, " ")}
          </span>
        )}
      </div>

      <p className="text-lg text-muted-foreground leading-relaxed">
        {product.short_description}
      </p>

      <div className="text-2xl font-semibold text-primary">
        {product?.variants.length
          ? `$${product?.variants[0].price}`
          : "Price not available"}
      </div>

      {product?.variants.length && product?.variants[0].stock > 0 ? (
        <p className="text-green-600 font-medium">
          In Stock ({product?.variants[0].stock})
        </p>
      ) : (
        <p className="text-red-500 font-medium">Out of Stock</p>
      )}
    </div>
  );
}
