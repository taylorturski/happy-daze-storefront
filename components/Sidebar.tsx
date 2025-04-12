"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {CartItem} from "@/types/product";

export default function Sidebar({
  cart,
  total,
  onCheckout,
  onRemoveItem,
}: {
  cart: CartItem[];
  total: number;
  onCheckout: () => void;
  onRemoveItem: (id: string) => void;
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

        {cart.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}>
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  marginRight: "0.5rem",
                }}
              />
              <div style={{flex: 1}}>
                <p style={{margin: 0, fontSize: "0.85rem"}}>{item.title}</p>
                <p style={{margin: 0, fontSize: "0.85rem"}}>{item.price}</p>
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}>
                🗑️
              </button>
            </div>
          ))
        )}

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
