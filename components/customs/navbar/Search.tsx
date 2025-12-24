"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SearchField() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?s=${encodeURIComponent(search)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-sm group">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search gadgets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 py-1"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 group-focus-within:text-red-600 transition-colors"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}

export default SearchField;
