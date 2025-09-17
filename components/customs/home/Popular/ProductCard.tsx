import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { productsData } from "@/types/ProductCard";
import Image from "next/image";
import React from "react";

function ProductCard({ product }: { product: productsData }) {
  return (
    <a href="#" className="group relative block overflow-hidden rounded-xl">
      {/* <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button> */}
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

      <div className="relative w-full h-72 sm:h-72 bg-gray-50 overflow-hidden flex items-center justify-center">
        <Image
          src={product?.image}
          alt={product?.title}
          width={300}
          height={400}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className=" transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="relative border border-gray-100 bg-white p-6">
        <p className="text-gray-700">
          ${product?.price}{" "}
          {product?.orginal_price && (
            <span className="text-gray-400 line-through">
              ${product?.orginal_price}
            </span>
          )}
        </p>

        <h3 className="mt-1.5 text-lg font-medium text-gray-900">
          {product?.title}
        </h3>

        {/* <p className="mt-1.5 line-clamp-3 text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis
          iure obcaecati pariatur. Officiis qui, enim cupiditate aliquam
          corporis iste.
        </p> */}

        <form className="mt-4 flex gap-4">
          <button className="block w-full rounded-sm bg-gray-200 px-1 md:px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105">
            Add to Cart
          </button>

          <button
            type="button"
            className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
          >
            Buy Now
          </button>
        </form>
      </div>
    </a>
  );
}

export default ProductCard;
