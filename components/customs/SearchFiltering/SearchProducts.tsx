"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/customs/home/Popular/ProductCard";
import { useSearchParams } from "next/navigation";
// import { productsData } from "@/types/ProductCard";
// import { productsData } from "../home/newArrivals/NewArrivals";
// export const productsDatas = [
//   {
//     id: 1,
//     title: "Apple iPhone 15 Pro",
//     slug: "iphone-15-pro",
//     price: 999.0,
//     currency: "USD",
//     image:
//       "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-iphone-15-pro-bluetitanium-202412?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=dkRYUzNIZktUUlpiYVJibmhmNTFOYmhlWHR6Z2hrNUs1UVRoRzZ0RlJ5R3ZKSTVIczVqYVVsa1lCSlZGY2NLcC9WNnlkWHdRcHhGRmY4Y0ZKQm9MNllKWlgzZzdyUXEzcGE2bUxYbWVvdHF5WWtMMEhBUHhVMk9yRU8vNTk5KzE",
//     category: "Smartphones",
//   },
//   {
//     id: 2,
//     title: "Samsung Galaxy S23 Ultra",
//     slug: "samsung-galaxy-s23-ultra",
//     price: 1199.0,
//     currency: "USD",
//     image:
//       "https://image-us.samsung.com/us/smartphones/galaxy-s23-ultra/images/gallery/phantomblack/01-DM3-PhantomBlack-PDP-1600x1200.jpg?$default-400-jpg$",
//     category: "Smartphones",
//   },
//   {
//     id: 3,
//     title: "MacBook Air M3",
//     slug: "macbook-air-m3",
//     price: 1299.0,
//     currency: "USD",
//     image:
//       "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-15-digitalmat-gallery-6-202503?wid=728&hei=666&fmt=png-alpha&.v=Q3BBdHFVMXlUN2xVZERKS2t4a0U2MGEvQmI5ZjZseVhPSEJZVkYxZ09JdG1rMDNtTGpFOG9kR2JjS3UwZGZGOHhaVXN2UmVLZWxyY01GTDZmcDYxbitZbnd2dEloRUI0QkxmQVJESllzWlNpc0xyc0lFUEtVWTdEaWNDaTAzS1g",
//     category: "Laptops",
//   },
//   {
//     id: 4,
//     title: "Sony WH-1000XM5",
//     slug: "sony-wh-1000xm5",
//     price: 399.0,
//     currency: "USD",
//     image:
//       "https://d1ncau8tqf99kp.cloudfront.net/converted/103364_original_local_1200x1050_v3_converted.webp",
//     category: "Headphones",
//   },
//   {
//     id: 5,
//     title: "Apple Watch Series 9",
//     slug: "apple-watch-series-9",
//     price: 449.0,
//     currency: "USD",
//     image:
//       "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-41-stainless-gold-sport-band-clay-s9?wid=400&hei=400&fmt=jpeg&qlt=90&.v=c3VYVzkzWnlnUmlER1R5QVZJZ3pqR0F6Tk1xOVROcFhUSnIvTmV6T2hLdzRkWnVKeUV2azErODlVL3dWM3R5SFEvTWVOYWdqZjhybCs3MU90OWExNXdYUldRZVYxMHFkRFZrQVZuaWMwSkJEdFpCOTlMdTBjQVpBZ0hsMC9kc0w",
//     category: "Wearables",
//   },
//   {
//     id: 6,
//     title: "Logitech MX Master 3S",
//     slug: "logitech-mx-master-3s",
//     price: 99.0,
//     currency: "USD",
//     image:
//       "https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-top-view-graphite-new-1.png",
//     category: "Accessories",
//   },
// ];
const SearchProducts = () => {
  const [gadgets, setGadgets] = useState();
  const searchParam = useSearchParams();
  const searchParamText = searchParam?.get("s");
  console.log(searchParamText);
  useEffect(() => {
    const gadgetsSetFunc = async () => {
      const response = await fetch(`/api/search?s=${searchParamText}`);
      const products = await response.json();
      console.log(products);
      // if (searchParamText) {
      //   const sortdata = productsDatas.filter(
      //     (product) =>
      //       product?.title
      //         ?.toLowerCase()
      //         .includes(searchParamText.toLowerCase()) ||
      //       product?.category
      //         ?.toLowerCase()
      //         .includes(searchParamText.toLowerCase())
      //   );
      //   console.log(sortdata);
      //   setGadgets(sortdata);
      // } else {
      //   setGadgets(productsDatas);
      // }
    };
    gadgetsSetFunc();
  }, [searchParamText]);

  return (
    <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-2">
      {/* Your scrollable content here */}
      {/* {gadgets?.map((product) => (
        <ProductCard key={product?.id} product={product} />
      ))} */}
    </div>
  );
};

export default SearchProducts;
