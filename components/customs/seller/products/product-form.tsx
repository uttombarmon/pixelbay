"use client";

import * as React from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  gadgetFieldConfig,
  fieldLabels,
  type GadgetType,
} from "@/types/form-config";

export type ProductFormValues = {
  // Product level
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

  // Variant level
  sku: string;
  variantName?: string;
  color?: string;
  storageVariant?: string;
  ramVariant?: string;
  regionVariant?: string;
  price: number;
  currency: string;
  stock: number;

  // Spec level (dynamic by gadget type)
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
      sku: "",
      variantName: "",
      color: "",
      storageVariant: "",
      ramVariant: "",
      regionVariant: "",
      price: 0,
      currency: "USD",
      stock: 0,
      ...defaultValues,
    },
  });

  const gadgetType: GadgetType = form.watch("gadgetType");
  const config = gadgetFieldConfig[gadgetType];

  const handleSubmit = (values: ProductFormValues) => {
    const parsed: ProductFormValues = {
      ...values,
      price: Number(values.price) || 0,
      stock: Number(values.stock) || 0,
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
    onSubmit?.(parsed);
  };

  const renderSpecField = (fieldName: string) => {
    const label = fieldLabels[fieldName] || fieldName;
    const isNumeric = [
      "processorCores",
      "processorThreads",
      "processorSpeed",
      "ram",
      "storage",
      "displaySize",
      "refreshRate",
      "brightness",
      "batteryCapacity",
      "speakerWatts",
      "weight",
      "fps",
      "thermalDesignPower",
      "maxTemperature",
      "antutuScore",
      "geekbenchScore",
    ].includes(fieldName);

    return (
      <FormField
        key={fieldName}
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-medium">{label}</FormLabel>
            <FormControl>
              <Input
                type={isNumeric ? "number" : "text"}
                step={isNumeric ? "0.1" : undefined}
                min={isNumeric ? 0 : undefined}
                placeholder={label}
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* ==================== PRODUCT SECTION ==================== */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Product Information</h2>

          {/* Row 1: Title & Slug */}
          <div className="grid gap-6 md:grid-cols-2 mb-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Apple iPhone 16 Pro Max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              rules={{ required: "Slug is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="apple-iphone-16-pro-max" {...field} />
                  </FormControl>
                  <FormDescription>
                    Used in URLs. Keep it unique.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Brand, Model, Type */}
          <div className="grid gap-6 md:grid-cols-3 mb-4">
            <FormField
              control={form.control}
              name="brand"
              rules={{ required: "Brand is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Apple" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Number</FormLabel>
                  <FormControl>
                    <Input placeholder="iPhone 16 Pro Max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gadgetType"
              rules={{ required: "Type is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smartphone">Smartphone</SelectItem>
                        <SelectItem value="laptop">Laptop</SelectItem>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="smartwatch">Smartwatch</SelectItem>
                        <SelectItem value="headphones">Headphones</SelectItem>
                        <SelectItem value="camera">Camera</SelectItem>
                        <SelectItem value="gaming_console">
                          Gaming Console
                        </SelectItem>
                        <SelectItem value="drone">Drone</SelectItem>
                        <SelectItem value="vr_headset">VR Headset</SelectItem>
                        <SelectItem value="portable_speaker">
                          Portable Speaker
                        </SelectItem>
                        <SelectItem value="charger">Charger</SelectItem>
                        <SelectItem value="monitor">Monitor</SelectItem>
                        <SelectItem value="keyboard">Keyboard</SelectItem>
                        <SelectItem value="mouse">Mouse</SelectItem>
                        <SelectItem value="router">Router</SelectItem>
                        <SelectItem value="hard_drive">Hard Drive</SelectItem>
                        <SelectItem value="gpu">GPU</SelectItem>
                        <SelectItem value="cpu">CPU</SelectItem>
                        <SelectItem value="motherboard">Motherboard</SelectItem>
                        <SelectItem value="ram">RAM</SelectItem>
                        <SelectItem value="ssd">SSD</SelectItem>
                        <SelectItem value="power_supply">
                          Power Supply
                        </SelectItem>
                        <SelectItem value="case">Case</SelectItem>
                        <SelectItem value="cooling">Cooling</SelectItem>
                        <SelectItem value="accessory">Accessory</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Changing type will update available spec fields.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 3: Status & Visibility */}
          <div className="grid gap-6 md:grid-cols-3 mb-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Draft products are not visible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visible">Visible</SelectItem>
                        <SelectItem value="hidden">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="refurbished">Refurbished</SelectItem>
                        <SelectItem value="open_box">Open Box</SelectItem>
                        <SelectItem value="used">Used</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Descriptions */}
          <div className="mb-4">
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={2}
                      placeholder="Quick summary shown in product cards"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Detailed description, features, use cases..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Warranty */}
          <div className="grid gap-6 md:grid-cols-3 mb-4">
            <FormField
              control={form.control}
              name="warrantyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="extended">Extended</SelectItem>
                        <SelectItem value="international">
                          International
                        </SelectItem>
                        <SelectItem value="accidental_damage">
                          Accidental Damage
                        </SelectItem>
                        <SelectItem value="no_warranty">No Warranty</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warrantyMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty (Months)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="12"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4">
            <FormField
              control={form.control}
              name="warrantyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty Details</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={2}
                      placeholder="Additional warranty information"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ==================== VARIANT SECTION ==================== */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Variant & Pricing</h2>

          {/* SKU & Variant Name */}
          <div className="grid gap-6 md:grid-cols-2 mb-4">
            <FormField
              control={form.control}
              name="sku"
              rules={{ required: "SKU is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="PROD-001-BLK-256GB" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="variantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="iPhone 16 Pro Max - Space Black - 256GB"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Variant Options */}
          <div className="grid gap-6 md:grid-cols-2 mb-4">
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input placeholder="Space Black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storageVariant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storage</FormLabel>
                  <FormControl>
                    <Input placeholder="256GB" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-4">
            <FormField
              control={form.control}
              name="ramVariant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RAM</FormLabel>
                  <FormControl>
                    <Input placeholder="8GB" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="regionVariant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Input placeholder="Global" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Pricing & Stock */}
          <div className="grid gap-6 md:grid-cols-3">
            <FormField
              control={form.control}
              name="price"
              rules={{
                required: "Price is required",
                validate: (v) =>
                  Number(v) >= 0 || "Price must be a positive number",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min={0}
                      placeholder="999.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              rules={{ required: "Currency is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input maxLength={3} placeholder="USD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              rules={{
                required: "Stock is required",
                validate: (v) =>
                  Number(v) >= 0 || "Stock must be a positive number",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ==================== SPECIFICATIONS SECTION (Dynamic by Type) ==================== */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">
            Specifications ({gadgetType})
          </h2>

          {config.specs.map((specGroup) => (
            <div key={specGroup.label} className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3 pb-2 border-b">
                {specGroup.label}
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {specGroup.fields.map((fieldName) =>
                  renderSpecField(fieldName)
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ==================== SUBMIT ==================== */}
        <div className="flex justify-end gap-3 border-t pt-6">
          <Button variant="outline">Cancel</Button>
          <Button
            type="submit"
            disabled={submitting || form.formState.isSubmitting}
          >
            {submitting || form.formState.isSubmitting
              ? "Saving..."
              : "Save Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
