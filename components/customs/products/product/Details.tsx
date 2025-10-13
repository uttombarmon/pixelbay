"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import ProductReviews from "./Reviews";
import ProductImageGallery from "./ImageGallery";
import ReviewForm from "./ReviewForm";
import { toast } from "sonner";

const Details = ({ product }: { product: any }) => {
  const [cart, setCart] = React.useState<any>({
    product_id: product?.id,
    variant_id: product?.variants?.[0]?.id,
    quantity: 1,
    unit_price: product?.variants?.[0]?.price || 0,
  });
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
  // const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseInt(e.target.value, 10);
  //   if (!isNaN(value) && value > 0) {
  //     setCart((prev: any) => ({ ...prev, quantity: value }));
  //   }
  // };
  const addToCart = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/carts/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart),
        }
      );
      if (response.ok || response.status === 202) {
        const data = await response.json();
        toast.warning(data.message || "Added to cart");
        console.log(data.message);
      } else if (response.status === 201) {
        toast.success("Added to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  return (
    <>
      <motion.div
        className=" block lg:flex flex-wrap"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProductImageGallery product={product} />
        {/* DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 flex flex-col gap-5 px-6"
        >
          <h1 className="text-4xl font-bold">{product.title}</h1>

          {product.brand && (
            <p className="text-sm text-muted-foreground font-medium">
              Brand: {product.brand}
            </p>
          )}

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
          <div className=" flex gap-10">
            {/* Variants */}
            {product?.variants.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                <p className="font-medium">Variants:</p>
                <div className="flex gap-2 flex-wrap">
                  {product?.variants.map((v: any) => (
                    <span
                      key={v.id}
                      className="px-3 py-1 rounded-full border border-gray-300"
                      onClick={() => setVariant(v.id)}
                    >
                      {v.title || v.sku} - ${v.price}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Button
              disabled={
                !product?.variants?.length || product?.variants[0].stock <= 0
              }
              className="w-fit mt-6"
              onClick={() => addToCart()}
            >
              Add to Cart
            </Button>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mt-10"
      >
        {/* Full Description */}
        {product.description && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 dark:text-gray-200">
              {product.description}
            </p>
          </div>
        )}

        {/* Reviews placeholder */}
        <div className="mt-8">
          <ReviewForm productId={product?.id} />
          <h2 className="text-xl font-semibold mb-2">Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <ProductReviews reviews={product.reviews} />
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No reviews yet.</p>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Details;
