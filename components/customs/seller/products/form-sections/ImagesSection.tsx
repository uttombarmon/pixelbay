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

interface ImagesSectionProps {
  form: any;
  imageFields: any[];
  appendImage: (image: { url: string; alt: string }) => void;
  removeImage: (index: number) => void;
}

export function ImagesSection({
  form,
  imageFields,
  appendImage,
  removeImage,
}: ImagesSectionProps) {
  return (
    <div className="border-t pt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Product Images</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendImage({ url: "", alt: "" })}
        >
          + Add Image
        </Button>
      </div>
      <div className="space-y-4">
        {imageFields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-4 items-end border p-4 rounded-md relative group"
          >
            {imageFields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                onClick={() => removeImage(index)}
              >
                &times;
              </Button>
            )}
            <div className="flex-1">
              <FormField
                control={form.control}
                name={`images.${index}.url` as any}
                rules={{ required: "Image URL is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name={`images.${index}.alt` as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Alt Text</FormLabel>
                    <FormControl>
                      <Input placeholder="Alt Text (Description)" {...field} />
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
