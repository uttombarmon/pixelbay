"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as motion from "motion/react-client";

export default function ReviewForm({ productId }: { productId: number }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ⭐ handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return setMessage("You must be signed in to leave a review!");

    if (rating === 0) return setMessage("Please select a rating.");

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/products/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          rating,
          body,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Review added successfully!");
        setTitle("");
        setBody("");
        setRating(0);

        // Refresh the page to show the new review
        setTimeout(() => {
          router.refresh();
        }, 1000);
      } else {
        setMessage(`❌ ${data.error || "Something went wrong."}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  // 💡 if user not logged in
  if (!session) {
    return (
      <div className="p-4 border rounded-xl text-center">
        <p className="text-gray-600">
          You must{" "}
          <a
            href="/api/auth/signin"
            className="text-blue-600 font-semibold hover:underline"
          >
            sign in
          </a>{" "}
          to write a review.
        </p>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 border rounded-2xl shadow-sm flex flex-col w-full md:max-w-xs gap-4"
    >
      <h3 className="text-lg font-semibold">Write a Review</h3>

      {/* Rating */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl ${
              rating >= star ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Title */}
      {/* <input
        type="text"
        placeholder="Review title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
        required
      /> */}

      {/* Body */}
      <textarea
        placeholder="Write your review..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="p-2 border rounded-lg w-full h-28 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
        required
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>

      {message && <p className="text-sm text-gray-600">{message}</p>}
    </motion.form>
  );
}
