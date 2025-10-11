"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";

interface Variant {
  sku: string;
  title: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

interface Image {
  url: string;
  alt: string;
}

interface ProductFormData {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  brand: string;
  category_id: number | null;
  status: "draft" | "active" | "archived";
  visibility: "visible" | "hidden";
  attributes: Record<string, string>;
  images: Image[];
  variants: Variant[];
}

interface Category {
  id: number;
  name: string;
}

// interface Props {
//   categories: Category[];
//   existingOptions: { brands: string[]; attributes: Record<string, string[]> };
// }

export default function ProductForm({ userId }: { userId: string }) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    brand: "",
    category_id: null,
    status: "draft",
    visibility: "visible",
    attributes: {},
    images: [],
    variants: [],
  });
  const [showLimitError, setShowLimitError] = useState(false);

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        { sku: "", title: "", price: 0, stock: 0, attributes: {} },
      ],
    }));
  };

  const addImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { url: "", alt: "" }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Post data to your API
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/products?userId=${userId}`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <Card className="w-full lg:min-w-3xl mx-auto space-y-6 p-6">
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Product Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Input
            placeholder="Product Thumbnail or Image"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
          <Textarea
            placeholder="Short Description"
            value={formData.short_description}
            onChange={(e) => {
              setFormData({ ...formData, short_description: e.target.value });
              if (formData?.short_description?.length >= 500) {
                setShowLimitError(true);
              } else {
                setShowLimitError(false);
              }
            }}
          />
          {showLimitError && (
            <p className=" text-sm text-red-400">Input 500 text only</p>
          )}
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Input
            placeholder="Brand"
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
          />

          {/* Images Section */}
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="images">
              <AccordionTrigger>Add Images</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <Button type="button" onClick={addImage}>
                  + Add Image
                </Button>
                {formData.images.map((img, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Input
                      placeholder="Image URL"
                      value={img.url}
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[i].url = e.target.value;
                        setFormData({ ...formData, images: newImages });
                      }}
                    />
                    <Input
                      placeholder="Alt Text"
                      value={img.alt}
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[i].alt = e.target.value;
                        setFormData({ ...formData, images: newImages });
                      }}
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Variants Section */}
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="variants">
              <AccordionTrigger>Add Variants</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <Button type="button" onClick={addVariant}>
                  + Add Variant
                </Button>
                {formData.variants.map((v, i) => (
                  <div key={i} className="space-y-2 p-3 border rounded-md">
                    <Input
                      placeholder="SKU"
                      value={v.sku}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[i].sku = e.target.value;
                        setFormData({ ...formData, variants: newVariants });
                      }}
                    />
                    <Input
                      placeholder="Title"
                      value={v.title}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[i].title = e.target.value;
                        setFormData({ ...formData, variants: newVariants });
                      }}
                    />
                    <Label>Price</Label>
                    <Input
                      type="number"
                      placeholder="Price"
                      value={v.price}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[i].price = Number(e.target.value);
                        setFormData({ ...formData, variants: newVariants });
                      }}
                    />
                    <Label>Stock Number</Label>
                    <Input
                      type="number"
                      placeholder="Stock"
                      value={v.stock}
                      onChange={(e) => {
                        const newVariants = [...formData.variants];
                        newVariants[i].stock = Number(e.target.value);
                        setFormData({ ...formData, variants: newVariants });
                      }}
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button type="submit" className="mt-4 w-full">
            Create Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
