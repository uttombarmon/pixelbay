"use client";

import React from "react";
import CategoriesFilter from "./CategoriesFilter";
import SortByFilter from "./SortByFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import { Search, XCircle, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchFiltering = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (s: string) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchTextChange = (value: string): void => {
    setSearchText(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchText) params.set("s", searchText);
    else params.delete("s");
    router.push(`/search?${params.toString()}`);
  };

  const handleClearAll = () => {
    setSearchText("");
    router.push("/search");
  };

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="w-full h-full bg-white dark:bg-gray-950 flex flex-col border-r border-gray-100 dark:border-gray-800">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-black tracking-tight text-gray-900 dark:text-white uppercase">Filters</h2>
        </div>
        {hasFilters && (
          <button
            onClick={handleClearAll}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1"
          >
            Clear All <XCircle className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Search Refinement */}
        <section className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Refine Search</h4>
          <form onSubmit={handleSearchSubmit} className="relative group">
            <input
              value={searchText}
              onChange={(e) => handleSearchTextChange(e.target.value)}
              type="text"
              placeholder="Deep search..."
              className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 dark:bg-gray-900 rounded-2xl border-transparent focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 shadow-inner"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-600 transition-colors" />
          </form>
        </section>

        {/* Filters Grid */}
        <div className="space-y-6 pb-20">
          <CategoriesFilter />
          <SortByFilter />
          <PriceRangeFilter />
        </div>
      </div>
    </div>
  );
};

export default SearchFiltering;
