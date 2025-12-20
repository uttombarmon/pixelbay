"use client";
import { productsData } from "@/types/ProductCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductCardButton from "./ProductCardButton";
import { addToCartItem } from "@/lib/apiClients/products/AddToCard";
import { toast } from "sonner";
import { redirect } from "next/navigation";

function ProductCard({ product }: { product: productsData }) {
  const addToCart = async () => {
    const res = await addToCartItem(
      product?.id as number,
      product?.variantId as number,
      1,
      product?.price as number
    );
    // console.log(res);
    if (!res) {
      toast.error("Failed to add to cart");
      return;
    } else if (res?.error == "Not signed in") {
      toast.error("Please sign in to add to cart");
      return;
    } else if (res?.message?.toString().toLowerCase().includes("already")) {
      toast.info("Already in cart!");
      return;
    }
    toast.success("Added to cart");
    // const cartItems = localStorage.getItem("cartItems");
    // if (cartItems) {
    //   const parsedCartItems = JSON.parse(cartItems);
    //   parsedCartItems.push({
    //     productId: product?.id,
    //     variantId: product?.variantId,
    //   });
    //   localStorage.setItem("cartItems", JSON.stringify(parsedCartItems));
    // } else {
    //   localStorage.setItem("cartItems", JSON.stringify([productId]));
    // }
    // console.log(cartItems);
  };
  const buyNow = () => {
    redirect(
      `/payment?productId=${product?.id}&variantId=${product?.variantId}&quantity=1`
    );
  };
  return (
    <div className="group relative block overflow-hidden rounded-xl h-full">
      {product?.discount && (
        <span className="absolute -top-2px -right-px rounded-tr-xl rounded-bl-3xl bg-rose-600 px-6 py-4 font-medium tracking-widest text-white uppercas z-10">
          Save {product?.discount}%
        </span>
      )}
      {product?.date && (
        <span className="absolute -top-2px -right-px rounded-tr-xl rounded-bl-3xl bg-emerald-400 px-6 py-4 font-medium tracking-widest text-gray-600 uppercas z-10">
          New
        </span>
      )}

      <Link href={`/product/${product?.id}`}>
        <div className="relative w-full h-72 sm:h-72 bg-gray-50 overflow-hidden flex items-center justify-center">
          {product?.productImage ? (
            <Image
              src={product?.productImage}
              alt={product?.title}
              width={300}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className=" transition duration-500 group-hover:scale-105"
            />
          ) : (
            <Image
              src="https://i.postimg.cc/50pg7Lhv/Image-not-found.png"
              alt="Image not found"
              width={300}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className=" transition duration-500 group-hover:scale-105"
            />
          )}
        </div>
      </Link>

      <div className="relative border border-gray-100 bg-white p-6">
        <p className="text-gray-700">
          ${product?.price}{" "}
          {product?.orginal_price && (
            <span className="text-gray-400 line-through">
              ${product?.orginal_price}
            </span>
          )}
        </p>

        <h3 className="mt-1.5 text-lg font-medium text-gray-900 h-12">
          {product?.title.length > 50
            ? `${product.title.slice(0, 50)}...`
            : product.title}
        </h3>

        {/* <p className="mt-1.5 line-clamp-3 text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis
          iure obcaecati pariatur. Officiis qui, enim cupiditate aliquam
          corporis iste.
        </p> */}

        <div className="mt-4 flex gap-4">
          <ProductCardButton addToCart={addToCart} buyNow={buyNow} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
