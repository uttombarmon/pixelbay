import { notFound } from "next/navigation";
import Details from "@/components/customs/products/product/Details";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id);

  // Validate product ID
  if (isNaN(productId)) {
    return notFound();
  }

  // Fetch product with proper caching - revalidate every 60 seconds
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/products/${productId}`,
    {
      cache: "force-cache", // Cache the response
      next: {
        revalidate: 60, // Revalidate every 60 seconds
        tags: [`product-${productId}`], // Tag for on-demand revalidation
      },
    }
  );

  if (!response.ok) {
    return notFound();
  }

  const product = await response.json();

  if (!product || product.error) {
    return notFound();
  }

  return (
    <div className="min-h-screen w-full px-6 md:px-16 py-12 flex flex-col gap-10">
      <Details product={product} />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    return {
      title: "Product Not Found",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/products/${productId}`,
      {
        cache: "force-cache",
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return {
        title: "Product Not Found",
      };
    }

    const product = await response.json();

    return {
      title: product.title || "Product",
      description: product.short_description || product.description,
    };
  } catch (error) {
    return {
      title: "Product Not Found",
    };
  }
}
