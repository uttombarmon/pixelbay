import React, { useState } from "react";

const ToggleVariants = ({
  variant,
  variants,
  setVariant,
}: {
  variant: any;
  variants: any;
  setVariant: any;
}) => {
  const [loading, setLoading] = useState(false);
  const handleVariantChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setVariant(variants.find((v: any) => v.id === Number(e.target.value)));
  };
  return (
    <select
      value={variant?.id}
      onChange={handleVariantChange}
      disabled={loading}
      className={`px-2 py-1 text-xs rounded-full outline-none ${
        status === "active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      } ${loading ? "opacity-60 cursor-wait" : "cursor-pointer"}`}
    >
      {variants.map((v: any) => (
        <option key={v.id} value={v.id}>
          {v.title}
        </option>
      ))}
    </select>
  );
};

export default ToggleVariants;
