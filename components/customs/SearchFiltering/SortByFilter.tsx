import React from "react";

const SortByFilter = () => {
  return (
    <details className="group relative overflow-hidden rounded border border-gray-300 shadow-sm">
      <summary className="flex items-center justify-between gap-2 p-3 transition-colors  [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-medium"> Sort By</span>

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
          {/* <span className="text-sm text-gray-700"> 0 Selected </span> */}

          <button
            type="button"
            className="text-sm  underline transition-colors "
          >
            Reset
          </button>
        </div>

        <fieldset className="p-3">
          <legend className="sr-only">Checkboxes</legend>

          <div className="flex flex-col items-start gap-3">
            <label htmlFor="date" className="inline-flex items-center gap-3">
              <input
                type="checkbox"
                className="size-5 rounded border-gray-600 dark:border-gray-300 shadow-sm"
                id="date"
              />

              <span className="text-sm font-medium "> Date </span>
            </label>

            <label htmlFor="price" className="inline-flex items-center gap-3">
              <input
                type="checkbox"
                className="size-5 rounded border-gray-600 dark:border-gray-300 shadow-sm"
                id="price"
              />

              <span className="text-sm font-medium "> price </span>
            </label>

            <label htmlFor="hot" className="inline-flex items-center gap-3">
              <input
                type="checkbox"
                className="size-5 rounded border-gray-600 dark:border-gray-300 shadow-sm"
                id="hot"
              />

              <span className="text-sm font-medium"> Hot </span>
            </label>
          </div>
        </fieldset>
      </div>
    </details>
  );
};

export default SortByFilter;
