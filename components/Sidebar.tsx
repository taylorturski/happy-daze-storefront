"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useCart} from "@/app/context/CartContext";

export default function Sidebar() {
  const {cart, total, removeFromCart} = useCart();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleCheckout = () => {
    window.location.href = "/api/cart/checkout";
  };

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

        {!cart || cart.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          cart.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}>
              <Image
                src={item.image}
                alt={item.title}
                width={40}
                height={40}
                style={{
                  objectFit: "cover",
                  marginRight: "0.5rem",
                }}
              />
              <div style={{flex: 1}}>
                <p style={{margin: 0, fontSize: "0.85rem"}}>{item.title}</p>
                <p style={{margin: 0, fontSize: "0.85rem"}}>
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "1.25rem",
                  lineHeight: "1",
                  padding: 0,
                }}>
                ×
              </button>
            </div>
          ))
        )}

        <p>
          Total: <strong>${total?.toFixed(2) ?? "0.00"}</strong>
        </p>
        <button onClick={handleCheckout}>CHECK OUT</button>
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
