export async function fetchCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/categories`, {
        cache: "force-cache",
        next: { revalidate: 3600, tags: ["categories"] },
    });
    if (!res.ok) return [];
    return res.json();
}

export async function fetchSuperDeals() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/products/super-deals`, {
        cache: "no-store",
        next: { revalidate: 300, tags: ["super-deals"] },
    });
    if (!res.ok) return [];
    return res.json();
}

export async function fetchNewArrivals() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/products/new-arrivals`, {
        cache: "force-cache",
        next: { revalidate: 300, tags: ["new-arrivals"] },
    });
    if (!res.ok) return [];
    return res.json();
}

export async function fetchFeaturedReviews() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/reviews/featured`, {
        cache: "force-cache",
        next: { revalidate: 300, tags: ["featured-reviews"] },
    });
    if (!res.ok) return [];
    return res.json();
}
