"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../shared/Products/ProductCard";
import { Loader2, PackageSearch } from "lucide-react";

const SearchProducts = () => {
  const [gadgets, setGadgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchGadgets = async () => {
      setLoading(true);
      try {
        const queryParams = searchParams.toString();
        const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/search?${queryParams}`);
        if (!response.ok) throw new Error("Search failed");
        const products = await response.json();
        setGadgets(products);
      } catch (err) {
        console.error("Error fetching gadgets:", err);
        setGadgets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGadgets();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center gap-4 text-gray-500">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
        <p className="font-medium animate-pulse">Hunting for pixels...</p>
      </div>
    );
  }

  if (gadgets.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center gap-6 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-full">
          <PackageSearch className="w-16 h-16 text-gray-400" />
        </div>
        <div className="max-w-md">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No results found</h3>
          <p className="text-gray-500">
            We couldn't find any gadgets matching your criteria. Try adjusting your filters or searching for something else.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {gadgets.map((product) => (
        <ProductCard key={product.id || product.variantId} product={product} />
      ))}
    </div>
  );
};

export default SearchProducts;
