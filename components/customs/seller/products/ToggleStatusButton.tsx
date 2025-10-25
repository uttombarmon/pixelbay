"use client";

import { toast } from "sonner";
import { useState } from "react";

export default function ToggleStatusButton({
  productId,
  initialStatus,
}: {
  productId: string | number;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value;
    const previousStatus = status;
    setStatus(newStatus); // Optimistically update the UI
    setLoading(true);

    try {
      const res = await fetch(`/api/seller/products/${productId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        setStatus(previousStatus); // Revert on error
        console.error("Failed to update status:", await res.text());
        toast.error("Failed to update product status.");
      }
      toast.success("Product Status Updated");
    } catch (err) {
      setStatus(previousStatus); // Revert on error
      console.error("Failed to update status:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      disabled={loading}
      className={`px-2 py-1 text-xs rounded-full outline-none ${
        status === "active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      } ${loading ? "opacity-60 cursor-wait" : "cursor-pointer"}`}
    >
      <option className="bg-green-100 text-green-700" value="active">
        Active
      </option>
      <option value="draft">draft</option>
    </select>
  );
}
