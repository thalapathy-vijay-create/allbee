import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Food } from '@/lib/supabase';

export type CartItem = {
  food: Food;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (food: Food, quantity?: number) => void;
  removeItem: (foodId: string) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  wishlist: string[];
  toggleWishlist: (foodId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const addItem = (food: Food, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.food.id === food.id);
      if (existing) {
        return prev.map((i) => (i.food.id === food.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { food, quantity }];
    });
  };

  const removeItem = (foodId: string) => {
    setItems((prev) => prev.filter((i) => i.food.id !== foodId));
  };

  const updateQuantity = (foodId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(foodId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.food.id === foodId ? { ...i, quantity } : i)));
  };

  const clearCart = () => setItems([]);

  const toggleWishlist = (foodId: string) => {
    setWishlist((prev) => (prev.includes(foodId) ? prev.filter((id) => id !== foodId) : [...prev, foodId]));
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.food.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, wishlist, toggleWishlist }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
