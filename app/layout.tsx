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
      <body style={{margin: 0, fontFamily: "monospace"}}>
        <GoogleAnalytics />
        <CartProvider>
          <LayoutContent>{children}</LayoutContent>
        </CartProvider>
      </body>
    </html>
  );
}

// LayoutContent preserves your styling exactly
function LayoutContent({children}: {children: ReactNode}) {
  return (
    <div style={{display: "flex", minHeight: "100vh"}}>
      <Sidebar />
      <main style={{flex: 1}}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            borderBottom: "2px solid black",
          }}>
          <Link href="/" style={{fontWeight: "bold", fontSize: "1.5rem"}}>
            Happy Daze Golf
          </Link>
          <nav style={{display: "flex", gap: "1rem"}}>
            <Link href="/custom-shop" style={navLinkStyle}>
              CUSTOM SHOP
            </Link>
            <Link href="/journal" style={navLinkStyle}>
              JOURNAL
            </Link>
            <Link href="/about" style={navLinkStyle}>
              ABOUT
            </Link>
          </nav>
        </header>

        {children}
      </main>
    </div>
  );
}

const navLinkStyle = {
  border: "2px solid black",
  padding: "0.5rem 1rem",
  textDecoration: "none",
  fontWeight: "bold",
};
