"use client";

import {createContext, useContext, useState, ReactNode, useEffect} from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  properties?: {
    [key: string]: string;
  };
};

type CartContextType = {
  cart: CartItem[];
  total: number;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  fetchCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

export function CartProvider({children}: {children: ReactNode}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedTotal = localStorage.getItem("total");

    if (storedCart && storedTotal) {
      setCart(JSON.parse(storedCart));
      setTotal(parseFloat(storedTotal));
    }

    fetchCart();
  }, []);

  // Save to localStorage on updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", total.toString());
  }, [cart, total]);

  const fetchCart = async () => {
    const res = await fetch("/api/cart");
    if (res.ok) {
      const data = await res.json();
      setCart(data.cart);
      setTotal(data.total);
    }
  };

  const addToCart = async (item: CartItem) => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {"Content-Type": "application/json"},
    });

    if (res.ok) {
      const data = await res.json();
      setCart(data.cart);
      setTotal(data.total);
    } else {
      throw new Error("Failed to add to cart");
    }
  };

  const removeFromCart = async (id: string) => {
    const res = await fetch(`/api/cart?id=${id}`, {method: "DELETE"});

    if (res.ok) {
      const data = await res.json();
      setCart(data.cart);
      setTotal(data.total);
    } else {
      throw new Error("Failed to remove from cart");
    }
  };

  return (
    <CartContext.Provider
      value={{cart, total, addToCart, removeFromCart, fetchCart}}>
      {children}
    </CartContext.Provider>
  );
}
