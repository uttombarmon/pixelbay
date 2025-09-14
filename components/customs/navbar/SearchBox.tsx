"use client";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import SearchField from "./Search";

const SearchBox = () => {
  const [open, setClose] = useState(false);
  const handleSearchField = () => {
    setClose(!open);
  };
  return (
    <div className="flex  self-center">
      {!open ? (
        <SearchIcon
          onClick={handleSearchField}
          className=" ml-2 mt-2 text-gray-500"
        />
      ) : (
        <SearchField></SearchField>
      )}
    </div>
  );
};

export default SearchBox;
