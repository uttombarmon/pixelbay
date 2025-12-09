import { db } from "@/lib/db/drizzle";
import {
  products,
  categories,
  productImages,
  productVariants,
  techSpecifications,
} from "@/lib/db/schema/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!session || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Fetch the product along with its images and variants
    const productRows = await db
      .select()
      .from(products)
      .where(and(eq(products.id, productId), eq(products.created_by, userId)));

    if (!productRows || productRows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productData = productRows[0];

    const images = await db
      .select()
      .from(productImages)
      .where(eq(productImages.product_id, productId))
      .orderBy(productImages.position);

    const variants = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.product_id, productId));

    // Fetch tech specs if available
    let techSpecs = null;
    if (productData.techSpecId) {
      const techSpecRows = await db
        .select()
        .from(techSpecifications)
        .where(eq(techSpecifications.id, productData.techSpecId));
      
      if (techSpecRows.length > 0) {
        techSpecs = techSpecRows[0];
      }
    }

    // Map to camelCase for form compatibility
    const product = {
      id: Number(productData.id),
      title: productData.title,
      slug: productData.slug,
      shortDescription: productData.short_description,
      description: productData.description,
      brand: productData.brand,
      model: productData.model,
      gadgetType: productData.gadgetType,
      status: productData.status,
      visibility: productData.visibility,
      condition: productData.condition,
      warrantyType: productData.warrantyType,
      warrantyMonths: productData.warrantyMonths,
      warrantyDescription: productData.warrantyDescription,
      category_id: productData.category_id,
      techSpecId: productData.techSpecId,
      attributes: productData.attributes || {},
      images: images.length > 0 ? images : [{ url: "", alt: "" }],
      variants,
      // Include tech specs fields if available
      ...(techSpecs && {
        processor: techSpecs.processor,
        processorCores: techSpecs.processorCores,
        processorThreads: techSpecs.processorThreads,
        processorSpeed: techSpecs.processorSpeed,
        processorArch: techSpecs.processorArch,
        ram: techSpecs.ram,
        ramType: techSpecs.ramType,
        ramSpeed: techSpecs.ramSpeed,
        storage: techSpecs.storage,
        storageType: techSpecs.storageType,
        storageInterface: techSpecs.storageInterface,
        storageExpansion: techSpecs.storageExpansion,
        gpu: techSpecs.gpu,
        gpuMemory: techSpecs.gpuMemory,
        gpuMemoryType: techSpecs.gpuMemoryType,
        displaySize: techSpecs.displaySize,
        displayTech: techSpecs.displayTech,
        displayResolution: techSpecs.displayResolution,
        refreshRate: techSpecs.refreshRate,
        colorDepth: techSpecs.colorDepth,
        brightness: techSpecs.brightness,
        screenCoating: techSpecs.screenCoating,
        batteryCapacity: techSpecs.batteryCapacity,
        batteryType: techSpecs.batteryType,
        batteryLife: techSpecs.batteryLife,
        fastCharging: techSpecs.fastCharging,
        wirelessCharging: techSpecs.wirelessCharging,
        rearCameraMP: techSpecs.rearCameraMP,
        rearCameraAperture: techSpecs.rearCameraAperture,
        frontCameraMP: techSpecs.frontCameraMP,
        frontCameraAperture: techSpecs.frontCameraAperture,
        videoCapability: techSpecs.videoCapability,
        opticalZoom: techSpecs.opticalZoom,
        speakerCount: techSpecs.speakerCount,
        speakerWatts: techSpecs.speakerWatts,
        audioCodec: techSpecs.audioCodec,
        microphone: techSpecs.microphone,
        bluetooth: techSpecs.bluetooth,
        wifi: techSpecs.wifi,
        nfc: techSpecs.nfc,
        usb: techSpecs.usb,
        ports: techSpecs.ports,
        cellular: techSpecs.cellular,
        sim: techSpecs.sim,
        weight: techSpecs.weight,
        dimensions: techSpecs.dimensions,
        material: techSpecs.material,
        ipRating: techSpecs.ipRating,
        mrlRating: techSpecs.mrlRating,
        dropProtection: techSpecs.dropProtection,
        operatingSystem: techSpecs.operatingSystem,
        maxOSUpdate: techSpecs.maxOSUpdate,
        softwareSupport: techSpecs.softwareSupport,
        antutuScore: techSpecs.antutuScore,
        geekbenchScore: techSpecs.geekbenchScore,
        fps: techSpecs.fps,
        thermalDesignPower: techSpecs.thermalDesignPower,
        maxTemperature: techSpecs.maxTemperature,
      }),
    };

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const role = session?.user?.role;
  const userId = session?.user?.id;
  if (
    !session ||
    typeof role !== "string" ||
    !["admin", "seller"].includes(role) ||
    typeof userId !== "string"
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const productId = Number(id);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { images, variants, created_at, updated_at, ...productData } = body;
    delete productData.created_at;
    delete productData.updated_at;
    let clearVariants;
    if (variants) {
      clearVariants = variants.map((v: any) => {
        delete v.created_at;
        delete v.updated_at;
        return v;
      });
    }
    // Extract tech specs
    const {
      techSpecId,
      processor,
      processorCores,
      processorThreads,
      processorSpeed,
      processorArch,
      ram,
      ramType,
      ramSpeed,
      storage,
      storageType,
      storageInterface,
      storageExpansion,
      gpu,
      gpuMemory,
      gpuMemoryType,
      displaySize,
      displayTech,
      displayResolution,
      refreshRate,
      colorDepth,
      brightness,
      screenCoating,
      batteryCapacity,
      batteryType,
      batteryLife,
      fastCharging,
      wirelessCharging,
      rearCameraMP,
      rearCameraAperture,
      frontCameraMP,
      frontCameraAperture,
      videoCapability,
      opticalZoom,
      speakerCount,
      speakerWatts,
      audioCodec,
      microphone,
      bluetooth,
      wifi,
      nfc,
      usb,
      ports,
      cellular,
      sim,
      weight,
      dimensions,
      material,
      ipRating,
      mrlRating,
      dropProtection,
      operatingSystem,
      maxOSUpdate,
      softwareSupport,
      antutuScore,
      geekbenchScore,
      fps,
      thermalDesignPower,
      maxTemperature,
      ...mainProductData
    } = productData;

    if (techSpecId) {
       await db.update(techSpecifications).set({
          processor, processorCores, processorThreads, processorSpeed, processorArch,
          ram, ramType, ramSpeed,
          storage, storageType, storageInterface, storageExpansion,
          gpu, gpuMemory, gpuMemoryType,
          displaySize, displayTech, displayResolution, refreshRate, colorDepth, brightness, screenCoating,
          batteryCapacity, batteryType, batteryLife, fastCharging, wirelessCharging,
          rearCameraMP, rearCameraAperture, frontCameraMP, frontCameraAperture, videoCapability, opticalZoom,
          speakerCount, speakerWatts, audioCodec, microphone,
          bluetooth, wifi, nfc, usb, ports, cellular, sim,
          weight, dimensions, material, ipRating, mrlRating, dropProtection,
          operatingSystem, maxOSUpdate, softwareSupport,
          antutuScore, geekbenchScore, fps, thermalDesignPower, maxTemperature,
       }).where(eq(techSpecifications.id, techSpecId));
    }

    // Map camelCase to snake_case for database
    const productUpdateData: any = {};
    if (mainProductData.title) productUpdateData.title = mainProductData.title;
    if (mainProductData.slug) productUpdateData.slug = mainProductData.slug;
    if (mainProductData.brand) productUpdateData.brand = mainProductData.brand;
    if (mainProductData.model !== undefined) productUpdateData.model = mainProductData.model;
    if (mainProductData.gadgetType) productUpdateData.gadgetType = mainProductData.gadgetType;
    if (mainProductData.status) productUpdateData.status = mainProductData.status;
    if (mainProductData.visibility) productUpdateData.visibility = mainProductData.visibility;
    if (mainProductData.condition) productUpdateData.condition = mainProductData.condition;
    if (mainProductData.shortDescription !== undefined) productUpdateData.short_description = mainProductData.shortDescription;
    if (mainProductData.description !== undefined) productUpdateData.description = mainProductData.description;
    if (mainProductData.warrantyType !== undefined) productUpdateData.warrantyType = mainProductData.warrantyType;
    if (mainProductData.warrantyMonths !== undefined) productUpdateData.warrantyMonths = mainProductData.warrantyMonths;
    if (mainProductData.warrantyDescription !== undefined) productUpdateData.warrantyDescription = mainProductData.warrantyDescription;
    if (mainProductData.category_id !== undefined) productUpdateData.category_id = mainProductData.category_id;

    // Update product
    const updatedProduct = await db
      .update(products)
      .set({ ...productUpdateData, updated_at: new Date() })
      .where(and(eq(products.id, productId), eq(products.created_by, userId)))
      .returning();

    if (updatedProduct.length === 0) {
      return NextResponse.json(
        {
          error: "Product not found or you do not have permission to edit it.",
        },
        { status: 404 }
      );
    }

    // Update images
    await db
      .delete(productImages)
      .where(eq(productImages.product_id, productId));
    if (images && images.length > 0) {
      await db.insert(productImages).values(
        images.map((img: { url: string; alt: string }, index: number) => ({
          product_id: productId,
          url: img.url,
          alt: img.alt,
          position: index,
        }))
      );
    }

    // Update variants
    await db
      .delete(productVariants)
      .where(eq(productVariants.product_id, productId));
    if (variants && variants.length > 0) {
      await db.insert(productVariants).values(
        variants.map((v: any) => ({
          product_id: productId,
          sku: v.sku,
          variantName: v.variantName,
          color: v.color,
          storageVariant: v.storageVariant,
          ramVariant: v.ramVariant,
          regionVariant: v.regionVariant,
          price: v.price?.toString() || "0",
          currency: v.currency || "USD",
          stock: v.stock || 0,
        }))
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const role = session?.user?.role;
  const userId = session?.user?.id;
  if (
    !session ||
    typeof role !== "string" ||
    !["admin", "seller"].includes(role) ||
    typeof userId !== "string"
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    await db
      .delete(products)
      .where(and(eq(products.id, productId), eq(products.created_by, userId)));

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
