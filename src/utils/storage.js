import { seedProducts } from '../data/seedProducts';

export const storageKeys = {
  products: 'cartify_products',
  cart: 'cartify_cart',
  wishlist: 'cartify_wishlist',
  orders: 'cartify_orders',
  user: 'cartify_user',
  admin: 'cartify_admin',
  theme: 'cartify_theme',
};

export function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function initializeStorage() {
  if (!window.localStorage.getItem(storageKeys.products)) {
    writeStorage(storageKeys.products, seedProducts);
  }

  if (!window.localStorage.getItem(storageKeys.cart)) {
    writeStorage(storageKeys.cart, []);
  }

  if (!window.localStorage.getItem(storageKeys.wishlist)) {
    writeStorage(storageKeys.wishlist, []);
  }

  if (!window.localStorage.getItem(storageKeys.orders)) {
    writeStorage(storageKeys.orders, []);
  }
}
