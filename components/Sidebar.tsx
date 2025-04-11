"use client";

import {useState} from "react";
import Link from "next/link";

export default function Sidebar({
  total,
  onCheckout,
}: {
  total: number;
  onCheckout: () => void;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email}),
    });

    if (res.ok) {
      setMessage("Thanks for signing up!");
      setEmail("");
    } else {
      const data = await res.json();
      setMessage(data.error || "Something went wrong.");
    }
  };

  return (
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
        <button onClick={onCheckout}>CHECK OUT</button>
      </div>

      <div>
        <h3 style={{marginBottom: "0.5rem"}}>CATEGORIES</h3>
        <nav style={{display: "flex", flexDirection: "column", gap: "0.25rem"}}>
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
        <form
          onSubmit={handleSubmit}
          style={{display: "flex", marginTop: "0.5rem"}}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            style={{
              flex: 1,
              padding: "0.25rem",
              border: "1px solid black",
            }}
          />
          <button style={{marginLeft: "0.5rem"}}>→</button>
        </form>
        {message && (
          <p style={{fontSize: "0.8rem", color: "green", marginTop: "0.5rem"}}>
            {message}
          </p>
        )}
      </div>
    </aside>
  );
}
