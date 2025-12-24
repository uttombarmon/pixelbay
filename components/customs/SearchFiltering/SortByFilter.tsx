"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ArrowDownAz, ArrowUp10, ArrowDown10, Flame } from "lucide-react";

const SortByFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSort = searchParams.get("sort") || "newest";

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    router.push(`/search?${params.toString()}`);
  };

  const sortOptions = [
    { label: "Newest Arrivals", value: "newest", icon: <ArrowDownAz className="w-4 h-4 text-blue-500" /> },
    { label: "Price: Low to High", value: "price-asc", icon: <ArrowUp10 className="w-4 h-4 text-emerald-500" /> },
    { label: "Price: High to Low", value: "price-desc", icon: <ArrowDown10 className="w-4 h-4 text-rose-500" /> },
    { label: "Trending Now", value: "popular", icon: <Flame className="w-4 h-4 text-orange-500" /> },
  ];

  return (
    <details open className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50 shadow-sm transition-all duration-300">
      <summary className="flex items-center justify-between gap-2 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100">Sort By</span>
        <ChevronDown className="w-4 h-4 transition-transform group-open:-rotate-180 text-gray-500" />
      </summary>

      <div className="border-t border-gray-100 dark:border-gray-800 p-2">
        <div className="flex flex-col gap-1">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all text-left ${activeSort === option.value
                  ? "bg-red-50 dark:bg-red-950/20 text-red-600 font-bold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium"
                }`}
            >
              <span className={activeSort === option.value ? "opacity-100" : "opacity-60"}>
                {option.icon}
              </span>
              <span className="text-sm">{option.label}</span>
              {activeSort === option.value && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-600 shadow-sm shadow-red-500/50"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </details>
  );
};

export default SortByFilter;
