"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductActionsProps {
  product: any;
  cart: any;
  setCart: (cart: any) => void;
  addToCart: () => void;
}

export default function ProductActions({
  product,
  cart,
  setCart,
  addToCart,
}: ProductActionsProps) {
  const setVariant = (variantId: number) => {
    const variant = product.variants.find((v: any) => v.id === variantId);
    if (variant) {
      setCart((prev: any) => ({
        ...prev,
        variant_id: variant.id,
        unit_price: variant.price,
      }));
    }
  };

  return (
    <div className="flex gap-10">
      {/* Variants */}
      {product?.variants.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <p className="font-medium">Variants:</p>
          <div className="flex gap-2 flex-wrap">
            {product?.variants.map((v: any) => (
              <span
                key={v.id}
                className={`px-3 py-1 rounded-full border cursor-pointer transition-colors ${
                  cart.variant_id === v.id
                    ? "border-primary bg-primary/10"
                    : "border-gray-300 hover:border-primary"
                }`}
                onClick={() => setVariant(v.id)}
              >
                {v.variantName || v.sku} - ${v.price}
              </span>
            ))}
          </div>
        </div>
      )}

      <Button
        disabled={!product?.variants?.length || product?.variants[0].stock <= 0}
        className="w-fit mt-6"
        onClick={() => addToCart()}
      >
        Add to Cart
      </Button>
      <Link
        href={`/./payment?productId=${product?.id}&variantId=${cart?.variant_id}&quantity=${cart?.quantity}`}
      >
        <Button className="w-fit mt-6 bg-blue-600 text-white">Buy Now</Button>
      </Link>
    </div>
  );
}
