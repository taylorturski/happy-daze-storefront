"use client";

import "@/styles/globals.css";
import {ReactNode} from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import GoogleAnalytics from "@/app/analytics/GoogleAnalytics";
import {CartProvider} from "@/app/context/CartContext";

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className="m-0 font-mono">
        <GoogleAnalytics />
        <CartProvider>
          <LayoutContent>{children}</LayoutContent>
        </CartProvider>
      </body>
    </html>
  );
}

function LayoutContent({children}: {children: ReactNode}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <header className="flex justify-between items-center px-4 py-3 border-b-2 border-black">
          <Link href="/" className="font-bold text-xl">
            Happy Daze Golf
          </Link>
          <nav className="flex gap-3">
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
        {children}
      </main>
    </div>
  );
}

const navLinkClasses = "border-2 border-black px-4 py-2 font-bold no-underline";
