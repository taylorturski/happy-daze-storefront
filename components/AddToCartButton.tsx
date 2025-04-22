"use client";

import {useCart} from "@/app/context/CartContext";
import {useState} from "react";

type AddToCartButtonProps = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export default function AddToCartButton({
  id,
  title,
  price,
  image,
}: AddToCartButtonProps) {
  const {addToCart} = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    try {
      await addToCart({id, title, price, image, quantity: 1});
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="mt-4 font-vt lowercase border-2 border-black px-3 py-1 font-bold bg-white text-black hover:bg-black hover:text-white transition-all duration-150">
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
