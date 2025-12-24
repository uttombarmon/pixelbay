"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const PriceRangeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [min, setMin] = useState(searchParams.get("minPrice") || "");
  const [max, setMax] = useState(searchParams.get("maxPrice") || "");

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (min) params.set("minPrice", min);
    else params.delete("minPrice");

    if (max) params.set("maxPrice", max);
    else params.delete("maxPrice");

    router.push(`/search?${params.toString()}`);
  };

  const handleReset = () => {
    setMin("");
    setMax("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("minPrice");
    params.delete("maxPrice");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <details open className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50 shadow-sm transition-all duration-300">
      <summary className="flex items-center justify-between gap-2 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100">Price Range</span>
        <ChevronDown className="w-4 h-4 transition-transform group-open:-rotate-180 text-gray-500" />
      </summary>

      <div className="border-t border-gray-100 dark:border-gray-800 p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="MinPrice" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Min</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  id="MinPrice"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  placeholder="0"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 focus:bg-white dark:bg-gray-900 rounded-xl border-gray-200 dark:border-gray-800 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="MaxPrice" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Max</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  id="MaxPrice"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  placeholder="5000"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 focus:bg-white dark:bg-gray-900 rounded-xl border-gray-200 dark:border-gray-800 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleApply}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs"
            >
              Apply
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 rounded-xl text-xs font-bold border-gray-200 dark:border-gray-800"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </details>
  );
};

export default PriceRangeFilter;
