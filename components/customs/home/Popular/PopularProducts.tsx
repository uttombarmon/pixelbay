import React from "react";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
export const productsData = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro",
    slug: "iphone-15-pro",
    price: 999.0,
    currency: "USD",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-iphone-15-pro-bluetitanium-202412?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=dkRYUzNIZktUUlpiYVJibmhmNTFOYmhlWHR6Z2hrNUs1UVRoRzZ0RlJ5R3ZKSTVIczVqYVVsa1lCSlZGY2NLcC9WNnlkWHdRcHhGRmY4Y0ZKQm9MNllKWlgzZzdyUXEzcGE2bUxYbWVvdHF5WWtMMEhBUHhVMk9yRU8vNTk5KzE",
    category: "Smartphones",
  },
  {
    id: 2,
    title: "Samsung Galaxy S23 Ultra",
    slug: "samsung-galaxy-s23-ultra",
    price: 1199.0,
    currency: "USD",
    image:
      "https://image-us.samsung.com/us/smartphones/galaxy-s23-ultra/images/gallery/phantomblack/01-DM3-PhantomBlack-PDP-1600x1200.jpg?$default-400-jpg$",
    category: "Smartphones",
  },
  {
    id: 3,
    title: "MacBook Air M3",
    slug: "macbook-air-m3",
    price: 1299.0,
    currency: "USD",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-15-digitalmat-gallery-6-202503?wid=728&hei=666&fmt=png-alpha&.v=Q3BBdHFVMXlUN2xVZERKS2t4a0U2MGEvQmI5ZjZseVhPSEJZVkYxZ09JdG1rMDNtTGpFOG9kR2JjS3UwZGZGOHhaVXN2UmVLZWxyY01GTDZmcDYxbitZbnd2dEloRUI0QkxmQVJESllzWlNpc0xyc0lFUEtVWTdEaWNDaTAzS1g",
    category: "Laptops",
  },
  {
    id: 4,
    title: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    price: 399.0,
    currency: "USD",
    image:
      "https://d1ncau8tqf99kp.cloudfront.net/converted/103364_original_local_1200x1050_v3_converted.webp",
    category: "Headphones",
  },
  {
    id: 5,
    title: "Apple Watch Series 9",
    slug: "apple-watch-series-9",
    price: 449.0,
    currency: "USD",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-41-stainless-gold-sport-band-clay-s9?wid=400&hei=400&fmt=jpeg&qlt=90&.v=c3VYVzkzWnlnUmlER1R5QVZJZ3pqR0F6Tk1xOVROcFhUSnIvTmV6T2hLdzRkWnVKeUV2azErODlVL3dWM3R5SFEvTWVOYWdqZjhybCs3MU90OWExNXdYUldRZVYxMHFkRFZrQVZuaWMwSkJEdFpCOTlMdTBjQVpBZ0hsMC9kc0w",
    category: "Wearables",
  },
  {
    id: 6,
    title: "Logitech MX Master 3S",
    slug: "logitech-mx-master-3s",
    price: 99.0,
    currency: "USD",
    image:
      "https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-top-view-graphite-new-1.png",
    category: "Accessories",
  },
];

const PopularProducts = () => {
  return (
    <div>
      <div className=" flex items-center justify-between py-4 px-4">
        <h1 className=" text-xl md:text-2xl lg:text-3xl font-bold ">
          Popular Products
        </h1>
        <Button variant="outline" className=" ml-4 mb-4">
          View All
        </Button>
      </div>
      <Carousel className=" w-9/12 md:w-11/12  mx-auto">
        <CarouselContent>
          {productsData.map((product) => (
            <CarouselItem
              key={product?.id}
              className=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ProductCard key={product.id} product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        
      </div> */}
    </div>
  );
};

export default PopularProducts;
