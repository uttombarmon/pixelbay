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
  mode?: string;
}

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const mode = params.mode;

  // Cart mode: fetch all cart items
  if (mode === "cart") {
    const { auth } = await import("@/lib/auth/auth");
    const session = await auth();

    if (!session?.user?.id) {
      redirect("/auth/signin");
    }

    // Fetch cart items
    const cartResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/carts`,
      {
        headers: {
          Cookie: `next-auth.session-token=${session.user.id}`, // Pass session if needed
        },
      }
    );

    if (!cartResponse.ok) {
      redirect("/dashboard/mycart");
    }

    const cartData = await cartResponse.json();
    const items = cartData.items || [];

    if (items.length === 0) {
      redirect("/dashboard/mycart");
    }

    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
        <CheckoutForm items={items} />
      </div>
    );
  }

  // Single item mode (Buy Now)
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
