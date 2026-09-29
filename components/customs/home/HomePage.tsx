import CarouselBox from "@/components/customs/home/Carousel/CarouselBox";
import Categories from "@/components/customs/home/category/Categories";
import CustomerReviews from "@/components/customs/home/customerReviews/CustomerReviews";
import Footer from "@/components/customs/home/footer/Footer";
import NewArrivals from "@/components/customs/home/newArrivals/NewArrivals";
import { PersonalizedSuggestions } from "@/components/customs/home/personalizedSuggetions/PersonalizesSuggetions";
import PopularProducts from "@/components/customs/home/Popular/PopularProducts";
import SuperDeals from "@/components/customs/home/superDeals/SuperDeals";
import React from "react";

const HomePage = () => {
  return (
    <>
      <main className="flex flex-col">
        {/* carousel in header  */}
        <CarouselBox />
        <Categories />
        <PopularProducts />
        <SuperDeals />
        <NewArrivals />
        <PersonalizedSuggestions />
        <CustomerReviews />
      </main>
      <footer className=" flex-wrap items-center justify-center">
        <Footer />
      </footer>
    </>
  );
};

export default HomePage;
