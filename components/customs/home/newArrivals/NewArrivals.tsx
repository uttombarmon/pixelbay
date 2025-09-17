import React from "react";
import ProductCard from "../Popular/ProductCard";
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
    id: 13,
    title: "Apple Vision Pro",
    slug: "apple-vision-pro",
    price: 3499.0,
    currency: "USD",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/vision-pro-alp-header-202406?wid=2880&hei=960&fmt=jpeg&qlt=90&.v=SnhhQkxhV0UycTRXbEYzR1FuV1FVSFlCZndSU2xJQWo5OXhjVmp4ZjAyZStVNDA5RVVlL2xRd2sxQ2huWTBLdnVUb3VPa2FUZVhQMFhDQnVBMWhwQXdKdnRBSDd3QVhwYXRrSTdabUFoeFE",
    category: "AR/VR",
    date: "2025-09-10",
  },
  {
    id: 14,
    title: "Samsung Galaxy Z Flip 6",
    slug: "samsung-galaxy-z-flip-6",
    price: 1099.0,
    currency: "USD",
    image:
      "https://images.samsung.com/is/image/samsung/assets/us/smartphones/galaxy-z-flip6/07082025/galaxy-z-flip6-ft02-kv_DT.jpg?$1440_N_JPG$",
    category: "Smartphones",
    date: "2025-09-05",
  },
  {
    id: 15,
    title: "Nothing Ear (3)",
    slug: "nothing-ear-3",
    price: 179.0,
    currency: "USD",
    image:
      "https://cdn.sanity.io/images/gtd4w1cq/production/2cbb39efe5c91b8199a4259ada1d112d2e312617-396x396.jpg?auto=format",
    category: "Earbuds",
    date: "2025-09-01",
  },
  {
    id: 16,
    title: "OnePlus Pad 2",
    slug: "oneplus-pad-2",
    price: 599.0,
    currency: "USD",
    image:
      "https://image01.oneplus.net/media/202407/09/fba6399523cbd6126ddcedb6920c9046.png?x-amz-process=image/format,webp/quality,Q_80",
    category: "Tablets",
    date: "2025-08-28",
  },
  {
    id: 17,
    title: "ASUS ROG Ally 2",
    slug: "asus-rog-ally-2",
    price: 799.0,
    currency: "USD",
    image:
      "https://dlcdnwebimgs.asus.com/gain/828CE44B-7B48-4F48-88F7-88BEA7D13C5D/w1000/h732",
    category: "Gaming",
    date: "2025-08-20",
  },
  {
    id: 18,
    title: "Fitbit Charge 7",
    slug: "fitbit-charge-7",
    price: 199.0,
    currency: "USD",
    image:
      "https://www.androidauthority.com/wp-content/uploads/2023/09/Fitbit-Charge-6-watch-face-scaled-840w-472h.jpg.webp",
    category: "Wearables",
    date: "2025-08-15",
  },
];

const NewArrivals = () => {
  return (
    <div className="py-4">
      <div className=" flex items-center justify-between py-4 px-4">
        <h1 className=" text-xl md:text-2xl lg:text-3xl font-bold ">
          New Arrivals
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

export default NewArrivals;
