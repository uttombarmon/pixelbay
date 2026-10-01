"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db/drizzle";
import {
  products,
  productVariants,
  techSpecifications,
  productImages,
} from "@/lib/db/schema/schema";
import { revalidatePath } from "next/cache";

interface VariantFormInput { sku?: string; variantName?: string; color?: string; storageVariant?: string; ramVariant?: string; regionVariant?: string; price: number | string; currency?: string; stock?: number; }
interface ImageFormInput { url: string; alt?: string; }
interface ProductFormData { [key: string]: unknown; variants?: VariantFormInput[]; images?: ImageFormInput[]; title: string; slug: string; shortDescription?: string; description?: string; status?: string; visibility?: string; brand?: string; model?: string; gadgetType?: string; condition?: string; warrantyType?: string; warrantyMonths?: number; warrantyDescription?: string; processor?: string; processorCores?: string; processorThreads?: string; processorSpeed?: string; processorArch?: string; ram?: string; ramType?: string; ramSpeed?: string; storage?: string; storageType?: string; storageInterface?: string; storageExpansion?: string; gpu?: string; gpuMemory?: string; gpuMemoryType?: string; displaySize?: string; displayTech?: string; displayResolution?: string; refreshRate?: string; colorDepth?: string; brightness?: string; screenCoating?: string; batteryCapacity?: string; batteryType?: string; batteryLife?: string; fastCharging?: string; wirelessCharging?: string; rearCameraMP?: string; rearCameraAperture?: string; frontCameraMP?: string; frontCameraAperture?: string; videoCapability?: string; opticalZoom?: string; speakerCount?: string; speakerWatts?: string; audioCodec?: string; microphone?: string; bluetooth?: string; wifi?: string; nfc?: string; usb?: string; ports?: string; cellular?: string; sim?: string; weight?: string; dimensions?: string; material?: string; ipRating?: string; mrlRating?: string; dropProtection?: string; operatingSystem?: string; maxOSUpdate?: string; softwareSupport?: string; antutuScore?: string; geekbenchScore?: string; fps?: string; thermalDesignPower?: string; maxTemperature?: string; }

export async function createProduct(data: ProductFormData) {
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
    const techSpecData: typeof techSpecifications.$inferInsert = {
      processor: data.processor,
      processorCores: data.processorCores ? Number(data.processorCores) : undefined,
      processorThreads: data.processorThreads ? Number(data.processorThreads) : undefined,
      processorSpeed: data.processorSpeed,
      processorArch: data.processorArch,
      ram: data.ram ? Number(data.ram) : undefined,
      ramType: data.ramType,
      ramSpeed: data.ramSpeed,
      storage: data.storage ? Number(data.storage) : undefined,
      storageType: data.storageType,
      storageInterface: data.storageInterface,
      storageExpansion: data.storageExpansion,
      gpu: data.gpu,
      gpuMemory: data.gpuMemory ? Number(data.gpuMemory) : undefined,
      gpuMemoryType: data.gpuMemoryType,
      displaySize: data.displaySize,
      displayTech: data.displayTech,
      displayResolution: data.displayResolution,
      refreshRate: data.refreshRate ? Number(data.refreshRate) : undefined,
      colorDepth: data.colorDepth,
      brightness: data.brightness ? Number(data.brightness) : undefined,
      screenCoating: data.screenCoating,
      batteryCapacity: data.batteryCapacity ? Number(data.batteryCapacity) : undefined,
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
      speakerCount: data.speakerCount ? Number(data.speakerCount) : undefined,
      speakerWatts: data.speakerWatts,
      audioCodec: data.audioCodec,
      microphone: data.microphone,
      bluetooth: data.bluetooth,
      wifi: data.wifi,
      nfc: data.nfc ? data.nfc === "true" : undefined,
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
      softwareSupport: data.softwareSupport ? Number(data.softwareSupport) : undefined,
      antutuScore: data.antutuScore ? Number(data.antutuScore) : undefined,
      geekbenchScore: data.geekbenchScore ? Number(data.geekbenchScore) : undefined,
      fps: data.fps ? Number(data.fps) : undefined,
      thermalDesignPower: data.thermalDesignPower ? Number(data.thermalDesignPower) : undefined,
      maxTemperature: data.maxTemperature ? Number(data.maxTemperature) : undefined,
    };

    // Remove undefined/empty strings if necessary or let DB handle nulls.
    // Drizzle might complain if we pass undefined to non-null columns, but most spec fields are nullable.

    const [techSpec] = await db
      .insert(techSpecifications)
      .values(techSpecData)
      .returning({ id: techSpecifications.id });

    if (!techSpec) {
      return { error: "Failed to save technical specifications" };
    }

    // 2. Insert Product
    const productData: typeof products.$inferInsert = {
      title: data.title,
      slug: data.slug,
      short_description: data.shortDescription,
      description: data.description,
      status: (data.status as "draft" | "active" | "archived") || "draft",
      visibility: (data.visibility as "visible" | "hidden") || "visible",
      brand: data.brand,
      model: data.model,
      gadgetType: (data.gadgetType as NonNullable<typeof products.$inferInsert.gadgetType>) || "smartphone",
      techSpecId: techSpec.id,
      condition: (data.condition as "new" | "refurbished" | "open_box" | "used") || "new",
      warrantyType: (data.warrantyType as "standard" | "extended" | "international" | "accidental_damage" | "no_warranty") || "standard",
      warrantyMonths: data.warrantyMonths,
      warrantyDescription: data.warrantyDescription,
      created_by: userId,
    };

    const [newProduct] = await db
      .insert(products)
      .values(productData)
      .returning({ id: products.id });

    if (!newProduct) {
      // Rollback tech spec? In a transaction ideally.
      return { error: "Failed to create product" };
    }

    // 3. Insert Variants
    if (data.variants && data.variants.length > 0) {
      const variantsData = data.variants.map((v: VariantFormInput, idx: number) => ({
        product_id: newProduct.id,
        sku: v.sku || `SKU-${newProduct.id}-${idx}-${Date.now()}`,
        variantName: v.variantName,
        color: v.color,
        storageVariant: v.storageVariant,
        ramVariant: v.ramVariant,
        regionVariant: v.regionVariant,
        price: v.price.toString(), // numeric field expects string or number, check schema
        currency: v.currency || "USD",
        stock: v.stock || 0,
      }));

      await db.insert(productVariants).values(variantsData);
    }

    // 4. Insert Images
    if (data.images && data.images.length > 0) {
      const imagesData = data.images.map((img: ImageFormInput) => ({
        product_id: newProduct.id,
        url: img.url,
        alt: img.alt,
      }));
      await db.insert(productImages).values(imagesData);
    }

    revalidatePath("/seller/products"); // Adjust path as needed
    return { success: true, productId: newProduct.id };
  } catch (error: unknown) {
    console.error("Create Product Error:", error);
    return { error: error instanceof Error ? error.message : "Something went wrong" };
  }
}
