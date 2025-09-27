import React from "react";
import CategoriesFilter from "./CategoriesFilter";
import SortByFilter from "./SortByFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import { Button } from "@/components/ui/button";

const SearchFiltering = () => {
  return (
    <div className=" w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 h-full">
      {/* Search Input form  */}
      <form className=" w-4/5  mx-auto flex justify-center items-center py-4">
        <label htmlFor="Search">
          {/* <span className="text-sm font-medium text-gray-700"> Search </span> */}

          <div className="relative ">
            <input
              type="text"
              id="Search"
              className="mt-0.5 w-full rounded border-2 border-gray-300 dark:border-gray-600 pe-10 shadow-sm text-sm md:text-xl "
            />

            <span className="absolute inset-y-0 right-2 grid w-8 place-content-center ">
              <button
                type="submit"
                aria-label="Submit"
                className="rounded-full p-1  transition-colors hover:bg-gray-300 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </label>
      </form>

      <div className="space-y-4 w-4/5 mx-auto">
        {/* categories */}
        <CategoriesFilter />
        {/* sort by  */}
        <SortByFilter />
        {/* price range */}
        <PriceRangeFilter />
        <div className=" w-full flex justify-center">
          <Button className=" mx-auto w-fit outline bg-red-400 text-gray-300">
            Find Gadgets
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFiltering;
