"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImage {
  id: number;
  url: string;
  alt?: string;
  position?: number;
}

export default function ProductImageGallery({ product }: { product: any }) {
  const images: ProductImage[] = product?.images || [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [imageLoading, setImageLoading] = useState(true);

  const selectedImg = images[selectedIndex] || null;
  const hasMultipleImages = images.length > 1;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedIndex, images.length]);

  const goToNext = () => {
    if (hasMultipleImages) {
      setSelectedIndex((prev) => (prev + 1) % images.length);
      setImageLoading(true);
    }
  };

  const goToPrevious = () => {
    if (hasMultipleImages) {
      setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
      setImageLoading(true);
    }
  };

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
        <div className="relative">
          <div
            className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 group"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Loading spinner */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {/* Base image */}
            <Image
              src={selectedImg.url}
              alt={selectedImg.alt || product?.title || "Product image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-contain p-4 transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              priority={selectedIndex === 0}
            />

            {/* Zoomed image overlay */}
            {isZoomed && !imageLoading && (
              <div
                className="absolute inset-0 bg-no-repeat bg-contain scale-150 transition-all duration-150 pointer-events-none"
                style={{
                  backgroundImage: `url(${selectedImg.url})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            )}

            {/* Navigation arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image counter */}
            {hasMultipleImages && (
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Zoom hint */}
          <p className="text-xs text-muted-foreground text-center mt-2">
            Hover to zoom{" "}
            {hasMultipleImages &&
              "• Click thumbnails or use arrow keys to navigate"}
          </p>
        </div>
      ) : (
        <div className="w-full h-[400px] md:h-[500px] bg-gray-200 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <svg
            className="w-20 h-20 mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg font-medium">No images available</p>
        </div>
      )}

      {/* Thumbnails */}
      {hasMultipleImages && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => {
                setSelectedIndex(index);
                setImageLoading(true);
              }}
              className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all
                ${
                  selectedIndex === index
                    ? "border-primary shadow-lg scale-105"
                    : "border-transparent hover:border-gray-300 dark:hover:border-gray-600 opacity-70 hover:opacity-100"
                }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt || `Thumbnail ${index + 1}`}
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
