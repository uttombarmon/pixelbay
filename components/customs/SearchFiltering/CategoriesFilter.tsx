import React from "react";

const CategoriesFilter = () => {
  const categoreisData = [
    {
      id: 1,
      name: "Smartphones",
      slug: "smartphones",
      image: "https://i.postimg.cc/4Nhb0zZZ/smartphone.jpg",
    },
    {
      id: 2,
      name: "Laptops",
      slug: "laptops",
      image: "https://i.postimg.cc/6qf8m6hJ/laptop.jpg",
    },
    {
      id: 3,
      name: "Tablets",
      slug: "tablets",
      image: "https://i.postimg.cc/GmXjft7n/tablet.jpg",
    },
    {
      id: 4,
      name: "Smartwatches",
      slug: "smartwatches",
      image: "https://i.postimg.cc/tCJBNK8m/smartwatch.jpg",
    },
    {
      id: 5,
      name: "Headphones & Earbuds",
      slug: "headphones-earbuds",
      image: "https://i.postimg.cc/1zgtL0RL/headphones.jpg",
    },
    {
      id: 6,
      name: "Gaming Consoles",
      slug: "gaming-consoles",
      image: "https://i.postimg.cc/Y9zZZT3Q/console.jpg",
    },
    {
      id: 7,
      name: "Cameras & Drones",
      slug: "cameras-drones",
      image: "https://i.postimg.cc/hv7yQ9z5/camera.jpg",
    },
    {
      id: 8,
      name: "Accessories",
      slug: "accessories",
      image: "https://i.postimg.cc/g2YmBcPm/accessories.jpg",
    },
    {
      id: 9,
      name: "Monitors & Displays",
      slug: "monitors-displays",
      image: "https://i.postimg.cc/Df7hYvM3/monitor.jpg",
    },
    {
      id: 10,
      name: "Keyboards & Mice",
      slug: "keyboards-mice",
      image: "https://i.postimg.cc/fyH0z2rN/keyboard.jpg",
    },
    {
      id: 11,
      name: "Networking Devices",
      slug: "networking-devices",
      image: "https://i.postimg.cc/kX3B4z8g/router.jpg",
    },
    {
      id: 12,
      name: "Storage Devices",
      slug: "storage-devices",
      image: "https://i.postimg.cc/9Mmp5W4t/storage.jpg",
    },
    {
      id: 13,
      name: "Printers & Scanners",
      slug: "printers-scanners",
      image: "https://i.postimg.cc/vZk3knH6/printer.jpg",
    },
    {
      id: 14,
      name: "Smart Home Gadgets",
      slug: "smart-home",
      image: "https://i.postimg.cc/W1h3zv4c/smart-home.jpg",
    },
    {
      id: 15,
      name: "Portable Speakers",
      slug: "portable-speakers",
      image: "https://i.postimg.cc/50dFGkWZ/speaker.jpg",
    },
    {
      id: 16,
      name: "Wearable Tech",
      slug: "wearable-tech",
      image: "https://i.postimg.cc/jd1Wsjsw/wearable.jpg",
    },
  ];

  return (
    <details className="group relative overflow-hidden rounded border border-gray-300 shadow-sm">
      <summary className="flex items-center justify-between gap-2 p-3 transition-colors  [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-medium"> Categories</span>

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

          <div className="flex flex-col items-start gap-3 overflow-y-auto max-h-64 pr-2">
            {categoreisData.map((categorie) => (
              <label
                key={categorie?.id}
                htmlFor={categorie?.name}
                className="inline-flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  className="size-5 rounded border-gray-600 dark:border-gray-300 shadow-sm"
                  id={categorie?.slug}
                />

                <span className="text-sm font-medium ">
                  {" "}
                  {categorie?.name}{" "}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </details>
  );
};

export default CategoriesFilter;
