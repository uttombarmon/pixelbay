import React from "react";
import ProductCard from "../../shared/Products/ProductCard";
import Link from "next/link";
import { fetchSuperDeals } from "@/lib/apiClients/fetchHomepageData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const SuperDeals = async () => {
  const productsData = await fetchSuperDeals();

  return (
    <div className="py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-bold mb-4 animate-bounce">
              🔥 Limited Time Offers
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Super Deals
            </h2>
            <p className="text-gray-500 text-lg">
              Unbeatable prices on premium tech
            </p>
          </div>
          <Link href="/search?filter=super-deals">
            <Button variant="outline" className="rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300">
              View All Deals
            </Button>
          </Link>
        </div>

        <Carousel
          className="w-full relative"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {productsData?.length > 0 ? (
              productsData.map((product: any) => (
                <CarouselItem
                  key={product?.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="h-full py-2">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <div className="w-full py-20 text-center text-gray-500 italic">
                No active deals at the moment. Check back soon!
              </div>
            )}
          </CarouselContent>
          <div className="hidden md:flex justify-end gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 border-gray-200" />
            <CarouselNext className="static translate-y-0 h-10 w-10 border-gray-200" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default SuperDeals;
