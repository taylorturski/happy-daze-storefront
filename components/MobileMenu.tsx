"use client";

import {useState} from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger buttons */}
      <div className="flex items-center gap-3 sm:hidden">
        <button
          onClick={() => setOpen(true)}
          className="text-xs font-bold uppercase border-2 border-black px-3 py-1">
          Menu
        </button>
        <button
          onClick={() => setOpen(true)}
          className="text-xs font-bold uppercase border-2 border-black px-3 py-1">
          Cart
        </button>
      </div>

      {/* Fullscreen Overlay */}
      {open && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col justify-between p-6 font-mono border-t-4 border-black">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-black">Menu</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-xl font-bold border-2 border-black px-3 py-1">
              X
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-lg font-bold uppercase mt-10">
            <Link href="/custom-shop" onClick={() => setOpen(false)}>
              Custom Shop
            </Link>
            <Link href="/workshop" onClick={() => setOpen(false)}>
              Workshop
            </Link>
            <Link href="/journal" onClick={() => setOpen(false)}>
              Journal
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </nav>

          <div className="text-sm uppercase font-bold mt-10">
            REFUSE THE ORDINARY.
          </div>
        </div>
      )}
    </>
  );
}
