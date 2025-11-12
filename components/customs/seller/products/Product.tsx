"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import React, { use, useEffect, useState } from "react";
import ToggleStatusButton from "./ToggleStatusButton";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import ToggleVariants from "./ToggleVariants";

const Product = ({
  product,
  handleEditClick,
  handleDeleteClick,
}: {
  product: any;
  handleEditClick: any;
  handleDeleteClick: any;
}) => {
  const [variant, setVariant] = useState(product.variants[0]);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.variants[0].stock);
  useEffect(() => {
    if (variant) {
      setPrice(variant.price);
      setStock(variant.stock);
    }
  }, [product, variant]);
  return (
    <TableRow>
      <TableCell>
        {product?.images?.length >= 1 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-12 h-12 rounded-md object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-md" />
        )}
      </TableCell>
      <TableCell className="font-medium">
        {product.title.length > 20
          ? product.title.slice(0, 20) + "..."
          : product.title}
      </TableCell>
      <TableCell>
        <ToggleVariants variant={variant} variants={product.variants} setVariant={setVariant}/>
      </TableCell>
      <TableCell>${price ?? 0}</TableCell>
      <TableCell>{stock ?? 0}</TableCell>
      <TableCell>
        <ToggleStatusButton
          productId={product.id}
          initialStatus={product.status}
        />
      </TableCell>
      <TableCell className=" flex justify-between gap-2 items-center my-auto">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => handleEditClick(product)}
        >
          <Edit className="w-4 h-4" /> Edit
        </Button>
        <Button
          variant="destructive"
          size={"sm"}
          onClick={() => handleDeleteClick(product.id)}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Product;
