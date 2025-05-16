"use client";

import {useCart} from "@/app/context/CartContext";
import {useState} from "react";

type AddToCartButtonProps = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity?: number;
  properties?: Record<string, string>;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  added?: boolean;
  className?: string;
  variant?: "default" | "builder";
};

function triggerCartFeedback(e: React.MouseEvent) {
  const rect = (e.target as HTMLElement).getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top;
  window.dispatchEvent(
    new CustomEvent("add-to-cart-feedback", {detail: {x, y}})
  );
}

export default function AddToCartButton({
  id,
  title,
  price,
  image,
  quantity = 1,
  properties = {},
  onClick,
  disabled,
  loading: externalLoading,
  added: externalAdded,
  className = "",
  variant = "default",
}: AddToCartButtonProps) {
  const {cart, setCart, addToCart} = useCart();
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalAdded, setInternalAdded] = useState(false);

  const loading = externalLoading ?? internalLoading;
  const added = externalAdded ?? internalAdded;

  const handleClick = async (e: React.MouseEvent) => {
    if (onClick) {
      return onClick(e);
    }

    const lineId = `${id}-${Date.now()}`;

    const optimisticItem = {
      lineId,
      id,
      title,
      price,
      image,
      quantity,
      properties,
    };

    setCart([...cart, optimisticItem]);
    triggerCartFeedback(e);
    setInternalAdded(true);
    setInternalLoading(true);

    try {
      await addToCart(optimisticItem);
    } catch (err) {
      console.error(err);
      setCart((prev) => prev.filter((item) => item.lineId !== lineId));
    } finally {
      setTimeout(() => setInternalAdded(false), 2000);
      setInternalLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        font-vt uppercase tracking-wider text-md border-2 px-4 py-2 font-bold transition-all duration-300
        ${
          added
            ? "bg-[#ACFF9B] text-black border-[#ACFF9B]"
            : "bg-white text-black border-black hover:bg-black hover:text-white"
        }
        ${variant === "builder" ? "mt-0 ml-auto" : "mt-4"}
        ${className}
      `}>
      {loading ? "Adding..." : added ? "✓ Added" : "Add to Cart"}
    </button>
  );
}
