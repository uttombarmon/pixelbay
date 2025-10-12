"use client";

import { useState } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";

interface ProductImage {
  id: number;
  url: string;
  alt?: string;
}

export default function ProductImageGallery({ product }: { product: any }) {
  const images: ProductImage[] = product?.images || [];
  const [selectedImg, setSelectedImg] = useState<ProductImage | null>(
    images[0] || null
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-1/2 flex flex-col gap-4"
    >
      {/* Main Image */}
      {selectedImg ? (
        <div
          className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-gray-100 group"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Base image */}
          <Image
            src={selectedImg.url}
            alt={selectedImg.alt || product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-2 transition-all duration-300"
          />

          {/* Zoomed image overlay */}
          {isZoomed && (
            <div
              className="absolute inset-0 bg-no-repeat bg-contain scale-150 transition-all duration-150"
              style={{
                backgroundImage: `url(${selectedImg.url})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            />
          )}
        </div>
      ) : (
        <div className="w-full h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelectedImg(img)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition
                ${
                  selectedImg?.id === img.id
                    ? "border-blue-500"
                    : "border-transparent hover:border-gray-300"
                }`}
            >
              <Image
                src={img.url}
                alt={img.alt || "thumbnail"}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
