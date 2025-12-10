"use client";
import React, { useEffect } from "react";
import * as motion from "motion/react-client";

const Review = ({ review }: { review: any }) => {
  const [reviewer, setReviewer] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const getReviewer = async () => {
      try {
        // Use user_id instead of customer_id
        const res = await fetch(`/api/user?userId=${review.user_id}`);
        if (res.ok) {
          const data = await res.json();
          setReviewer(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch reviewer:", error);
      } finally {
        setLoading(false);
      }
    };

    if (review?.user_id) {
      getReviewer();
    } else {
      setLoading(false);
    }
  }, [review?.user_id]);

  if (!review) return <p>Review not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">
          {loading ? "Loading..." : reviewer?.name || "Anonymous"}
        </h3>
        <span className="text-yellow-500 font-bold text-xl">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </span>
      </div>
      {review.title && <h4 className="font-medium mb-1">{review.title}</h4>}
      <p className="text-gray-700 dark:text-gray-300">{review.body}</p>
      {review.created_at && (
        <p className="text-gray-400 text-sm mt-2">
          {new Date(review.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      {review.verified_purchase && (
        <span className="inline-block mt-2 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
          ✓ Verified Purchase
        </span>
      )}
    </motion.div>
  );
};

export default Review;
