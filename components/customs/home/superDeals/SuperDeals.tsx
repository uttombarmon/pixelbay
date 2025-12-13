import React from "react";
import ProductCard from "../../shared/Products/ProductCard";
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
    id: 7,
    title: "Nintendo Switch OLED",
    slug: "nintendo-switch-oled",
    discount: 10,
    orginal_price: 349.0,
    price: 314.1,
    currency: "USD",
    image: "https://m.media-amazon.com/images/I/61nqNujSF2L._AC_UY218_.jpg",
    category: "Gaming",
  },
  {
    id: 8,
    title: "GoPro HERO12 Black",
    slug: "gopro-hero12-black",
    discount: 18,
    orginal_price: 449.0,
    price: 368.18,
    currency: "USD",
    image: "https://m.media-amazon.com/images/I/71p5V8+OnfL._AC_UY218_.jpg",
    category: "Cameras",
  },
  {
    id: 9,
    title: "Amazon Kindle Paperwhite",
    slug: "amazon-kindle-paperwhite",
    discount: 15,
    orginal_price: 159.0,
    price: 135.15,
    currency: "USD",
    image: "https://m.media-amazon.com/images/I/613kTHJ4g7L._AC_UY218_.jpg",
    category: "E-Readers",
  },
  {
    id: 10,
    title: "DJI Mini 4 Pro Drone",
    slug: "dji-mini-4-pro",
    discount: 12,
    orginal_price: 759.0,
    price: 667.92,
    currency: "USD",
    image: "https://m.media-amazon.com/images/I/61uXaDuE-iL._AC_UL320_.jpg",
    category: "Drones",
  },
  {
    id: 11,
    title: "Razer BlackWidow V4 Pro",
    slug: "razer-blackwidow-v4-pro",
    discount: 20,
    orginal_price: 229.0,
    price: 183.2,
    currency: "USD",
    image: "https://m.media-amazon.com/images/I/81L4FpeS3VL._AC_UY218_.jpg",
    category: "Gaming Accessories",
  },
  {
    id: 12,
    title: "Anker Soundcore Motion X600",
    slug: "anker-soundcore-motion-x600",
    discount: 25,
    orginal_price: 199.0,
    price: 149.25,
    currency: "USD",
    image:
      "https://m.media-amazon.com/images/I/61pjv-70W+L._AC_SY300_SX300_.jpg",
    category: "Speakers",
  },
];

const SuperDeals = () => {
  return (
    <div>
      <div className=" flex items-center justify-between py-4 px-4">
        <h1 className=" text-xl md:text-2xl lg:text-3xl font-bold ">
          Super Deals
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

export default SuperDeals;
