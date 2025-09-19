import SearchFiltering from "@/components/customs/SearchFiltering/SearchFiltering";
import SearchProducts from "@/components/customs/SearchFiltering/SearchProducts";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { Suspense } from "react";

const SearchPageComponent = () => {
  return (
    <div className="w-full h-[calc(100vh-64px)] flex px-2">
      {/* Left Sidebar (fixed, no scroll) */}
      <div className="w-1/5 h-full overflow-hidden">
        <SearchFiltering />
      </div>

      {/* Right Content (scrollable) */}
      <div className="w-4/5 h-full overflow-y-auto">
        <h1 className=" w-fit text-lg lg:text-xl xl:text-2xl font-bold mx-auto py-2">
          Gadgets...
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
