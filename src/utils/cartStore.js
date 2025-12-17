
// Lógica del carrito de compras con persistencia
const CART_KEY = 'dinopark_cart';

export function getCart() {
    if (typeof localStorage === 'undefined') return [];
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

export function addToCart(item) {
    if (typeof localStorage === 'undefined') return;
    const cart = getCart();

    // Comprobar si el artículo existe
    const existingItem = cart.find(i => i.id === item.id);
    const quantityToAdd = item.quantity || 1;

    if (existingItem) {
        existingItem.quantity += quantityToAdd;
    } else {
        cart.push({ ...item, quantity: quantityToAdd });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    dispatchUpdate();
}

export function removeFromCart(id) {
    if (typeof localStorage === 'undefined') return;
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== id);
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
    dispatchUpdate();
}

export function updateQuantity(id, quantity) {
    if (typeof localStorage === 'undefined') return;
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            return removeFromCart(id);
        }
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    dispatchUpdate();
}

export function clearCart() {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(CART_KEY);
    dispatchUpdate();
}

function dispatchUpdate() {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new Event('cart-updated'));
}
