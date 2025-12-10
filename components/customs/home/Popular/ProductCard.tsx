import { productsData } from "@/types/ProductCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductCard({ product }: { product: productsData }) {
  return (
    <Link
      href="#"
      className="group relative block overflow-hidden rounded-xl h-full"
    >
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
          src={product?.productImage}
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
    </Link>
  );
}

export default ProductCard;
