import React from "react";

const PriceRangeFilter = () => {
  return (
    <details className="group relative overflow-hidden rounded border border-gray-600 dark:border-gray-300 shadow-sm">
      <summary className="flex items-center justify-between gap-2 p-3 transition-colors [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-medium"> Price </span>

        <span className="transition-transform group-open:-rotate-180">
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </summary>

      <div className="divide-y divide-gray-600 dark:divide-gray-300 border-t border-gray-600 dark:border-gray-300 ">
        <div className="flex items-center justify-between px-3 py-2">
          {/* <span className="text-sm text-gray-700"> Max price is $600 </span> */}

          <button
            type="button"
            className="text-sm  underline transition-colors "
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-3 p-3">
          <label htmlFor="MinPrice">
            <span className="text-sm "> Min </span>

            <input
              type="number"
              id="MinPrice"
              defaultValue={0}
              className="mt-0.5 w-full rounded border-gray-600 dark:border-gray-300 shadow-sm sm:text-sm"
            />
          </label>

          <label htmlFor="MaxPrice">
            <span className="text-sm "> Max </span>

            <input
              type="number"
              id="MaxPrice"
              defaultValue={0}
              className="mt-0.5 w-full rounded border-gray-600 dark:border-gray-300 shadow-sm sm:text-sm"
            />
          </label>
        </div>
      </div>
    </details>
  );
};

export default PriceRangeFilter;
