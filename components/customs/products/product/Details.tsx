"use client";
import React from "react";
import * as motion from "motion/react-client";
import ProductImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ProductWarranty from "./ProductWarranty";
import ProductActions from "./ProductActions";
import ProductTabs from "./ProductTabs";
import { toast } from "sonner";

const Details = ({ product }: { product: any }) => {
  const [cart, setCart] = React.useState<any>({
    product_id: product?.id,
    variant_id: product?.variants?.[0]?.id,
    quantity: 1,
    unit_price: product?.variants?.[0]?.price || 0,
  });

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

  const techSpecs = product.techSpecs;

  return (
    <>
      <motion.div
        className="block lg:flex flex-wrap"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProductImageGallery product={product} />

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 flex flex-col gap-5 px-6"
        >
          <ProductInfo product={product} />
          <ProductWarranty product={product} />
          <ProductActions
            product={product}
            cart={cart}
            setCart={setCart}
            addToCart={addToCart}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mt-10"
      >
        <ProductTabs product={product} techSpecs={techSpecs} />
      </motion.div>
    </>
  );
};

export default Details;
