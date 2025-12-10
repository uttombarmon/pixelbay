"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
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

interface WarrantySectionProps {
  form: any;
}

export function WarrantySection({ form }: WarrantySectionProps) {
  return (
    <div className="border-t pt-6">
      <h2 className="text-lg font-semibold mb-4">Warranty Information</h2>

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
                    <SelectItem value="international">International</SelectItem>
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
  );
}
