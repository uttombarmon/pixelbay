"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { GadgetType } from "@/types/form-config";

interface ProductInfoSectionProps {
  form: any;
}

export function ProductInfoSection({ form }: ProductInfoSectionProps) {
  return (
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
                <Input placeholder="Title" {...field} />
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
              <FormDescription>Used in URLs.Keep it unique.</FormDescription>
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
                <Input placeholder="Apple, Google..." {...field} />
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
                <Input placeholder="iPhone 16 Pro Max..." {...field} />
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
                    <SelectItem value="power_supply">Power Supply</SelectItem>
                    <SelectItem value="case">Case</SelectItem>
                    <SelectItem value="cooling">Cooling</SelectItem>
                    <SelectItem value="accessory">Accessory</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Changing type updates spec fields.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Row 3: Status, Visibility, Condition */}
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
              <FormDescription>Draft products are not visible.</FormDescription>
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
    </div>
  );
}
