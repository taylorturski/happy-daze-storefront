"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useCart} from "@/app/context/CartContext";
import EmailSignup from "./EmailSignup";
import {usePathname} from "next/navigation";

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
    const checkoutUrl = localStorage.getItem("checkoutUrl");

    if (!checkoutUrl) {
      setMessage("Something went wrong. Please try adding an item again.");
      return;
    }

    window.location.href = `${checkoutUrl}?discount=HAPPY10`;
  };

  return (
    <aside className="w-[240px] border-r-2 border-black p-1 flex flex-col gap-2 font-pitch sticky top-0 h-screen overflow-y-auto">
      <Link href="/" className="block w-[200px] h-[80px] relative mb-2">
        <Image
          src="/happy_daze_logo.svg"
          alt="Happy Daze Golf"
          fill
          className="object-contain invert"
        />
      </Link>

      <div className="md:pl-3">
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

                {item.properties?.headshape && (
                  <p className="text-sm text-gray-400">
                    Custom:{" "}
                    {item.properties.material
                      ? `${item.properties.headshape}`
                      : item.properties.headshape}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeFromCart(item.lineId)}
                className="text-xl font-bold leading-none pr-2">
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
          disabled={!cart || cart.length === 0}
          className="w-full max-w-[180px] bg-[#ACFF9B] uppercase text-black px-3 py-1 mt-2 font-bold font-vt text-sm border-black border-2 disabled:opacity-100 disabled:cursor-not-allowed">
          CHECK OUT
        </button>
        {message && <p className="text-xs text-red-600 mt-1">{message}</p>}
      </div>

      <div className="md:pl-3">
        <h3 className="mb-2 text-lg font-bold">CATEGORIES</h3>
        <nav aria-label="Sidebar navigation" className="flex flex-col gap-1">
          <Link
            href="/custom-putters"
            className={`hover:underline ${
              usePathname() === "/custom-putters"
                ? "text-[#ACFF9B] font-bold underline"
                : ""
            }`}>
            Custom Putters
          </Link>
          <Link
            href="/merch"
            className={`hover:underline ${
              usePathname() === "/merch"
                ? "text-[#ACFF9B] font-bold underline"
                : ""
            }`}>
            Merch
          </Link>
          <Link
            href="/gallery"
            className={`hover:underline ${
              usePathname() === "/gallery"
                ? "text-[#ACFF9B] font-bold underline"
                : ""
            }`}>
            Gallery
          </Link>
          <Link
            href="/journal"
            className={`hover:underline ${
              usePathname() === "/journal"
                ? "text-[#ACFF9B] font-bold underline"
                : ""
            }`}>
            Journal
          </Link>
          <Link
            href="/contact"
            className={`hover:underline ${
              usePathname() === "/contact"
                ? "text-[#ACFF9B] font-bold underline"
                : ""
            }`}>
            Contact
          </Link>
        </nav>
      </div>

      <EmailSignup />
    </aside>
  );
}
