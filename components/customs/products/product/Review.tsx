"use client";
import React, { useEffect } from "react";
import * as motion from "motion/react-client";

const Review = ({ review }: { review: any }) => {
  const [reviewer, setReviewer] = React.useState<any>(null);
  useEffect(() => {
    const getReviewer = async () => {
      const res = await fetch(`/api/user?userId=${review.customer_id}`);
      const data = await res.json();
      setReviewer(data.user);
    };
    getReviewer();
  }, []);
  if (!review) return <p>Reviewer Not Find</p>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{reviewer?.name}</h3>
        <span className="text-yellow-500 font-bold">
          {"⭐".repeat(review.rating)}
        </span>
      </div>
      <p className="">{review.body}</p>
      {review.created_at && (
        <p className="text-gray-400 text-sm mt-2">
          {new Date(review.created_at).toLocaleDateString()}
        </p>
      )}
    </motion.div>
  );
};

export default Review;
