"use client";

import {createContext, useContext, useState, ReactNode, useEffect} from "react";

export type CartItem = {
  lineId: string;
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
  cartId: string | null;
  checkoutUrl: string | null;
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
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedCartId = localStorage.getItem("cartId");
    const storedCheckoutUrl = localStorage.getItem("checkoutUrl");

    if (storedCartId) setCartId(storedCartId);
    if (storedCheckoutUrl) setCheckoutUrl(storedCheckoutUrl);

    fetchCart();
  }, []);

  const fetchCart = async () => {
    const localCartId = localStorage.getItem("cartId");
    if (!localCartId) {
      setCart([]);
      setTotal(0);
      return;
    }

    const res = await fetch("/api/cart?cartId=" + localCartId);
    if (res.ok) {
      const data = await res.json();
      setCart(data.cart);
      setTotal(data.total);
    }
  };

  const addToCart = async (item: CartItem) => {
    const existingCartId = localStorage.getItem("cartId");

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(existingCartId ? {"x-cart-id": existingCartId} : {}),
      },
      body: JSON.stringify([
        {
          id: item.id,
          quantity: item.quantity,
          properties: item.properties || {},
        },
      ]),
    });

    const data = await res.json();

    if (!res.ok || !data.cartId) {
      throw new Error(data?.error || "Failed to add to cart");
    }

    // Update latest cartId + checkoutUrl
    setCartId(data.cartId);
    setCheckoutUrl(data.url);
    localStorage.setItem("cartId", data.cartId);
    localStorage.setItem("checkoutUrl", data.url);

    // 🧼 Fetch the real Shopify cart
    await fetchCart();
  };

  const removeFromCart = async (lineId: string) => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({cartId, lineId}),
    });

    if (res.ok) {
      const data = await res.json();
      setCart(data.cart);
      setTotal(data.total);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartId,
        checkoutUrl,
        addToCart,
        removeFromCart,
        fetchCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}
