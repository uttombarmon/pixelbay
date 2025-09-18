import SearchFiltering from "@/components/customs/SearchFiltering/SearchFiltering";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const SearchPageComponent = () => {
  return (
    <div className="w-full h-[calc(100vh-64px)] flex px-2">
      {/* Left Sidebar (fixed, no scroll) */}
      <div className="w-1/4 h-full overflow-hidden">
        <SearchFiltering />
      </div>

      {/* Right Content (scrollable) */}
      <div className="w-3/4 h-full overflow-y-auto">
        <ScrollArea className="bg-amber-600 w-full min-h-screen h-auto border-b-2 border-amber-900">
          {/* Your scrollable content here */}
        </ScrollArea>
      </div>
    </div>
  );
};

export default SearchPageComponent;
