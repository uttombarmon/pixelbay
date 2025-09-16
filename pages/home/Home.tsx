import CarouselBox from "@/components/customs/home/Carousel/CarouselBox";
import Categories from "@/components/customs/home/category/Categories";
import React from "react";

const HomePage = () => {
  return (
    <>
      <main className="flex flex-col min-w-screen">
        {/* carousel in header  */}
        <CarouselBox />
        <Categories />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </>
  );
};

export default HomePage;
