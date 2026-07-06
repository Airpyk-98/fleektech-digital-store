'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Product } from '@/lib/db';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selected?: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  shippingAddress?: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  items: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  totalPrice: number;

  // Selection for Checkout
  toggleSelectItem: (productId: string) => void;
  toggleSelectAll: (select: boolean) => void;
  selectedItems: CartItem[];
  selectedTotalItems: number;
  selectedTotalPrice: number;

  // Saved Items (Wishlist)
  savedItems: Product[];
  toggleSaveItem: (product: Product) => void;
  isItemSaved: (productId: string) => boolean;
  isSavedOpen: boolean;
  setIsSavedOpen: (open: boolean) => void;

  // Orders History
  orders: Order[];
  addOrder: (orderData: { items: CartItem[]; total: number; shippingAddress?: any }) => Order;
  isOrdersOpen: boolean;
  setIsOrdersOpen: (open: boolean) => void;

  // Toast Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const cartKey = user ? `fleektech_cart_${user.id}` : `fleektech_cart_guest`;
  const savedKey = user ? `fleektech_saved_${user.id}` : `fleektech_saved_guest`;
  const ordersKey = user ? `fleektech_orders_${user.id}` : `fleektech_orders_guest`;

  // Load user-specific state when auth user changes
  useEffect(() => {
    setIsLoaded(false);
    try {
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }

      const savedWish = localStorage.getItem(savedKey);
      if (savedWish) {
        setSavedItems(JSON.parse(savedWish));
      } else {
        setSavedItems([]);
      }

      const savedOrd = localStorage.getItem(ordersKey);
      if (savedOrd) {
        setOrders(JSON.parse(savedOrd));
      } else {
        setOrders([]);
      }
    } catch (e) {
      console.error('Failed to load user commerce state from localStorage', e);
    }
    setIsLoaded(true);
  }, [user, cartKey, savedKey, ordersKey]);

  // Save changes to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(cartKey, JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart', e);
      }
    }
  }, [cart, isLoaded, cartKey]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(savedKey, JSON.stringify(savedItems));
      } catch (e) {
        console.error('Failed to save wishlist', e);
      }
    }
  }, [savedItems, isLoaded, savedKey]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(ordersKey, JSON.stringify(orders));
      } catch (e) {
        console.error('Failed to save orders', e);
      }
    }
  }, [orders, isLoaded, ordersKey]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const addToCart = (product: any, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          selected: true, // Selected by default
        },
      ];
    });
    // Silent registration! Do NOT open popup!
    showToast(`✅ Added "${product.name}" to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleSelectItem = (productId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, selected: item.selected === false ? true : false } : item
      )
    );
  };

  const toggleSelectAll = (select: boolean) => {
    setCart((prev) => prev.map((item) => ({ ...item, selected: select })));
  };

  const selectedItems = cart.filter((item) => item.selected !== false);
  const selectedTotalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const selectedTotalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleSaveItem = (product: Product) => {
    setSavedItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`🗑️ Removed "${product.name}" from saved items.`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`❤️ Saved "${product.name}" to wishlist!`);
        return [...prev, product];
      }
    });
  };

  const isItemSaved = (productId: string) => {
    return savedItems.some((item) => item.id === productId);
  };

  const addOrder = (orderData: { items: CartItem[]; total: number; shippingAddress?: any }) => {
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      items: orderData.items,
      total: orderData.total,
      status: 'Processing',
      createdAt: new Date().toISOString(),
      shippingAddress: orderData.shippingAddress,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Remove checked out items from cart
    const checkedOutIds = new Set(orderData.items.map((i) => i.id));
    setCart((prev) => prev.filter((i) => !checkedOutIds.has(i.id)));

    showToast(`🎉 Order #${newOrder.id} placed successfully!`);
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        items: cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        totalPrice,
        toggleSelectItem,
        toggleSelectAll,
        selectedItems,
        selectedTotalItems,
        selectedTotalPrice,
        savedItems,
        toggleSaveItem,
        isItemSaved,
        isSavedOpen,
        setIsSavedOpen,
        orders,
        addOrder,
        isOrdersOpen,
        setIsOrdersOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-sm bg-[#00003c] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-[#ffb95c]/30 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <span className="material-symbols-outlined text-[#ffb95c] text-xl">notifications</span>
          <span className="text-xs md:text-sm font-semibold tracking-wide flex-1">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-[#c6c5d5] hover:text-white">
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
