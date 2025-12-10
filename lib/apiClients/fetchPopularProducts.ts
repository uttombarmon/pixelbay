export async function fetchPopularProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/products/popular`,
    {
      cache: "force-cache",
      next: {
        revalidate: 300, // Revalidate every 5 minutes
        tags: ["popular-products"],
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch popular products");
    return [];
  }

  const data = await res.json();
  return data;
}
