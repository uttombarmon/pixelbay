"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface Brand {
    brand: string;
    count: number;
}

const BrandsFilter = ({ brands, loading }: { brands: Brand[], loading: boolean }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeBrands = searchParams.get("brands")?.split(",").filter(Boolean) || [];

    const handleBrandToggle = (brand: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentBrands = params.get("brands")?.split(",").filter(Boolean) || [];

        let newBrands;
        if (currentBrands.includes(brand)) {
            newBrands = currentBrands.filter((b) => b !== brand);
        } else {
            newBrands = [...currentBrands, brand];
        }

        if (newBrands.length > 0) {
            params.set("brands", newBrands.join(","));
        } else {
            params.delete("brands");
        }

        router.push(`/search?${params.toString()}`);
    };

    if (!loading && brands.length === 0) return null;

    return (
        <details className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50 shadow-sm transition-all duration-300">
            <summary className="flex items-center justify-between gap-2 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors [&::-webkit-details-marker]:hidden">
                <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100">Brands</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:-rotate-180 text-gray-500" />
            </summary>

            <div className="border-t border-gray-100 dark:border-gray-800 p-4">
                <div className="flex flex-col gap-2 overflow-y-auto max-h-60 pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="space-y-2 animate-pulse">
                            {[1, 2, 3, 4].map(i => <div key={i} className="h-8 bg-gray-100 dark:bg-gray-800 rounded-lg w-full"></div>)}
                        </div>
                    ) : (
                        brands.map((b) => (
                            <label
                                key={b.brand}
                                className="group flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={activeBrands.includes(b.brand)}
                                        onChange={() => handleBrandToggle(b.brand)}
                                        className="size-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                    />
                                    <span className={`text-sm font-medium transition-colors ${activeBrands.includes(b.brand) ? "text-red-600" : "text-gray-600 dark:text-gray-400"
                                        }`}>
                                        {b.brand}
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400">
                                    {b.count}
                                </span>
                            </label>
                        ))
                    )}
                </div>
            </div>
        </details>
    );
};

export default BrandsFilter;
