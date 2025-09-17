import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import CustomerReviewCard from "./CustomerReviewCard";
export const customerReviewDatas = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1571445556382-453d9e858ea9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fHdvbWVufGVufDB8fDB8fHww",
    rating: 5,
    title: "Amazing product!",
    comment:
      "The Apple Vision Pro completely blew me away. The clarity and immersive experience are unlike anything I’ve ever tried.",
    date: "2025-09-12",
    productSlug: "apple-vision-pro",
  },
  {
    id: 2,
    name: "David Lee",
    avatar:
      "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fHww",
    rating: 4,
    title: "Solid performance",
    comment:
      "Samsung Galaxy Z Flip 6 feels premium. Battery life could be better, but the foldable design is top tier.",
    date: "2025-09-10",
    productSlug: "samsung-galaxy-z-flip-6",
  },
  {
    id: 3,
    name: "Emily Carter",
    avatar:
      "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW58ZW58MHx8MHx8fDA%3D",
    rating: 5,
    title: "Crystal clear sound",
    comment:
      "Nothing Ear (3) has insane audio quality for the price. Noise cancellation is surprisingly effective.",
    date: "2025-09-08",
    productSlug: "nothing-ear-3",
  },
  {
    id: 4,
    name: "Michael Brown",
    avatar:
      "https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 3,
    title: "Good but heavy",
    comment:
      "ASUS ROG Ally 2 runs AAA games smoothly, but it’s a bit heavy for long gaming sessions.",
    date: "2025-09-05",
    productSlug: "asus-rog-ally-2",
  },
  {
    id: 5,
    name: "Olivia Smith",
    avatar:
      "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW58ZW58MHx8MHx8fDA%3D",
    rating: 4,
    title: "Great value",
    comment:
      "OnePlus Pad 2 is a perfect balance of performance and price. Handles multitasking with ease.",
    date: "2025-09-03",
    productSlug: "oneplus-pad-2",
  },
];

const CustomerReviews = () => {
  return (
    <div>
      <div className=" flex items-center justify-between py-4 px-4">
        <h1 className=" text-xl md:text-2xl lg:text-3xl font-bold ">
          Customer Reviews
        </h1>
      </div>
      <Carousel className=" w-9/12 md:w-11/12  mx-auto">
        <CarouselContent>
          {customerReviewDatas.map((review) => (
            <CarouselItem
              key={review?.id}
              className=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <CustomerReviewCard review={review} />
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

export default CustomerReviews;
