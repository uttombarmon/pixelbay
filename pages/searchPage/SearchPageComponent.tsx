"use client";

import SearchFiltering from "@/components/customs/SearchFiltering/SearchFiltering";
import SearchProducts from "@/components/customs/SearchFiltering/SearchProducts";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Filter, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const SearchPageComponent = () => {
  const [searchText, setSearchText] = useState("");
  const searchParams = useSearchParams();
  const query = searchParams.get("s") || "";

  useEffect(() => {
    setSearchText(query);
  }, [query]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50/30 dark:bg-gray-950">
      {/* Mobile Filter Trigger - Sticky Bar */}
      <div className="lg:hidden sticky top-16 z-30 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-red-600" />
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {query ? `Results for "${query}"` : "All Products"}
          </span>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full border-gray-200 dark:border-gray-800 font-bold gap-2">
              <Filter className="w-3.5 h-3.5" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[300px] border-r-0">
            <SheetTitle className="sr-only">Product Filters</SheetTitle>
            <SearchFiltering searchText={searchText} setSearchText={setSearchText} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[320px] sticky top-20 h-[calc(100vh-80px)] overflow-hidden shrink-0">
        <SearchFiltering searchText={searchText} setSearchText={setSearchText} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0">
        {/* Header Section */}
        <div className="px-4 py-8 md:px-8 md:py-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-600 bg-red-50 dark:bg-red-950/30 px-3 py-1 rounded-full w-fit">
                  <LayoutGrid className="w-3 h-3" /> Shop Collection
                </div>
                <h1 className="text-2xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                  {query ? (
                    <>Searching for <span className="text-red-600">"{query}"</span></>
                  ) : (
                    "Explore all Gadgets"
                  )}
                </h1>
                <p className="text-gray-500 font-medium text-sm md:text-lg max-w-2xl">
                  {query
                    ? `Showing our best matches for your search. Use filters to narrow down the perfect tech for you.`
                    : "Discover the latest tech, gadgets, and accessories handpicked for quality and performance."}
                </p>
              </div>

              {/* View Toggles - Aesthetic for now */}
              <div className="hidden sm:flex items-center bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-xl">
                <button className="p-2 bg-white dark:bg-gray-700 shadow-sm rounded-lg text-red-600">
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Grid */}
            <div className="relative pb-20">
              <Suspense
                fallback={
                  <div className="w-full py-20 flex flex-col items-center justify-center gap-4 text-gray-400">
                    <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
                    <p className="font-bold animate-pulse">Syncing catalog...</p>
                  </div>
                }
              >
                <SearchProducts />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPageComponent;
