"use client";

import React, { useEffect, useState } from "react";
import CategoriesFilter from "./CategoriesFilter";
import SortByFilter from "./SortByFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import BrandsFilter from "./BrandsFilter";
import ConditionFilter from "./ConditionFilter";
import { Search, XCircle, Filter, Zap, RefreshCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SearchFiltering = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (s: string) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterMeta, setFilterMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const onSale = searchParams.get("onSale") === "true";

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await fetch("/api/search/filters");
        const data = await res.json();
        setFilterMeta(data);
      } catch (err) {
        console.error("Failed to fetch filter meta:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeta();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchText) params.set("s", searchText);
    else params.delete("s");
    router.push(`/search?${params.toString()}`);
  };

  const handleToggleSale = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) params.set("onSale", "true");
    else params.delete("onSale");
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
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Deep search..."
              className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 dark:bg-gray-900 rounded-2xl border-transparent focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 shadow-inner"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-600 transition-colors" />
          </form>
        </section>

        {/* Quick Toggles */}
        <section className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Quick Filters</h4>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Zap className="w-4 h-4 text-orange-600" />
              </div>
              <Label htmlFor="on-sale" className="text-sm font-bold text-orange-900 dark:text-orange-100 cursor-pointer">Flash Sale</Label>
            </div>
            <Switch
              id="on-sale"
              checked={onSale}
              onCheckedChange={handleToggleSale}
            />
          </div>
        </section>

        {/* Dynamic Filters */}
        <div className="space-y-6 pb-20">
          <CategoriesFilter />
          <BrandsFilter
            brands={filterMeta?.brands || []}
            loading={loading}
          />
          <ConditionFilter
            conditions={filterMeta?.conditions || []}
            loading={loading}
          />
          <SortByFilter />
          <PriceRangeFilter />
        </div>
      </div>
    </div>
  );
};

export default SearchFiltering;
