import Categories from "@/components/customs/seller/categories/Categories";
import React from "react";

const page = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/categories`
  );
  const initialCategories = await response.json();
  return <Categories initialCategories={initialCategories}></Categories>;
};

export default page;
