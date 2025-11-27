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

export type ProductFormValues = {
  title: string;
  slug: string;
  brand: string;
  model?: string;
  gadgetType:
    | "smartphone"
    | "laptop"
    | "tablet"
    | "smartwatch"
    | "headphones"
    | "camera"
    | "gaming_console"
    | "drone"
    | "vr_headset"
    | "portable_speaker"
    | "charger"
    | "monitor"
    | "keyboard"
    | "mouse"
    | "router"
    | "hard_drive"
    | "gpu"
    | "cpu"
    | "motherboard"
    | "ram"
    | "ssd"
    | "power_supply"
    | "case"
    | "cooling"
    | "accessory"
    | "other";
  status: "draft" | "active" | "archived";
  visibility: "visible" | "hidden";
  shortDescription?: string;
  description?: string;

  price: number;
  currency: string;
  stock: number;
  color?: string;
  storageVariant?: string;
  ramVariant?: string;

  // generic specs
  processor?: string;
  ram?: number;
  storage?: number;
  displaySize?: number;
  batteryCapacity?: number;

  // smartphone‑specific
  simType?: string;
  has5g?: "yes" | "no";
  mainCameraMp?: string;

  // laptop‑specific
  cpuCores?: number;
  gpuModel?: string;
  ramType?: string;

  // accessory‑specific
  compatibleModels?: string;
  connectionType?: string;

  // free‑form extra
  extraFieldsJson?: string;
};

type ProductFormProps = {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit?: (values: ProductFormValues) => Promise<void> | void;
  submitting?: boolean;
};

export function AddProductForm({
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
      price: 0,
      currency: "USD",
      stock: 0,
      color: "",
      storageVariant: "",
      ramVariant: "",
      processor: "",
      extraFieldsJson: "",
      ...defaultValues,
    },
  });

  const gadgetType = form.watch("gadgetType"); // drives conditional fields

  const handleSubmit = (values: ProductFormValues) => {
    const parsed: ProductFormValues = {
      ...values,
      price: Number(values.price) || 0,
      stock: Number(values.stock) || 0,
      ram: values.ram != null ? Number(values.ram) || 0 : undefined,
      storage: values.storage != null ? Number(values.storage) || 0 : undefined,
      displaySize:
        values.displaySize != null
          ? Number(values.displaySize) || 0
          : undefined,
      batteryCapacity:
        values.batteryCapacity != null
          ? Number(values.batteryCapacity) || 0
          : undefined,
      cpuCores:
        values.cpuCores != null ? Number(values.cpuCores) || 0 : undefined,
    };
    console.log(parsed);
    // onSubmit(parsed);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Basic Info */}
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
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
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="apple-iphone-16-pro-max" {...field} />
                </FormControl>
                <FormDescription>Used in URLs. Keep it unique.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
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
                <FormLabel>Model</FormLabel>
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
                        Gaming console
                      </SelectItem>
                      <SelectItem value="drone">Drone</SelectItem>
                      <SelectItem value="vr_headset">VR Headset</SelectItem>
                      <SelectItem value="monitor">Monitor</SelectItem>
                      <SelectItem value="router">Router</SelectItem>
                      <SelectItem value="accessory">Accessory</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Changing type will show type‑specific fields below.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Status & visibility */}
        <div className="grid gap-6 md:grid-cols-2">
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
                  Draft products are not visible in the store.
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
                <FormDescription>
                  Hidden products will not show in listings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Descriptions */}
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short description</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Quick summary shown in cards."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full description</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Detailed description, features, use cases..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pricing & stock */}
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
                  <Input placeholder="USD" maxLength={3} {...field} />
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
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" min={0} placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Variant basics */}
        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color (variant)</FormLabel>
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
                <FormLabel>Storage (variant)</FormLabel>
                <FormControl>
                  <Input placeholder="256GB" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ramVariant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RAM (variant)</FormLabel>
                <FormControl>
                  <Input placeholder="8GB" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Generic key specs */}
        <div>
          <h3 className="text-sm font-medium mb-2">Key specs</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <FormField
              control={form.control}
              name="processor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Processor</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Apple M3, Intel i9, Snapdragon 8 Gen 4..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RAM (GB)</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storage (GB)</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="256" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <FormField
              control={form.control}
              name="displaySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display size (inches)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min={0}
                      placeholder="6.7"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="batteryCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Battery (mAh)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="5000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Type‑specific sections */}
        {gadgetType === "smartphone" && (
          <div className="space-y-4 border rounded-md p-4">
            <h3 className="text-sm font-medium">Smartphone fields</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="simType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SIM type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dual SIM, eSIM + Nano SIM..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="has5g"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>5G support</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mainCameraMp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main camera (MP)</FormLabel>
                    <FormControl>
                      <Input placeholder="50 MP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {gadgetType === "laptop" && (
          <div className="space-y-4 border rounded-md p-4">
            <h3 className="text-sm font-medium">Laptop fields</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="cpuCores"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPU cores</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gpuModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GPU model</FormLabel>
                    <FormControl>
                      <Input placeholder="RTX 4070, integrated..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ramType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RAM type</FormLabel>
                    <FormControl>
                      <Input placeholder="DDR5, LPDDR5X..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {gadgetType === "accessory" && (
          <div className="space-y-4 border rounded-md p-4">
            <h3 className="text-sm font-medium">Accessory fields</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="compatibleModels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compatible models</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="iPhone 15/16 series, Galaxy S24..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Plain text list, or you can later convert to structured
                      data.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="connectionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Connection type</FormLabel>
                    <FormControl>
                      <Input placeholder="USB‑C, Bluetooth 5.3..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Extra / custom fields */}
        <FormField
          control={form.control}
          name="extraFieldsJson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>More fields (JSON or notes)</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder='Optional. Example: {"waterResistance":"IP68","specialFeatures":["MagSafe","Satellite SOS"]}'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Use this to store custom attributes you have not modeled yet.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            disabled={submitting || form.formState.isSubmitting}
          >
            {submitting || form.formState.isSubmitting
              ? "Saving..."
              : "Save product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
