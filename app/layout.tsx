"use client";

import "@/styles/globals.css";
import {ReactNode} from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import GoogleAnalytics from "@/app/analytics/GoogleAnalytics";
import {CartProvider} from "@/app/context/CartContext";
import EmailPopup from "@/components/EmailPopup";

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className="m-0 font-pitch text-[16px]">
        <GoogleAnalytics />
        <CartProvider>
          <LayoutContent>{children}</LayoutContent>
          <EmailPopup />
        </CartProvider>
      </body>
    </html>
  );
}

function LayoutContent({children}: {children: ReactNode}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on desktop */}
      <aside className="hidden sm:block sticky top-0 z-50 h-screen bg-black">
        <Sidebar />
      </aside>

      {/* Main */}
      <main className="flex-1 relative z-0 bg-transparent">
        {/* Desktop Header */}
        <header className="hidden sm:flex justify-end items-right border-b-2 border-white px-5 py-4">
          <nav className="flex gap-2">
            <Link href="/custom-shop" className={navLinkClasses}>
              CUSTOM SHOP
            </Link>
            <Link href="/journal" className={navLinkClasses}>
              JOURNAL
            </Link>
            <Link href="/about" className={navLinkClasses}>
              ABOUT
            </Link>
          </nav>
        </header>

        {/* Mobile Header */}
        <div className="flex sm:hidden justify-between items-center border-b-2 border-black px-4 py-3">
          <Link href="/" className="block w-[160px] h-[60px] relative">
            <Image
              src="/happy_daze_logo.svg"
              alt="Happy Daze Golf"
              fill
              className="pt-2 object-contain invert"
              priority
            />
          </Link>
          <MobileMenu />
        </div>

        {children}
      </main>
    </div>
  );
}

const navLinkClasses =
  "border-2 border-black px-3 py-1 font-bold no-underline text-xs uppercase";
