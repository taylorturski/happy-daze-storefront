"use client";

import Link from "next/link";
import Image from "next/image";
import {useCart} from "@/app/context/CartContext";
import EmailSignup from "./EmailSignup";

export default function Sidebar() {
  const {cart, total, removeFromCart} = useCart();

  const handleCheckout = () => {
    window.location.href = "/api/cart/checkout";
  };

  return (
    <aside className="w-[240px] border-r-2 border-black p-4 flex flex-col gap-6 font-mono">
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
      <div className="md:pl-3">
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
          className="mt-2 border-2 border-white px-3 py-1 font-bold">
          CHECK OUT
        </button>
      </div>

      {/* Nav */}
      <div className="md:pl-3">
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
      <EmailSignup />
    </aside>
  );
}
