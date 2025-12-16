import React, { useState } from "react";

const ProductCardButton = ({ productId }: { productId: number | string }) => {
  const addToCart = () => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
      parsedCartItems.push(productId);
      localStorage.setItem("cartItems", JSON.stringify(parsedCartItems));
    } else {
      localStorage.setItem("cartItems", JSON.stringify([productId]));
    }
    console.log(cartItems);
  };
  const buyNow = () => {};
  return (
    <>
      <button
        className="block w-full rounded-sm bg-gray-200 px-1 md:px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
        onClick={addToCart}
      >
        Add to Cart
      </button>

      <button
        type="button"
        className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
        onClick={buyNow}
      >
        Buy Now
      </button>
    </>
  );
};

export default ProductCardButton;
