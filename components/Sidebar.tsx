"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useCart} from "@/app/context/CartContext";

export default function Sidebar() {
  const {cart, total, removeFromCart} = useCart();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleCheckout = () => {
    window.location.href = "/api/cart/checkout";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email}),
    });

    if (res.ok) {
      setMessage("Thanks for signing up!");
      setEmail("");
    } else {
      const data = await res.json();
      setMessage(data.error || "Something went wrong.");
    }
  };

  return (
    <aside className="w-[240px] border-r-2 border-black p-4 flex flex-col gap-6 font-mono">
      {/* Cart */}
      <div>
        <h3 className="mb-2 text-lg font-bold">MY CART</h3>
        {!cart || cart.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex items-center mb-4">
              <Image
                src={item.image}
                alt={item.title}
                width={40}
                height={40}
                className="object-cover mr-2"
              />
              <div className="flex-1">
                <p className="m-0 text-sm">{item.title}</p>
                <p className="m-0 text-sm">${Number(item.price).toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-xl font-bold leading-none">
                ×
              </button>
            </div>
          ))
        )}
        <p>
          Total: <strong>${total?.toFixed(2) ?? "0.00"}</strong>
        </p>
        <button
          onClick={handleCheckout}
          className="mt-2 border-2 border-black px-3 py-1 font-bold">
          CHECK OUT
        </button>
      </div>

      {/* Nav */}
      <div>
        <h3 className="mb-2 text-lg font-bold">CATEGORIES</h3>
        <nav className="flex flex-col gap-1">
          <Link href="/custom-shop" className="hover:underline">
            Custom Shop
          </Link>
          <Link href="/workshop" className="hover:underline">
            Workshop
          </Link>
          <Link href="/journal" className="hover:underline">
            Journal
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>

      {/* Email form */}
      <div>
        <h3 className="text-lg font-bold">UNDERGROUND GC</h3>
        <p className="text-sm text-blue-600">Get a discount code :)</p>
        <form onSubmit={handleSubmit} className="flex mt-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="flex-1 border border-black px-2 py-1 text-sm"
          />
          <button type="submit" className="ml-2 text-lg">
            →
          </button>
        </form>
        {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
      </div>
    </aside>
  );
}
