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
import { productsData } from "@/types/ProductCard";
import { db } from "@/lib/db/drizzle";
import {
  products as productsTable,
  productVariants,
} from "@/lib/db/schema/schema";
import { eq, sql } from "drizzle-orm";

const PopularProducts = async () => {
  const productsData = await db
    .select({
      id: productsTable.id,
      title: productsTable.title,
      slug: productsTable.slug,
      status: productsTable.status,
      price: sql`MIN(${productVariants.price})`.as("price"),
    })
    .from(productsTable)
    .leftJoin(productVariants, eq(productVariants.product_id, productsTable.id))
    .where(eq(productsTable.status, "active"))
    .groupBy(
      productsTable.id,
      productsTable.title,
      productsTable.slug,
      productsTable.status
    );

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
