export async function fetchPopularProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/products/popular`
  );
  const data = res.json();
  return data;
}
