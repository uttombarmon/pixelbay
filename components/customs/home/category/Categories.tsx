"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCategories } from "@/lib/apiClients/fetchHomepageData";
import { MoveRight } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-12 px-4 md:px-8 bg-gray-50/50">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 md:px-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Explore Categories
          </h2>
          <p className="text-gray-500 text-lg">
            Find the perfect gadgets by category
          </p>
        </div>
        <Link
          href="/search"
          className="group flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
        >
          View All <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {categories.map((category) => (
          <Link
            href={`/search?s=${category.slug}`}
            key={category.id}
            className="group relative flex flex-col items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-x-0 bottom-0 h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-red-50 transition-colors duration-300">
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {category.metadata?.icon || "📱"}
              </span>
            </div>
            <span className="text-sm font-bold text-gray-800 text-center line-clamp-2">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
