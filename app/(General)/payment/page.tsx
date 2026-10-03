import { db } from "@/lib/db/drizzle";
import {
  products,
  productVariants,
  productImages,
  carts,
  cartItems,
} from "@/lib/db/schema/schema";
import { and, eq, gte } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
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
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  if (params.mode === "cart") {
    const [cart] = await db
      .select({ id: carts.id })
      .from(carts)
      .where(eq(carts.user_id, session.user.id))
      .limit(1);

    if (!cart) {
      redirect("/dashboard/mycart");
    }

    const items = await db
      .select({
        id: cartItems.id,
        productId: products.id,
        variantId: productVariants.id,
        name: products.title,
        price: productVariants.price,
        quantity: cartItems.quantity,
        image: productImages.url,
        slug: products.slug,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.product_id, products.id))
      .innerJoin(productVariants, eq(cartItems.variant_id, productVariants.id))
      .leftJoin(
        productImages,
        and(
          eq(productImages.product_id, products.id),
          eq(productImages.isMain, true),
        ),
      )
      .where(
        and(
          eq(cartItems.cart_id, cart.id),
          eq(productVariants.product_id, products.id),
          eq(products.status, "active"),
          eq(products.visibility, "visible"),
          eq(productVariants.status, "active"),
          eq(productVariants.visibility, "visible"),
          gte(productVariants.stock, cartItems.quantity),
        ),
      );

    if (items.length === 0) {
      redirect("/dashboard/mycart");
    }

    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
        <CheckoutForm
          items={items.map((item) => ({
            ...item,
            image: item.image ?? undefined,
          }))}
        />
      </div>
    );
  }

  const productId = Number(params.productId);
  const variantId = Number(params.variantId);
  const quantity = params.quantity === undefined ? 1 : Number(params.quantity);

  if (
    !Number.isSafeInteger(productId) ||
    productId <= 0 ||
    !Number.isSafeInteger(variantId) ||
    variantId <= 0 ||
    !Number.isSafeInteger(quantity) ||
    quantity < 1 ||
    quantity > 99
  ) {
    redirect("/");
  }

  const [variantData] = await db
    .select({
      id: productVariants.id,
      productId: products.id,
      title: products.title,
      variantName: productVariants.variantName,
      sku: productVariants.sku,
      price: productVariants.price,
      stock: productVariants.stock,
    })
    .from(productVariants)
    .innerJoin(products, eq(productVariants.product_id, products.id))
    .where(
      and(
        eq(products.id, productId),
        eq(productVariants.id, variantId),
        eq(products.status, "active"),
        eq(products.visibility, "visible"),
        eq(productVariants.status, "active"),
        eq(productVariants.visibility, "visible"),
        gte(productVariants.stock, quantity),
      ),
    )
    .limit(1);

  if (!variantData) {
    redirect("/");
  }

  const [imageData] = await db
    .select({ url: productImages.url })
    .from(productImages)
    .where(
      and(
        eq(productImages.product_id, productId),
        eq(productImages.isMain, true),
      ),
    )
    .limit(1);

  const product = {
    id: variantData.productId,
    title: variantData.title,
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
