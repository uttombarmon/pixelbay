export const addToCartItem = async (product_id: number, variant_id: number, quantity: number, unit_price: number) => {
    const response = await fetch("/api/carts/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            product_id,
            variant_id,
            quantity,
            unit_price,
        }),
    });
    const data = await response.json();
    return data;
}   