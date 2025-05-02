"use client";

import {useState, useEffect} from "react";
import Image from "next/image";

type CartItem = {
  id: string;
  title: string;
  price: string;
  image: string;
};

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCart(data.cart);
      setTotal(data.total);
      setLoading(false);
    }

    fetchCart();
  }, []);

  const handleRemoveItem = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  if (loading) return <p className="p-8 font-pitch">Loading cart...</p>;

  return (
    <div className="p-8 font-pitch">
      <h3 className="text-xl font-bold mb-4">My Cart</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-300 mb-4 pb-4">
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={600}
                className="w-12 h-12 object-cover mr-4 border"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-sm">{item.price}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="ml-4 font-vt uppercase text-md text-red-600 underline">
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 font-bold">Total: ${total.toFixed(2)}</div>
        </div>
      )}

      <button
        onClick={handleCheckout}
        className="mt-6 border-2 font-vt lowercase border-black px-4 py-2 font-bold bg-black text-white">
        Proceed to Checkout
      </button>
    </div>
  );
}
