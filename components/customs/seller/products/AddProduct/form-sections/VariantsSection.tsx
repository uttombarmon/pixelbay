"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface VariantsSectionProps {
  form: any;
  variantFields: any[];
  appendVariant: (variant: any) => void;
  removeVariant: (index: number) => void;
}

export function VariantsSection({
  form,
  variantFields,
  appendVariant,
  removeVariant,
}: VariantsSectionProps) {
  return (
    <div className="border-t pt-6 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Variant & Pricing</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            appendVariant({
              sku: "",
              variantName: "",
              color: "",
              storageVariant: "",
              ramVariant: "",
              regionVariant: "",
              price: 0,
              currency: "USD",
              stock: 0,
            })
          }
        >
          + Add Variant
        </Button>
      </div>

      <div className="space-y-2">
        {variantFields.map((field, index) => (
          <div
            key={field.id}
            className="relative p-6 border rounded-lg  shadow-sm transition-all hover:shadow-md"
          >
            <div className="absolute right-4 top-4">
              {variantFields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeVariant(index)}
                >
                  Remove
                </Button>
              )}
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                Variant #{index + 1}
              </h3>
            </div>

            {/* SKU & Variant Name */}
            <div className="grid gap-6 md:grid-cols-2 mb-4">
              <FormField
                control={form.control}
                name={`variants.${index}.sku`}
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
                name={`variants.${index}.variantName`}
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
                name={`variants.${index}.color`}
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
                name={`variants.${index}.storageVariant`}
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
                name={`variants.${index}.ramVariant`}
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
                name={`variants.${index}.regionVariant`}
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
                name={`variants.${index}.price`}
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
                name={`variants.${index}.currency`}
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
                name={`variants.${index}.stock`}
                rules={{
                  required: "Stock is required",
                  validate: (v) =>
                    Number(v) >= 0 || "Stock must be a positive number",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="100"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
