"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchCategories } from "@/lib/apiClients/fetchHomepageData";
import { ChevronDown, RefreshCw } from "lucide-react";

const CategoriesFilter = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("category") === slug) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`/search?${params.toString()}`);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <details open className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50 shadow-sm transition-all duration-300">
      <summary className="flex items-center justify-between gap-2 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100">Categories</span>
        <ChevronDown className="w-4 h-4 transition-transform group-open:-rotate-180 text-gray-500" />
      </summary>

      <div className="border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50/50 dark:bg-gray-900/30">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            {activeCategory ? "1 Selected" : "None Selected"}
          </span>
          {activeCategory && (
            <button
              onClick={handleReset}
              type="button"
              className="text-[10px] font-bold text-red-600 hover:text-red-700 underline underline-offset-4"
            >
              Reset
            </button>
          )}
        </div>

        <div className="p-4">
          <div className="flex flex-col gap-2 overflow-y-auto max-h-60 pr-2 custom-scrollbar">
            {loading ? (
              <div className="py-4 flex justify-center">
                <RefreshCw className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            ) : (
              categories.map((cat) => (
                <label
                  key={cat.id}
                  className="group flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="category"
                      checked={activeCategory === cat.slug}
                      onChange={() => handleCategoryChange(cat.slug)}
                      className="size-4 rounded-full border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className={`text-sm font-medium transition-colors ${activeCategory === cat.slug ? "text-red-600" : "text-gray-600 dark:text-gray-400"
                      }`}>
                      {cat.name}
                    </span>
                  </div>
                  {cat.productCount > 0 && (
                    <span className="text-[10px] font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {cat.productCount}
                    </span>
                  )}
                </label>
              ))
            )}
          </div>
        </div>
      </div>
    </details>
  );
};

export default CategoriesFilter;
