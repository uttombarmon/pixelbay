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

const slides = [
  {
    title: "PixelBay Premium",
    subtitle: "Where Tech Meets Style",
    description: "Discover gadgets that define the future.",
    img: "https://images.pexels.com/photos/123335/pexels-photo-123335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    gradient: "from-blue-900/60 via-blue-800/40 to-black/60",
    accent: "text-blue-400",
    buttonBg: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Level Up Your Setup",
    subtitle: "Innovation in Your Pocket",
    description: "From wearables to power gear — we’ve got you covered.",
    img: "https://images.pexels.com/photos/6473738/pexels-photo-6473738.jpeg?auto=format&fit=crop&w=1350&q=80",
    gradient: "from-purple-900/60 via-purple-800/40 to-black/60",
    accent: "text-purple-400",
    buttonBg: "bg-purple-600 hover:bg-purple-700",
  },
  {
    title: "Modern Essentials",
    subtitle: "Upgrade Your Everyday",
    description: "Smartphones, laptops & accessories built for the digital age.",
    img: "https://i.postimg.cc/HnT6BfCX/ady-teenagerinro-s-Q0x-Xx-Qdfe-Y-unsplash.jpg",
    gradient: "from-red-900/60 via-red-800/40 to-black/60",
    accent: "text-red-400",
    buttonBg: "bg-red-600 hover:bg-red-700",
  },
];

const CarouselBox = () => {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent className="h-[450px] md:h-[550px] lg:h-[650px] w-full">
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="relative h-full w-full">
            <Image
              src={slide.img}
              className="w-full h-full relative object-cover"
              fill
              alt={slide.title}
              priority={index === 0}
              sizes="100vw"
            />
            <div className={`absolute inset-0 z-10 bg-gradient-to-r ${slide.gradient} flex items-center px-6 md:px-12 lg:px-20`}>
              <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4 md:gap-6">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white">
                    {slide.title.split(' ')[0]}
                    <span className={`${slide.accent}`}> {slide.title.split(' ').slice(1).join(' ')}</span>
                  </h1>
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-200">
                    {slide.subtitle}
                  </h2>
                </div>
                <p className="text-base md:text-xl lg:text-2xl text-gray-300 max-w-xl leading-relaxed">
                  {slide.description}
                </p>
                <div className="pt-4">
                  <button className={`${slide.buttonBg} text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bold text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl`}>
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="hidden lg:flex flex-1 justify-end items-center">
                <div className={`w-80 h-80 md:w-[450px] md:h-[450px] rounded-full border-4 border-white/10 flex items-center justify-center animate-pulse`}>
                  <div className={`w-64 h-64 md:w-[350px] md:h-[350px] rounded-full border-2 border-white/5 flex items-center justify-center`}>
                    <div className="text-white/20 font-black text-9xl select-none">PB</div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex left-4 bg-white/10 hover:bg-white/20 border-0 text-white" />
      <CarouselNext className="hidden md:flex right-4 bg-white/10 hover:bg-white/20 border-0 text-white" />
    </Carousel>
  );
};

export default CarouselBox;
