import Link from "next/link";

export const homepageCategories = [
  {
    name: "Smartphones & Accessories",
    slug: "smartphones-accessories",
    icon: "📱",
  },
  {
    name: "Laptops & Notebooks",
    slug: "laptops-notebooks",
    icon: "💻",
  },
  {
    name: "Tablets & iPads",
    slug: "tablets-ipads",
    icon: "📲",
  },
  {
    name: "Smartwatches & Wearables",
    slug: "smartwatches-wearables",
    icon: "⌚",
  },
  {
    name: "Headphones & Earbuds",
    slug: "headphones-earbuds",
    icon: "🎧",
  },
  {
    name: "Gaming Consoles & Accessories",
    slug: "gaming-consoles-accessories",
    icon: "🎮",
  },
  {
    name: "Cameras & Drones",
    slug: "cameras-drones",
    icon: "📸",
  },
  {
    name: "Smart Home Devices",
    slug: "smart-home-devices",
    icon: "🏠",
  },
];

export default function Categories() {
  return (
    <div className=" my-8 border rounded-lg shadow-md">
      <h1 className=" text-xl md:text-2xl lg:text-3xl font-bold">
        Top Category Gadgets
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {homepageCategories.map((category) => (
          <Link
            href={`/search?s=${category.slug}`}
            key={category.slug}
            className="flex flex-wrap items-center justify-center border p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-500 overflow-hidden relative h-20"
          >
            <p className=" relative">
              <span className="text-6xl">{category.icon}</span>
            </p>
            <p className="absolute bg-black/50 w-full h-full bottom-0 left-0 text-white p-1  flex justify-center">
              <span className="mt-2 text-sm lg:text-lg font-semibold self-center">
                {category.name}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
