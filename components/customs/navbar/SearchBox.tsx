"use client";
import React from "react";
import SearchField from "./Search";

const SearchBox = () => {
  return (
    <div className="flex w-full min-w-[200px] lg:min-w-[300px]">
      <SearchField />
    </div>
  );
};

export default SearchBox;
