import { db } from "@/lib/db/drizzle";
import {
  products,
  productVariants,
  productImages,
} from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/customs/payment/CheckoutForm";

interface SearchParams {
  productId?: string;
  variantId?: string;
  quantity?: string;
}

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const productId = Number(params.productId);
  const variantId = Number(params.variantId);
  const quantity = Number(params.quantity) || 1;

  if (!productId || !variantId) {
    redirect("/");
  }

  // Fetch Product
  const productData = await db.query.products.findFirst({
    where: eq(products.id, productId),
    columns: {
      id: true,
      title: true,
    },
  });

  // Fetch Image manually (since relations aren't defined)
  const imageData = await db.query.productImages.findFirst({
    where: eq(productImages.product_id, productId),
    columns: { url: true },
    orderBy: (images, { asc }) => [asc(images.position)],
  });

  // Fetch Variant
  const variantData = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, variantId),
    columns: {
      id: true,
      variantName: true,
      price: true,
      sku: true,
    },
  });

  if (!productData || !variantData) {
    redirect("/");
  }

  const product = {
    id: productData.id,
    title: productData.title,
    image: imageData?.url,
  };

  const variant = {
    id: variantData.id,
    name: variantData.variantName || variantData.sku,
    price: variantData.price,
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <CheckoutForm product={product} variant={variant} quantity={quantity} />
    </div>
  );
}
