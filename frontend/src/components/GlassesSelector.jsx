import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // Import Splide's default styles

export function GlassesSelector({ selectedGlasses, onSelect, products }) {
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="mb-6">
      <Splide
        options={{
          perPage: 4, // Display 4 products at a time
          focus: "start",
          // type: "loop",
          gap: "1rem", // Add gap between products
          pagination: false, // Disable pagination
          arrows: true, // Enable next/prev arrows
          drag: true, // Enable dragging
          autoplay: false, // Disable autoplay
          perMove: 1,
        }}
      >
        {products.map((product) => (
          <SplideSlide key={product._id}>
            <button
              onClick={() => onSelect(product)}
              className={`flex flex-col items-center  w-40 h-40 px-4 py-2 rounded-lg border ${
                selectedGlasses?._id === product._id
                  ? "bg-primary text-white"
                  : "bg-white text-white hover:bg-gray-100"
              }`}
            >
              <img
                src={product.productImg}
                alt={product.productName}
                className="w-16 h-16 object-contain mb-2"
              />
              <span>{product.productName}</span>
            </button>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
