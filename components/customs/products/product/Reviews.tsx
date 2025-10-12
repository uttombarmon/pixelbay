"use client";


import Review from "./Review";

interface Review {
  id: number;
  rating: number;
  title: string;
  body: string;
  created_at?: string;
}

interface ProductReviewsProps {
  reviews: Review[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}
