"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TechnicalSpecs from "./TechnicalSpecs";
import ProductReviews from "./Reviews";
import ReviewForm from "./ReviewForm";

interface ProductTabsProps {
  product: any;
  techSpecs: any;
}

export default function ProductTabs({ product, techSpecs }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specs">Technical Specs</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        {product.description && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              {product.description}
            </p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="specs" className="mt-6">
        <TechnicalSpecs techSpecs={techSpecs} />
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div>
          <ReviewForm productId={product?.id} />
          <h2 className="text-xl font-semibold mb-4 mt-6">Customer Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <ProductReviews reviews={product.reviews} />
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No reviews yet.</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
