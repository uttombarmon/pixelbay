import { notFound } from "next/navigation";
import Details from "@/components/customs/products/product/Details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/products/${productId}`
  );
  const product = await response.json();

  if (!product) return notFound();

  return (
    <div className="min-h-screen w-full px-6 md:px-16 py-12 flex flex-col gap-10">
      <Details product={product} />
    </div>
  );
}
