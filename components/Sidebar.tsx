"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useCart} from "@/app/context/CartContext";
import EmailSignup from "./EmailSignup";

export type CartItem = {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
  properties?: {
    [key: string]: string;
  };
};

export default function Sidebar() {
  const {cart, total, removeFromCart} = useCart();
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart[0]?.properties || {}),
      });

      const data = await res.json();
      console.log("[SIDEBAR CHECKOUT] Response:", data);

      if (data?.url) {
        window.location.href = data.url;
      } else {
        setMessage("Failed to start checkout.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setMessage("Error processing checkout.");
    }
  };

  return (
    <aside className="w-[240px] border-r-2 border-black p-1 flex flex-col gap-6 font-pitch sticky top-0 h-screen overflow-y-auto">
      {/* Logo */}
      <Link href="/" className="block w-[200px] h-[80px] relative mb-2">
        <Image
          src="/happy_daze_logo.svg"
          alt="Happy Daze Golf"
          fill
          className="object-contain invert"
          priority
        />
      </Link>

      {/* Cart */}
      <div className="md:pl-4">
        <h3 className="mb-2 text-lg font-bold">MY CART</h3>
        {!cart || cart.length === 0 ? (
          <p className="text-xs mb-2">No items yet.</p>
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
                <p className="m-0 text-sm">
                  ${Number(item.price).toFixed(2)} × {item.quantity}
                </p>

                {/* Custom Build Attributes */}
                {item.properties &&
                  Object.entries(item.properties).map(([key, value]) => (
                    <p key={key} className="text-[11px] text-gray-500">
                      {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                    </p>
                  ))}
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
          className="w-full max-w-[180px] bg-[#ACFF9B] uppercase text-black px-3 py-1 mt-2 font-bold font-vt text-sm">
          CHECK OUT
        </button>
        {message && <p className="text-xs text-red-600 mt-1">{message}</p>}
      </div>

      {/* Nav */}
      <div className="md:pl-3">
        <h3 className="mb-2 text-lg font-bold">CATEGORIES</h3>
        <nav aria-label="Sidebar navigation" className="flex flex-col gap-1">
          <Link href="/custom-putters" className="hover:underline">
            Custom Putters
          </Link>
          <Link href="/gallery" className="hover:underline">
            Gallery
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
      <EmailSignup />
    </aside>
  );
}
