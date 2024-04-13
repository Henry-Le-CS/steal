/**
 * Get item from localStorage
 * @param id 
 */
export const getItemsFromCart= () => {
    const storedData = localStorage.getItem("cart");
    if (!storedData) return {};

    const cart = JSON.parse(storedData) as Record<string, number>;

    return cart || {};
}

/**
 * Add item to localStorage
 * @param id 
 */
export const updateCart = (id: string, count: number) => {
    const storedData = localStorage.getItem("cart") || "{}";
    const cart = JSON.parse(storedData) as Record<string, number>;

    cart[id] = count;

    localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Update multiple
 */
export const updateMultipleCart = (items: Record<string, number>) => {
    const storedData = localStorage.getItem("cart") || "{}";
    const cart = JSON.parse(storedData) as Record<string, number>;

    for (const [id, count] of Object.entries(items)) {
        cart[id] = count;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}