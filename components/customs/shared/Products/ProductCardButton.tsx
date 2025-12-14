import React from "react";

const ProductCardButton = () => {
  const addToCart = () => {};
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
