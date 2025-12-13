"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { createProduct } from "@/lib/actions/product";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { gadgetFieldConfig, type GadgetType } from "@/types/form-config";

import { ProductInfoSection } from "./form-sections/ProductInfoSection";
import { DescriptionSection } from "./form-sections/DescriptionSection";
import { WarrantySection } from "./form-sections/WarrantySection";
import { ImagesSection } from "./form-sections/ImagesSection";
import { VariantsSection } from "./form-sections/VariantsSection";
import { SpecificationsSection } from "./form-sections/SpecificationsSection";

interface Variant {
  sku: string;
  variantName?: string;
  color?: string;
  storageVariant?: string;
  ramVariant?: string;
  regionVariant?: string;
  price: number;
  currency: string;
  stock: number;
}
export interface ProductImage {
  url: string;
  alt: string;
}
export type ProductFormValues = {
  title: string;
  slug: string;
  brand: string;
  model?: string;
  gadgetType: GadgetType;
  status: "draft" | "active" | "archived";
  visibility: "visible" | "hidden";
  shortDescription?: string;
  description?: string;
  condition: "new" | "refurbished" | "open_box" | "used";
  warrantyType?: string;
  warrantyMonths?: number;
  warrantyDescription?: string;

  variants: Variant[];
  images: ProductImage[];

  [key: string]: any;
};

type ProductFormProps = {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit?: (values: ProductFormValues) => Promise<void> | void;
  submitting?: boolean;
};

export function AddProductFormm({
  defaultValues,
  onSubmit,
  submitting,
}: ProductFormProps) {
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      brand: "",
      model: "",
      gadgetType: "smartphone",
      status: "draft",
      visibility: "visible",
      shortDescription: "",
      description: "",
      condition: "new",
      warrantyType: "standard",
      warrantyMonths: 12,
      variants: [
        {
          sku: "",
          variantName: "",
          color: "",
          storageVariant: "",
          ramVariant: "",
          regionVariant: "",
          price: 0,
          currency: "USD",
          stock: 0,
        },
      ],
      images: [
        {
          url: "",
          alt: "",
        },
      ],
      ...defaultValues,
    },
  });
  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // Reset form when defaultValues (editing product) changes
  React.useEffect(() => {
    if (defaultValues) {
      console.log("Resetting form with values:", defaultValues);
      form.reset({
        ...defaultValues,
        gadgetType: defaultValues.gadgetType || "smartphone",
        status: defaultValues.status || "draft",
        visibility: defaultValues.visibility || "visible",
        condition: defaultValues.condition || "new",
        warrantyType: defaultValues.warrantyType || "standard",
        variants: defaultValues.variants?.length
          ? defaultValues.variants
          : [
              {
                sku: "",
                variantName: "",
                color: "",
                storageVariant: "",
                ramVariant: "",
                regionVariant: "",
                price: 0,
                currency: "USD",
                stock: 0,
              },
            ],
        images: defaultValues.images?.length
          ? defaultValues.images
          : [
              {
                url: "",
                alt: "",
              },
            ],
      });
    }
  }, [defaultValues, form]);

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "images", // @ts-ignore
  });

  const gadgetType: GadgetType = form.watch("gadgetType");
  const config = gadgetFieldConfig[gadgetType];

  const handleSubmit = (values: ProductFormValues) => {
    const parsed: ProductFormValues = {
      ...values,
      variants: values.variants.map((v) => ({
        ...v,
        price: Number(v.price) || 0,
        stock: Number(v.stock) || 0,
      })),
      warrantyMonths: values.warrantyMonths
        ? Number(values.warrantyMonths)
        : undefined,
    };

    // Convert numeric spec fields
    config.specs.forEach((group) => {
      group.fields.forEach((field) => {
        if (
          field.includes("Cores") ||
          field.includes("Threads") ||
          field.includes("Speed") ||
          field.includes("RAM") ||
          field.includes("Storage") ||
          field.includes("Capacity") ||
          field.includes("Rate") ||
          field.includes("Score") ||
          field.includes("Power") ||
          field.includes("Temperature") ||
          field === "fps"
        ) {
          if (parsed[field] !== undefined && parsed[field] !== "") {
            parsed[field] = Number(parsed[field]);
          }
        }
      });
    });

    console.log("Parsed form data:", parsed);

    // If defaultValues has an ID, we are updating
    const isEditing = !!defaultValues && "id" in defaultValues;

    startTransition(async () => {
      let result;
      if (isEditing) {
        // Update logic via API
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/products/${defaultValues.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(parsed),
            }
          );
          if (!res.ok) {
            const err = await res.json();
            result = { error: err.error || "Failed to update product" };
          } else {
            result = await res.json();
            // ensure success structure if needed
            if (!result.error) result = { success: true };
          }
        } catch (error: any) {
          result = { error: error.message };
        }
      } else {
        // Create logic via Server Action
        result = await createProduct(parsed);
      }

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          isEditing
            ? "Product updated successfully!"
            : "Product created successfully!"
        );
        if (onSubmit) {
          onSubmit(parsed);
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* ==================== PRODUCT SECTION ==================== */}
        <ProductInfoSection form={form} />
        <DescriptionSection form={form} />
        {/* Warranty */}
        <WarrantySection form={form} />
        {/* ==================== IMAGES SECTION ==================== */}
        <ImagesSection
          form={form}
          imageFields={imageFields}
          appendImage={appendImage}
          removeImage={removeImage}
        />
        {/* ==================== VARIANT SECTION ==================== */}
        <VariantsSection
          form={form}
          variantFields={variantFields}
          appendVariant={appendVariant}
          removeVariant={removeVariant}
        />
        {/* ==================== SPECIFICATIONS SECTION (Dynamic by Type) ==================== */}
        <SpecificationsSection form={form} gadgetType={gadgetType} />
        {/* ==================== SUBMIT ==================== */}
        <div className="flex justify-end gap-3 border-t pt-6">
          <Button variant="outline">Cancel</Button>
          <Button
            type="submit"
            disabled={submitting || form.formState.isSubmitting || isPending}
          >
            {submitting || form.formState.isSubmitting || isPending
              ? "Saving..."
              : "Save Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
