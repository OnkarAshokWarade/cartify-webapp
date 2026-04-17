import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { initializeStorage, readStorage, storageKeys, writeStorage } from '../utils/storage';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    initializeStorage();
    setProducts(readStorage(storageKeys.products, []));
    setCart(readStorage(storageKeys.cart, []));
    setWishlist(readStorage(storageKeys.wishlist, []));
    setOrders(readStorage(storageKeys.orders, []));
    setUser(readStorage(storageKeys.user, null));
    setAdmin(readStorage(storageKeys.admin, false));
    setDarkMode(readStorage(storageKeys.theme, 'light') === 'dark');
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      writeStorage(storageKeys.products, products);
    }
  }, [isReady, products]);

  useEffect(() => {
    if (isReady) {
      writeStorage(storageKeys.cart, cart);
    }
  }, [cart, isReady]);

  useEffect(() => {
    if (isReady) {
      writeStorage(storageKeys.wishlist, wishlist);
    }
  }, [isReady, wishlist]);

  useEffect(() => {
    if (isReady) {
      writeStorage(storageKeys.orders, orders);
    }
  }, [isReady, orders]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (user) {
      writeStorage(storageKeys.user, user);
    } else {
      window.localStorage.removeItem(storageKeys.user);
    }
  }, [isReady, user]);

  useEffect(() => {
    if (isReady) {
      writeStorage(storageKeys.admin, admin);
    }
  }, [admin, isReady]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', darkMode);
    writeStorage(storageKeys.theme, theme);
  }, [darkMode, isReady]);

  useEffect(
    () => () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    },
    [],
  );

  function showToast(message, type = 'success') {
    setToast({ id: Date.now(), message, type });

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 2600);
  }

  const productMap = {};

  products.forEach((product) => {
    productMap[product.id] = product;
  });

  const cartItems = cart
    .map((item) => {
      const product = productMap[item.productId];

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter(Boolean);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const wishlistItems = wishlist.map((productId) => productMap[productId]).filter(Boolean);

  function toggleDarkMode() {
    setDarkMode((current) => !current);
  }

  function addToCart(productId) {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);

      if (existing) {
        return current.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...current, { productId, quantity: 1 }];
    });

    showToast('Added to cart');
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item.productId !== productId));
    showToast('Removed from cart', 'info');
  }

  function updateCartQuantity(productId, nextQuantity) {
    if (nextQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  }

  function toggleWishlist(productId) {
    setWishlist((current) => {
      if (current.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return current.filter((id) => id !== productId);
      }

      showToast('Added to wishlist');
      return [...current, productId];
    });
  }

  function loginUser(profile) {
    setUser(profile);
    showToast(`Welcome, ${profile.name}`);
  }

  function logoutUser() {
    setUser(null);
    showToast('Logged out successfully', 'info');
  }

  function loginAdmin(password) {
    if (password === '9322070390') {
      setAdmin(true);
      showToast('Admin access granted');
      return true;
    }

    showToast('Invalid admin password', 'error');
    return false;
  }

  function logoutAdmin() {
    setAdmin(false);
    showToast('Admin session ended', 'info');
  }

  function addProduct(product) {
    setProducts((current) => [{ ...product, id: `product-${Date.now()}` }, ...current]);
    showToast('Product added');
  }

  function updateProduct(productId, updates) {
    setProducts((current) =>
      current.map((product) => (product.id === productId ? { ...product, ...updates } : product)),
    );
    showToast('Product updated');
  }

  function deleteProduct(productId) {
    setProducts((current) => current.filter((product) => product.id !== productId));
    setCart((current) => current.filter((item) => item.productId !== productId));
    setWishlist((current) => current.filter((id) => id !== productId));
    showToast('Product deleted', 'info');
  }

  function placeOrder(customer) {
    const newOrder = {
      id: `CTY-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      customer,
      user,
      items: cartItems,
      total: cartTotal,
    };

    setOrders((current) => [newOrder, ...current]);
    setCart([]);
    showToast('Order placed successfully');
    return newOrder;
  }

  const value = {
    admin,
    addProduct,
    addToCart,
    cart,
    cartCount,
    cartItems,
    cartTotal,
    darkMode,
    deleteProduct,
    isReady,
    loginAdmin,
    loginUser,
    logoutAdmin,
    logoutUser,
    orders,
    placeOrder,
    products,
    removeFromCart,
    showToast,
    toggleDarkMode,
    toggleWishlist,
    toast,
    updateCartQuantity,
    updateProduct,
    user,
    wishlist,
    wishlistItems,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used inside StoreProvider');
  }

  return context;
}
