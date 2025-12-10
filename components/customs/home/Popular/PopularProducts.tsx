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
import { fetchPopularProducts } from "@/lib/apiClients/fetchPopularProducts";

const PopularProducts = async () => {
  const productsData = await fetchPopularProducts();

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
          {productsData?.length > 0 &&
            productsData?.map((product: any) => (
              <CarouselItem
                key={product?.id}
                className=" flex md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ProductCard key={product.id} product={product as any} />
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
