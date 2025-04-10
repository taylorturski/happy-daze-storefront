"use client";

import {ReactNode, useState, useEffect} from "react";
import Link from "next/link";

// CartItem type for displaying cart details
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

  return (
    <html lang="en">
      <body style={{margin: 0, fontFamily: "monospace"}}>
        <div style={{display: "flex", minHeight: "100vh"}}>
          {/* Sidebar */}
          <aside
            style={{
              width: "240px",
              borderRight: "2px solid black",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}>
            <div>
              <h3 style={{marginBottom: "0.5rem"}}>MY CART</h3>
              <p>
                Total: <strong>${total.toFixed(2)}</strong>
              </p>
              <button onClick={handleCheckout}>CHECK OUT</button>
            </div>

            <div>
              <h3 style={{marginBottom: "0.5rem"}}>CATEGORIES</h3>
              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}>
                <Link href="/custom-shop">Custom Shop</Link>
                <Link href="/workshop">Workshop</Link>
                <Link href="/journal">Journal</Link>
                <Link href="/contact">Contact</Link>
              </nav>
            </div>

            <div>
              <h3>UNDERGROUND GC</h3>
              <p style={{fontSize: "0.8rem", color: "blue"}}>
                Get a discount code :)
              </p>
              <form style={{display: "flex", marginTop: "0.5rem"}}>
                <input
                  type="email"
                  placeholder="Your email"
                  style={{
                    flex: 1,
                    padding: "0.25rem",
                    border: "1px solid black",
                  }}
                />
                <button style={{marginLeft: "0.5rem"}}>→</button>
              </form>
            </div>
          </aside>

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
