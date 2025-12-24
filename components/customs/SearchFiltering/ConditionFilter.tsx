"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface Condition {
    condition: string;
    count: number;
}

const ConditionFilter = ({ conditions, loading }: { conditions: Condition[], loading: boolean }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeConditions = searchParams.get("conditions")?.split(",").filter(Boolean) || [];

    const handleConditionToggle = (condition: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.get("conditions")?.split(",").filter(Boolean) || [];

        let next;
        if (current.includes(condition)) {
            next = current.filter((c) => c !== condition);
        } else {
            next = [...current, condition];
        }

        if (next.length > 0) {
            params.set("conditions", next.join(","));
        } else {
            params.delete("conditions");
        }

        router.push(`/search?${params.toString()}`);
    };

    const formatCondition = (c: string) => c.replace("_", " ").toUpperCase();

    if (!loading && conditions.length === 0) return null;

    return (
        <details className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50 shadow-sm transition-all duration-300">
            <summary className="flex items-center justify-between gap-2 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors [&::-webkit-details-marker]:hidden">
                <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100">Condition</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:-rotate-180 text-gray-500" />
            </summary>

            <div className="border-t border-gray-100 dark:border-gray-800 p-4">
                <div className="flex flex-col gap-2">
                    {loading ? (
                        <div className="space-y-2 animate-pulse">
                            {[1, 2, 3].map(i => <div key={i} className="h-8 bg-gray-100 dark:bg-gray-800 rounded-lg w-full"></div>)}
                        </div>
                    ) : (
                        conditions.map((c) => (
                            <label
                                key={c.condition}
                                className="group flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={activeConditions.includes(c.condition)}
                                        onChange={() => handleConditionToggle(c.condition)}
                                        className="size-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                    />
                                    <span className={`text-xs font-bold transition-colors ${activeConditions.includes(c.condition) ? "text-red-600" : "text-gray-500 dark:text-gray-400"
                                        }`}>
                                        {formatCondition(c.condition)}
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400">
                                    {c.count}
                                </span>
                            </label>
                        ))
                    )}
                </div>
            </div>
        </details>
    );
};

export default ConditionFilter;
