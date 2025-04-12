"use client";

import {ReactNode, useState, useEffect} from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import GoogleAnalytics from "@/app/analytics/GoogleAnalytics";

type CartItem = {
  id: string;
  title: string;
  price: string;
  image: string;
};

export default function RootLayout({children}: {children: ReactNode}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCart(data.cart);
      setTotal(data.total);
    }, 1000); // Poll cart every second (quick fix)

    return () => clearInterval(interval); // cleanup
  }, []);

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
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

  const handleRemoveItem = async (id: string) => {
    try {
      await fetch(`/api/cart?id=${id}`, {method: "DELETE"});
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCart(data.cart);
      setTotal(data.total);
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  return (
    <html lang="en">
      <body style={{margin: 0, fontFamily: "monospace"}}>
        <GoogleAnalytics />
        <div style={{display: "flex", minHeight: "100vh"}}>
          <Sidebar
            cart={cart}
            total={total}
            onCheckout={handleCheckout}
            onRemoveItem={handleRemoveItem}
          />
          {/* Main content */}
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

            <section style={{padding: "2rem"}}>{children}</section>
          </main>
        </div>
      </body>
    </html>
  );
}

const navLinkStyle = {
  border: "2px solid black",
  padding: "0.5rem 1rem",
  textDecoration: "none",
  fontWeight: "bold",
};
