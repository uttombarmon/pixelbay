"use client";
import { extractText } from "@/app/utils/ExtractWords";
import SearchFiltering from "@/components/customs/SearchFiltering/SearchFiltering";
import SearchProducts from "@/components/customs/SearchFiltering/SearchProducts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const SearchPageComponent = () => {
  const [searchText, setSearchText] = useState("");
  const searchParam = useSearchParams();
  const searchParamText = searchParam?.get("s");
  // console.log(searchParamText);
  useEffect(() => {
    const fetchParams = () => {
      if (searchParamText) {
        const extractString = extractText(searchParamText);
        setSearchText(extractString);
      }
    };
    fetchParams();
  });
  return (
    <div className="w-full h-[calc(100vh-64px)] flex px-2">
      {/* Left Sidebar (fixed, no scroll) */}
      <div className="w-1/5 h-full overflow-hidden">
        <SearchFiltering
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </div>

      {/* Right Content (scrollable) */}
      <div className="w-4/5 h-full overflow-y-auto scroll-smooth">
        <h1 className=" w-fit text-lg lg:text-xl xl:text-2xl font-bold mx-auto py-2">
          Search <span className="text-red-400">{searchText}</span>
        </h1>
        <ScrollArea className=" w-full min-h-screen h-auto  border-b-2 border-amber-900">
          <Suspense fallback={<div>Loading search…</div>}>
            <SearchProducts />
          </Suspense>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SearchPageComponent;
