"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db/drizzle";
import {
  products,
  productVariants,
  techSpecifications,
} from "@/lib/db/schema/schema";
import { ProductFormValues } from "@/components/customs/seller/products/product-form"; // Type import might need adjustment based on export
import { revalidatePath } from "next/cache";

// We need to define the type here or import it from the form component if exported
// Based on previous file read, ProductFormValues is exported from product-form.tsx
// However, importing types from client components to server actions can sometimes be tricky if not careful with imports.
// I'll redefine a matching interface or try to import it. simpler to redefine or use 'any' for the draft, but better to be type safe.
// Let's rely on the one in the form component.

export async function createProduct(data: any) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return { error: "Unauthorized" };
  }

  const userId = session.user.id;

  try {
    // 1. Insert Tech Specs
    // Extract spec fields. This is dynamic based on gadgetType.
    // We can pull all known spec fields from data. 
    // Since data contains everything, we can filter or just pass relevant fields if the schema allows partials/extras (it doesn't usually, but drizzle insert ignores extra if configured or we pick specific fields).
    // Better to explicitly pick fields or use the spread matching the table columns.
    // For simplicity/robustness, we'll try to insert the whole data object into techSpecs, 
    // expecting Drizzle/Postgres to ignore or we map carefully. 
    // Actually, Drizzle insert requires matching keys.
    
    // Let's extract spec fields. 
    // A safe way is to define valid keys for techSpecs.
    const techSpecData = {
       processor: data.processor,
       processorCores: data.processorCores,
       processorThreads: data.processorThreads,
       processorSpeed: data.processorSpeed,
       processorArch: data.processorArch,
       ram: data.ram,
       ramType: data.ramType,
       ramSpeed: data.ramSpeed,
       storage: data.storage,
       storageType: data.storageType,
       storageInterface: data.storageInterface,
       storageExpansion: data.storageExpansion,
       gpu: data.gpu,
       gpuMemory: data.gpuMemory,
       gpuMemoryType: data.gpuMemoryType,
       displaySize: data.displaySize,
       displayTech: data.displayTech,
       displayResolution: data.displayResolution,
       refreshRate: data.refreshRate,
       colorDepth: data.colorDepth,
       brightness: data.brightness,
       screenCoating: data.screenCoating,
       batteryCapacity: data.batteryCapacity,
       batteryType: data.batteryType,
       batteryLife: data.batteryLife,
       fastCharging: data.fastCharging,
       wirelessCharging: data.wirelessCharging,
       rearCameraMP: data.rearCameraMP,
       rearCameraAperture: data.rearCameraAperture,
       frontCameraMP: data.frontCameraMP,
       frontCameraAperture: data.frontCameraAperture,
       videoCapability: data.videoCapability,
       opticalZoom: data.opticalZoom,
       speakerCount: data.speakerCount,
       speakerWatts: data.speakerWatts,
       audioCodec: data.audioCodec,
       microphone: data.microphone,
       bluetooth: data.bluetooth,
       wifi: data.wifi,
       nfc: data.nfc,
       usb: data.usb,
       ports: data.ports, // form might send text or json? Form seems to assume text for now or need handling
       cellular: data.cellular,
       sim: data.sim,
       weight: data.weight,
       dimensions: data.dimensions,
       material: data.material,
       ipRating: data.ipRating,
       mrlRating: data.mrlRating,
       dropProtection: data.dropProtection,
       operatingSystem: data.operatingSystem,
       maxOSUpdate: data.maxOSUpdate,
       softwareSupport: data.softwareSupport,
       antutuScore: data.antutuScore,
       geekbenchScore: data.geekbenchScore,
       fps: data.fps,
       thermalDesignPower: data.thermalDesignPower,
       maxTemperature: data.maxTemperature,
    };
    
    // Remove undefined/empty strings if necessary or let DB handle nulls.
    // Drizzle might complain if we pass undefined to non-null columns, but most spec fields are nullable.

    const [techSpec] = await db.insert(techSpecifications).values(techSpecData).returning({ id: techSpecifications.id });

    if (!techSpec) {
      return { error: "Failed to save technical specifications" };
    }

    // 2. Insert Product
    const [newProduct] = await db.insert(products).values({
      title: data.title,
      slug: data.slug,
      short_description: data.shortDescription,
      description: data.description,
      status: data.status,
      visibility: data.visibility,
      brand: data.brand,
      model: data.model,
      gadgetType: data.gadgetType,
      techSpecId: techSpec.id,
      condition: data.condition,
      warrantyType: data.warrantyType,
      warrantyMonths: data.warrantyMonths,
      warrantyDescription: data.warrantyDescription,
      created_by: userId,
    }).returning({ id: products.id });

    if (!newProduct) {
       // Rollback tech spec? In a transaction ideally.
       return { error: "Failed to create product" };
    }

    // 3. Insert Variants
    if (data.variants && data.variants.length > 0) {
      const variantsData = data.variants.map((v: any) => ({
        product_id: newProduct.id,
        sku: v.sku,
        variantName: v.variantName,
        color: v.color,
        storageVariant: v.storageVariant,
        ramVariant: v.ramVariant,
        regionVariant: v.regionVariant,
        price: v.price.toString(), // numeric field expects string or number, check schema
        currency: v.currency,
        stock: v.stock,
      }));

      await db.insert(productVariants).values(variantsData);
    }

    revalidatePath("/seller/products"); // Adjust path as needed
    return { success: true, productId: newProduct.id };

  } catch (error: any) {
    console.error("Create Product Error:", error);
    return { error: error.message || "Something went wrong" };
  }
}
