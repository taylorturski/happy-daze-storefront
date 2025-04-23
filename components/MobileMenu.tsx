"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useCart} from "@/app/context/CartContext";
import EmailSignup from "./EmailSignup";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const {cart, total, removeFromCart} = useCart();

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const properties = cart[0]?.properties;

    if (!properties || !properties.headshape) {
      alert("Missing selection data for checkout.");
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(properties),
      });

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to start checkout.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Error processing checkout.");
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 sm:hidden">
        <button
          onClick={() => setOpen(true)}
          className="text-lg font-bold font-pitch uppercase border-2 border-black px-2 py-1">
          MENU
        </button>
        <button
          onClick={() => setOpen(true)}
          className="text-lg font-bold font-pitch uppercase border-2 border-black px-2 py-1">
          CART
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-white text-black z-50 flex flex-col p-6 border-t-4 border-black font-pitch overflow-y-auto">
          {/* Header row with logo and close button */}
          <div className="flex justify-between items-center mb-6">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="w-[170px] h-[80px] relative">
              <Image
                src="/happy_daze_logo.svg"
                alt="Happy Daze Golf"
                fill
                className="object-contain"
                priority
              />
            </Link>

            <button
              onClick={() => setOpen(false)}
              className="text-xl font-bold border-2 border-black px-3 py-1">
              X
            </button>
          </div>

          {/* Navigation links */}
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-4 text-lg font-bold uppercase mb-6">
            <Link href="/custom-putters" onClick={() => setOpen(false)}>
              Custom Putters
            </Link>
            <Link href="/merch" onClick={() => setOpen(false)}>
              Merch
            </Link>
            <Link href="/gallery" onClick={() => setOpen(false)}>
              Gallery
            </Link>
            <Link href="/journal" onClick={() => setOpen(false)}>
              Journal
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </nav>

          {/* Cart */}
          <div className="mb-6">
            <h3 className="mb-1 text-lg font-bold">MY CART</h3>
            {!cart || cart.length === 0 ? (
              <p>No items yet.</p>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center mb-4">
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
              className="mt-2 font-vt border-2 border-black px-3 py-1 font-bold">
              CHECK OUT
            </button>
          </div>

          {/* Email Signup */}
          <EmailSignup />
        </div>
      )}
    </>
  );
}
