"use client";

import {useCart} from "@/app/context/CartContext";
import {useState} from "react";

type AddToCartButtonProps = {
  id: string;
  title: string;
  price: number;
  image: string;
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
}: AddToCartButtonProps) {
  const {addToCart} = useCart();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = async (e: React.MouseEvent) => {
    setLoading(true);
    triggerCartFeedback(e);

    try {
      await addToCart({
        lineId: `${id}-${Date.now()}`,
        id,
        title,
        price,
        image,
        quantity: 1,
      });

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className={`mt-4 font-vt lowercase border-2 px-3 py-1 font-bold transition-all duration-300
        ${
          added
            ? "bg-[#ACFF9B] text-black border-[#ACFF9B]"
            : "bg-white text-black border-black hover:bg-black hover:text-white"
        }`}>
      {loading ? "Adding..." : added ? "✓ Added" : "Add to Cart"}
    </button>
  );
}
