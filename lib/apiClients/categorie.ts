export async function addCategory() {
  const res = await fetch("http://localhost:3000/api/seller/categories", {
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
  console.log("Categories Start");
  const response = await fetch("http://localhost:3000/api/seller/categories");
  const data = await response.json();
  console.log("Categories Call Res: ", data);
  return data;
}
