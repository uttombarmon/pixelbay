import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CustomerReviewCard from "./CustomerReviewCard";
import { fetchFeaturedReviews } from "@/lib/apiClients/fetchHomepageData";

const CustomerReviews = async () => {
  const reviews = await fetchFeaturedReviews();

  return (
    <div className="py-20 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Hear From Our Customers
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto">
            Real feedback from tech enthusiasts who trust PixelBay for their gadget needs.
          </p>
        </div>

        <Carousel
          className="w-full relative"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-6">
            {reviews?.length > 0 ? (
              reviews.map((review: any) => (
                <CarouselItem
                  key={review.id}
                  className="pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full py-4">
                    <CustomerReviewCard review={review} />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <div className="w-full py-20 text-center text-gray-500 italic">
                No featured reviews yet. Be the first to review!
              </div>
            )}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-12">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 border-2 border-gray-100 bg-gray-50 hover:bg-red-50 hover:border-red-200 transition-all" />
            <CarouselNext className="static translate-y-0 h-12 w-12 border-2 border-gray-100 bg-gray-50 hover:bg-red-50 hover:border-red-200 transition-all" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CustomerReviews;
