export async function addCategory() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/categories`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Tablets",
        slug: "tablets",
        path: "/electronics/tablets",
        metadata: { icon: "📟", description: "Portable touchscreen devices" },
      }),
    }
  );

  const data = await res.json();
  return data;
}
export async function getAllCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/seller/categories`
  );
  const data = await response.json();
  return data;
}
