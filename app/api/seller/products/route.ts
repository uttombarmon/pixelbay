import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import {
  products,
  productImages,
  categories,
  productVariants,
  techSpecifications,
} from "@/lib/db/schema/schema";
import { and, eq, gt, gte, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }
    console.log("UserId: ", userId);

    // Fetch products created by this user (seller)
    const productList = await db
      .select({
        id: products.id,
        title: products.title,
        slug: products.slug,
        brand: products.brand,
        model: products.model,
        gadgetType: products.gadgetType,
        status: products.status,
        visibility: products.visibility,
        condition: products.condition,
        short_description: products.short_description,
        description: products.description,
        warrantyType: products.warrantyType,
        warrantyMonths: products.warrantyMonths,
        warrantyDescription: products.warrantyDescription,
        category_id: products.category_id,
        techSpecId: products.techSpecId,
        price: sql`MIN(${productVariants.price})`.as("price"),
        variants: sql<any>`json_agg(${productVariants})`.as("variants"),
        created_by: products.created_by,
        created_at: products.created_at,
        updated_at: products.updated_at,
      })
      .from(products)
      .leftJoin(
        productVariants,
        eq(productVariants.product_id, products.id)
      )
      .where(eq(products.created_by, userId))
      .groupBy(
        products.id,
        products.title,
        products.slug,
        products.brand,
        products.model,
        products.gadgetType,
        products.status,
        products.visibility,
        products.condition,
        products.short_description,
        products.description,
        products.warrantyType,
        products.warrantyMonths,
        products.warrantyDescription,
        products.category_id,
        products.techSpecId,
        products.created_by,
        products.created_at,
        products.updated_at
      );

    if (productList.length === 0) {
      return NextResponse.json({ error: "Not Found Data" }, { status: 404 });
    }

    // Fetch images and category names
    const results = await Promise.all(
      productList.map(async (product) => {
        const images = await db
          .select({ url: productImages.url, alt: productImages.alt })
          .from(productImages)
          .where(eq(productImages.product_id, product.id));

        const category = product.category_id
          ? await db
              .select({ name: categories.name })
              .from(categories)
              .where(eq(categories.id, product.category_id))
              .then((res) => res[0]?.name || null)
          : null;

        return {
          id: product.id,
          title: product.title,
          slug: product.slug,
          brand: product.brand,
          model: product.model,
          gadgetType: product.gadgetType,
          status: product.status,
          visibility: product.visibility,
          condition: product.condition,
          shortDescription: product.short_description,
          description: product.description,
          warrantyType: product.warrantyType,
          warrantyMonths: product.warrantyMonths,
          warrantyDescription: product.warrantyDescription,
          category_id: product.category_id,
          categoryName: category,
          techSpecId: product.techSpecId,
          price: product.price,
          variants: product.variants,
          images: images.length > 0 ? images : [{ url: "", alt: "" }],
          created_by: product.created_by,
          created_at: product.created_at,
          updated_at: product.updated_at,
        };
      })
    );

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = req.nextUrl.searchParams.get("userId");
  
  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 403 }
    );
  }

  try {
    // Extract tech spec fields
    const techSpecData = {
      processor: body.processor,
      processorCores: body.processorCores,
      processorThreads: body.processorThreads,
      processorSpeed: body.processorSpeed,
      processorArch: body.processorArch,
      ram: body.ram,
      ramType: body.ramType,
      ramSpeed: body.ramSpeed,
      storage: body.storage,
      storageType: body.storageType,
      storageInterface: body.storageInterface,
      storageExpansion: body.storageExpansion,
      gpu: body.gpu,
      gpuMemory: body.gpuMemory,
      gpuMemoryType: body.gpuMemoryType,
      displaySize: body.displaySize,
      displayTech: body.displayTech,
      displayResolution: body.displayResolution,
      refreshRate: body.refreshRate,
      colorDepth: body.colorDepth,
      brightness: body.brightness,
      screenCoating: body.screenCoating,
      batteryCapacity: body.batteryCapacity,
      batteryType: body.batteryType,
      batteryLife: body.batteryLife,
      fastCharging: body.fastCharging,
      wirelessCharging: body.wirelessCharging,
      rearCameraMP: body.rearCameraMP,
      rearCameraAperture: body.rearCameraAperture,
      frontCameraMP: body.frontCameraMP,
      frontCameraAperture: body.frontCameraAperture,
      videoCapability: body.videoCapability,
      opticalZoom: body.opticalZoom,
      speakerCount: body.speakerCount,
      speakerWatts: body.speakerWatts,
      audioCodec: body.audioCodec,
      microphone: body.microphone,
      bluetooth: body.bluetooth,
      wifi: body.wifi,
      nfc: body.nfc,
      usb: body.usb,
      ports: body.ports,
      cellular: body.cellular,
      sim: body.sim,
      weight: body.weight,
      dimensions: body.dimensions,
      material: body.material,
      ipRating: body.ipRating,
      mrlRating: body.mrlRating,
      dropProtection: body.dropProtection,
      operatingSystem: body.operatingSystem,
      maxOSUpdate: body.maxOSUpdate,
      softwareSupport: body.softwareSupport,
      antutuScore: body.antutuScore,
      geekbenchScore: body.geekbenchScore,
      fps: body.fps,
      thermalDesignPower: body.thermalDesignPower,
      maxTemperature: body.maxTemperature,
    };

    // Insert tech specs first
    const [techSpec] = await db
      .insert(techSpecifications)
      .values(techSpecData)
      .returning({ id: techSpecifications.id });

    if (!techSpec) {
      return NextResponse.json(
        { error: "Failed to save technical specifications" },
        { status: 500 }
      );
    }

    // Insert product with camelCase to snake_case mapping
    const newProduct = await db
      .insert(products)
      .values({
        title: body.title,
        slug: body.slug,
        short_description: body.shortDescription,
        description: body.description,
        brand: body.brand,
        model: body.model,
        category_id: body.category_id,
        status: body.status,
        visibility: body.visibility,
        gadgetType: body.gadgetType || "other",
        condition: body.condition,
        warrantyType: body.warrantyType,
        warrantyMonths: body.warrantyMonths,
        warrantyDescription: body.warrantyDescription,
        techSpecId: techSpec.id,
        attributes: body.attributes,
        created_by: userId,
      })
      .returning();

    // Insert images
    if (body.images?.length) {
      await db.insert(productImages).values(
        body.images.map((img: any, index: number) => ({
          product_id: newProduct[0].id,
          url: img.url,
          alt: img.alt,
          position: index,
        }))
      );
    }

    // Insert variants
    if (body.variants?.length) {
      await db.insert(productVariants).values(
        body.variants.map((v: any) => ({
          product_id: newProduct[0].id,
          sku: v.sku,
          variantName: v.variantName,
          color: v.color,
          storageVariant: v.storageVariant,
          ramVariant: v.ramVariant,
          regionVariant: v.regionVariant,
          price: v.price.toString(),
          currency: v.currency,
          stock: v.stock,
        }))
      );
    }

    return NextResponse.json({
      message: "Product created",
      product: newProduct[0],
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
