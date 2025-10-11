export async function addCategory() {
  const res = await fetch("/api/seller/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Tablets",
      slug: "tablets",
      path: "/electronics/tablets",
      metadata: { icon: "📟", description: "Portable touchscreen devices" },
    }),
  });

  const data = await res.json();
  console.log("Created:", data);
  return data;
}
export async function getAllCategories() {
  const response = await fetch("/api/seller/categories");
  const data = await response.json();
  return data;
}
