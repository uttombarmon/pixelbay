"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  gadgetFieldConfig,
  fieldLabels,
  type GadgetType,
} from "@/types/form-config";

interface SpecificationsSectionProps {
  form: any;
  gadgetType: GadgetType;
}

export function SpecificationsSection({
  form,
  gadgetType,
}: SpecificationsSectionProps) {
  const config = gadgetFieldConfig[gadgetType];

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
            {specGroup.fields.map((fieldName) => renderSpecField(fieldName))}
          </div>
        </div>
      ))}
    </div>
  );
}
