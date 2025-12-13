"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionSectionProps {
  form: any;
}

export function DescriptionSection({ form }: DescriptionSectionProps) {
  return (
    <div className="border-t pt-6">
      <h2 className="text-lg font-semibold mb-4">Descriptions</h2>

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
    </div>
  );
}
