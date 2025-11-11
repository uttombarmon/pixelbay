"use client";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function SearchField() {
  const [search, setSearch] = useState("");
  const handleSearch = (s: string) => {
    setSearch(s);
  };
  return (
    <label htmlFor="Search">
      <div className="relative">
        <input
          type="text"
          id="Search"
          defaultValue={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="mt-0.5 w-full py-2 px-1 rounded border-gray-900 bg-gray-100 dark:bg-gray-600 pe-10 shadow-lg"
        />

        <span className="absolute inset-y-0 right-2 grid w-8 place-content-center">
          <Link
            href={`/search?s=${search}`}
            type="button"
            aria-label="Submit"
            className="rounded-full p-1.5 text-gray-700 dark:text-gray-100 transition-colors hover:bg-gray-100"
          >
            <SearchIcon className="h-6 w-6" />
          </Link>
        </span>
      </div>
    </label>
  );
}

export default SearchField;
