import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('jjk_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('jjk_cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => p.id === item.id ? { ...p, quantity: p.quantity + (item.quantity || 1) } : p);
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const updateQty = (id, quantity) => {
    setCart((prev) => prev.map((p) => p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p));
  };

  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const clearCart = () => setCart([]);

  const total = cart.reduce((s, it) => s + it.price * (it.quantity || 1), 0);

  const value = { cart, addItem, updateQty, removeItem, clearCart, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
