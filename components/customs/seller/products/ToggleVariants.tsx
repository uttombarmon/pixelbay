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
      className={`px-2 py-1 text-xs rounded-md border outline-none ${
        loading ? "opacity-60 cursor-wait" : "cursor-pointer"
      }`}
    >
      {variants?.map((v: any) => (
        <option key={v.id} value={v.id}>
          {v.variantName || v.sku || `Variant ${v.id}`}
        </option>
      ))}
    </select>
  );
};

export default ToggleVariants;
