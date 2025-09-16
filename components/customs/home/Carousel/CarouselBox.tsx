"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

const CarouselBox = () => {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="h-[400px] md:h-[500px] lg:h-[615px] w-full">
        <CarouselItem className=" relative h-full w-full items-center justify-center text-2xl">
          <Image
            // src={
            //   "https://i.postimg.cc/HnT6BfCX/ady-teenagerinro-s-Q0x-Xx-Qdfe-Y-unsplash.jpg"
            // }
            className=" w-full h-full relative object-cover"
            src={
              "https://images.pexels.com/photos/123335/pexels-photo-123335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            }
            fill
            alt="slide1"
            quality={60}
          />
          <div className="absolute w-full h-full z-10 bg-gradient-to-r from-red-800/50 to-black/50 flex justify-between">
            <div className=" w-full md:w-1/2 relative flex flex-col justify-center h-full text-gray-300 gap-4">
              <p className=" text-gray-200 text-2xl md:text-4xl lg:text-5xl drop-shadow-lg px-4">
                <i className=" text-3xl md:text-5xl lg:text-6xl font-bold">
                  Pixel<span className="text-red-400">Bay</span>,
                </i>
              </p>
              <p className="text-gray-200 text-2xl md:text-4xl lg:text-5xl drop-shadow-lg px-4">
                Where Tech Meets Style
              </p>
              <p className=" text-base md:text-xl lg:text-2xl font-semibold drop-shadow-lg px-4">
                Discover gadgets that define the future.
              </p>
              <div className=" mt-7">
                <button className=" bg-red-600 hover:bg-red-700 text-sm md:text-xl px-4 py-2 rounded-md w-fit ml-4">
                  Shop Now
                </button>
              </div>
            </div>
            <div className=" hidden md:w-1/2 h-full md:flex items-center justify-end mr-20 md:mr-14 lg:mr-20">
              <div className=" hidden lg:block w-[600px] h-[600px] bg-red-400/20 border-2 border-red-400 rounded-full animate-pulse"></div>
              <div className=" hidden md:block lg:hidden w-[400px] h-[400px] bg-red-400/20 border-2 border-red-400 rounded-full animate-pulse"></div>
              {/* <div className=" block md:hidden w-48 h-48 bg-red-400/20 border-2 border-red-400 rounded-full animate-pulse"></div> */}
            </div>
            {/* <div className=" absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className=" w-6 h-6 border-4 border-t-red-400 border-b-red-400 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
              <div className=" text-gray-200 text-sm text-center mt-2">
                Scroll Down
              </div>
            </div> */}
          </div>
        </CarouselItem>
        <CarouselItem className=" relative h-full w-full bg-gray-400 flex items-center justify-center text-2xl">
          <Image
            className=""
            src={
              "https://i.postimg.cc/HnT6BfCX/ady-teenagerinro-s-Q0x-Xx-Qdfe-Y-unsplash.jpg"
            }
            fill
            quality={60}
            alt="slide2"
          />
          <div className="absolute inset-0 bg-gradient-to-r to-red-800/50 from-black/50 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-gray-100 text-2xl md:text-4xl font-bold drop-shadow-lg">
              Upgrade Your Everyday🚀
            </h2>
            <p className="text-gray-200 text-sm md:text-lg mt-2 max-w-2xl">
              Smartphones, laptops & accessories built for now.
            </p>
            <button className=" bg-red-600 hover:bg-red-700 text-sm md:text-xl px-4 py-2 rounded-md w-fit mt-20">
              Shop Now
            </button>
          </div>
        </CarouselItem>
        <CarouselItem className=" relative h-full w-full bg-gray-500 flex items-center justify-center text-2xl">
          <Image
            className=" w-full h-full"
            src={
              "https://images.pexels.com/photos/6473738/pexels-photo-6473738.jpeg?auto=format&fit=crop&w=1350&q=80"
            }
            // src={"https://i.postimg.cc/9XBTGDgD/Designer.png"}
            fill
            quality={60}
            alt="slide3"
          />
          <div className="absolute inset-0 bg-gradient-to-br to-red-800/50 from-black/50 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-gray-100 text-2xl md:text-4xl font-bold drop-shadow-lg">
              Innovation in Your Pocket ✨
            </h2>
            <p className="text-gray-200 text-sm md:text-lg mt-2 max-w-2xl">
              From wearables to power gear — we’ve got you.
            </p>
            <button className=" bg-red-600 hover:bg-red-700 text-sm md:text-xl px-4 py-2 rounded-md w-fit mt-20">
              Shop Now
            </button>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselBox;
// "use client";
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Image from "next/image";
// import React from "react";

// const slides = [
//   {
//     title: "PixelBay • Where Tech Meets Style ⚡",
//     subtitle: "Discover gadgets that define the future.",
//     // img: "https://images.pexels.com/photos/3563627/pexels-photo-3563627.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     // img: "https://images.pexels.com/photos/10278812/pexels-photo-10278812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     img: "https://images.pexels.com/photos/123335/pexels-photo-123335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     title: "Upgrade Your Everyday 🚀",
//     subtitle: "Smartphones, laptops & accessories built for now.",
//     img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1350&q=80",
//   },
//   {
//     title: "Innovation in Your Pocket ✨",
//     subtitle: "From wearables to power gear — we’ve got you.",
//     img: "https://i.postimg.cc/9XBTGDgD/Designer.png",
//   },
// ];

// const CarouselBox = () => {
//   return (
//     <Carousel
//       className="w-full"
//       plugins={[
//         Autoplay({
//           delay: 4000,
//         }),
//       ]}
//     >
//       <CarouselContent className="h-[400px] md:h-[500px] lg:h-[615px] w-full">
//         {slides.map((slide, i) => (
//           <CarouselItem key={i} className="relative h-full w-full">
//             {/* Background Image */}
//             <Image
//               src={slide.img}
//               alt={slide.title}
//               fill
//               priority={i === 0}
//               className="object-cover"
//             />
//             {/* Overlay gradient */}
//             <div className="absolute inset-0 bg-black/50" />
//             {/* Text content */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
//               <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
//                 {slide.title}
//               </h2>
//               <p className="text-gray-200 text-sm md:text-lg mt-2 max-w-2xl">
//                 {slide.subtitle}
//               </p>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// };

// export default CarouselBox;
