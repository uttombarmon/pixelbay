import { db } from "@/lib/db/drizzle";
import {
  products,
  productImages,
  productVariants,
  techSpecifications,
} from "@/lib/db/schema/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/guards";

interface VariantInput {
  sku?: string;
  variantName?: string;
  color?: string;
  storageVariant?: string;
  ramVariant?: string;
  regionVariant?: string;
  price?: number | string;
  currency?: string;
  stock?: number;
  created_at?: unknown;
  updated_at?: unknown;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await requireRole(["seller", "admin"]);

  if (!result.ok) {
    return result.response;
  }

  // const userId = result.user.id;

  const productId = Number(id);

  if (!Number.isSafeInteger(productId) || productId <= 0) {
    return NextResponse.json(
      { error: "Invalid product ID" },
      { status: 400 },
    );
  }

  const ownershipCondition =
    result.user.role === "admin"
      ? eq(products.id, productId)
      : and(
        eq(products.id, productId),
        eq(products.created_by, result.user.id),
      );
  try {
    const productRows = await db
      .select()
      .from(products)
      .where(ownershipCondition)
      .limit(1);

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
      { status: 500 },
    );
  }
}


export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await requireRole(["seller", "admin"]);

  if (!result.ok) return result.response;

  const productId = Number(id);

  if (!Number.isSafeInteger(productId) || productId <= 0) {
    return NextResponse.json(
      { error: "Invalid product ID" },
      { status: 400 },
    );
  }

  try {
    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body" },
        { status: 400 },
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { error: "Request body must be a JSON object" },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;

    const images = payload.images as
      | { url: string; alt: string }[]
      | undefined;

    const variants = payload.variants as VariantInput[] | undefined;

    if (
      (payload.images !== undefined &&
        (!Array.isArray(payload.images) ||
          !payload.images.every(
            (img: unknown) =>
              typeof img === "object" &&
              img !== null &&
              !Array.isArray(img) &&
              "url" in img &&
              typeof img.url === "string" &&
              "alt" in img &&
              typeof img.alt === "string" &&
              img.url.length <= 2048 &&
              img.alt.length <= 500 &&
              /^https?:\/\//i.test(img.url),
          ))) ||
      (payload.variants !== undefined &&
        (!Array.isArray(payload.variants) ||
          !payload.variants.every(
            (variant: unknown) =>
              typeof variant === "object" &&
              variant !== null &&
              !Array.isArray(variant),
          ))
      )
    ) {
      return NextResponse.json(
        { error: "Invalid images or variants" },
        { status: 400 },
      );
    }

    if (
      variants?.some(
        (variant) =>
          (variant.price !== undefined &&
            (!Number.isFinite(Number(variant.price)) ||
              Number(variant.price) < 0)) ||
          (variant.stock !== undefined &&
            (!Number.isSafeInteger(variant.stock) ||
              variant.stock < 0)),
      )
    ) {
      return NextResponse.json(
        { error: "Invalid variant price or stock" },
        { status: 400 },
      );
    }

    const ownershipCondition =
      result.user.role === "admin"
        ? eq(products.id, productId)
        : and(
          eq(products.id, productId),
          eq(products.created_by, result.user.id),
        );

    const techSpecFields = [
      "processor",
      "processorCores",
      "processorThreads",
      "processorSpeed",
      "processorArch",
      "ram",
      "ramType",
      "ramSpeed",
      "storage",
      "storageType",
      "storageInterface",
      "storageExpansion",
      "gpu",
      "gpuMemory",
      "gpuMemoryType",
      "displaySize",
      "displayTech",
      "displayResolution",
      "refreshRate",
      "colorDepth",
      "brightness",
      "screenCoating",
      "batteryCapacity",
      "batteryType",
      "batteryLife",
      "fastCharging",
      "wirelessCharging",
      "rearCameraMP",
      "rearCameraAperture",
      "frontCameraMP",
      "frontCameraAperture",
      "videoCapability",
      "opticalZoom",
      "speakerCount",
      "speakerWatts",
      "audioCodec",
      "microphone",
      "bluetooth",
      "wifi",
      "nfc",
      "usb",
      "ports",
      "cellular",
      "sim",
      "weight",
      "dimensions",
      "material",
      "ipRating",
      "mrlRating",
      "dropProtection",
      "operatingSystem",
      "maxOSUpdate",
      "softwareSupport",
      "antutuScore",
      "geekbenchScore",
      "fps",
      "thermalDesignPower",
      "maxTemperature",
    ] as const;

    const productFieldMap: Record<string, string> = {
      title: "title",
      slug: "slug",
      brand: "brand",
      model: "model",
      gadgetType: "gadgetType",
      status: "status",
      visibility: "visibility",
      condition: "condition",
      shortDescription: "short_description",
      description: "description",
      warrantyType: "warrantyType",
      warrantyMonths: "warrantyMonths",
      warrantyDescription: "warrantyDescription",
      category_id: "category_id",
    };

    const productUpdateData: Record<string, unknown> = {};

    for (const [inputKey, dbKey] of Object.entries(productFieldMap)) {
      if (Object.prototype.hasOwnProperty.call(payload, inputKey)) {
        productUpdateData[dbKey] = payload[inputKey];
      }
    }

    const outcome = await db.transaction(async (tx) => {
      const [existingProduct] = await tx
        .select({
          id: products.id,
          techSpecId: products.techSpecId,
        })
        .from(products)
        .where(ownershipCondition)
        .limit(1);

      if (!existingProduct) {
        return "not-found" as const;
      }

      if (existingProduct.techSpecId) {
        const techSpecData = Object.fromEntries(
          techSpecFields
            .filter((field) =>
              Object.prototype.hasOwnProperty.call(payload, field),
            )
            .map((field) => [field, payload[field]]),
        );

        if (Object.keys(techSpecData).length > 0) {
          await tx
            .update(techSpecifications)
            .set(
              techSpecData as Partial<
                typeof techSpecifications.$inferInsert
              >,
            )
            .where(
              eq(
                techSpecifications.id,
                existingProduct.techSpecId,
              ),
            );
        }
      }

      const updatedProduct = await tx
        .update(products)
        .set({
          ...productUpdateData,
          updated_at: new Date(),
        })
        .where(ownershipCondition)
        .returning({ id: products.id });

      if (updatedProduct.length === 0) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      if (images !== undefined) {
        await tx
          .delete(productImages)
          .where(eq(productImages.product_id, productId));

        if (images.length > 0) {
          await tx.insert(productImages).values(
            images.map((img, index) => ({
              product_id: productId,
              url: img.url,
              alt: img.alt,
              position: index,
            })),
          );
        }
      }

      if (variants !== undefined) {
        await tx
          .delete(productVariants)
          .where(eq(productVariants.product_id, productId));

        if (variants.length > 0) {
          await tx.insert(productVariants).values(
            variants.map((variant, index) => ({
              product_id: productId,
              sku:
                variant.sku ||
                `SKU-${productId}-${index}-${crypto.randomUUID()}`,
              variantName: variant.variantName,
              color: variant.color,
              storageVariant: variant.storageVariant,
              ramVariant: variant.ramVariant,
              regionVariant: variant.regionVariant,
              price: String(variant.price ?? 0),
              currency: variant.currency || "USD",
              stock: variant.stock ?? 0,
            })),
          );
        }
      }

      return "updated" as const;
    });

    if (outcome === "not-found") {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "PRODUCT_NOT_FOUND"
    ) {
      return NextResponse.json(
        { error: "Product not found or permission denied" },
        { status: 404 },
      );
    }

    console.error("Error updating product:", error);

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}


export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const result = await requireRole(["seller", "admin"]);

  if (!result.ok) {
    return result.response;
  }

  const productId = Number(id);

  if (!Number.isSafeInteger(productId) || productId <= 0) {
    return NextResponse.json(
      { error: "Invalid product ID" },
      { status: 400 },
    );
  }

  const ownershipCondition =
    result.user.role === "admin"
      ? eq(products.id, productId)
      : and(
        eq(products.id, productId),
        eq(products.created_by, result.user.id),
      );

  try {
    const archivedProducts = await db
      .update(products)
      .set({
        status: "archived",
        updated_at: new Date(),
      })
      .where(ownershipCondition)
      .returning({
        id: products.id,
      });

    if (archivedProducts.length === 0) {
      return NextResponse.json(
        {
          error:
            "Product not found or you do not have permission to archive it.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Product archived successfully",
        id: archivedProducts[0].id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error archiving product:", error);

    return NextResponse.json(
      { error: "Failed to archive product" },
      { status: 500 },
    );
  }
}
