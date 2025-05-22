"use client";

import {useState} from "react";

export default function EmailSignup() {
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
      localStorage.setItem("happyDazeDiscount", "HAPPY10");
      setMessage("Discount will be automatically applied at checkout!");
      setEmail("");
    } else {
      const data = await res.json();
      setMessage(data.error || "Something went wrong.");
    }
  };

  return (
    <div className="mt-0 md:pl-3 w-full">
      <p className="text-sm font-bold animate-blink-green">
        Get a discount code :)
      </p>
      <form onSubmit={handleSubmit} className="mt-2 w-full max-w-[180px]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="w-full border-2 border-white px-2 py-1 text-sm bg-black text-white mb-3"
        />
        <button
          type="submit"
          className="w-full bg-[#ACFF9B] uppercase text-black px-3 py-1 tracking-wider uppercase font-vt text-md">
          Subscribe
        </button>
      </form>
      {message && (
        <p
          className={`text-sm mt-2 ${
            message.toLowerCase().includes("error") ||
            message.toLowerCase().includes("failed") ||
            message.toLowerCase().includes("already")
              ? "text-red-600"
              : "text-green-600"
          }`}>
          {message}
        </p>
      )}
    </div>
  );
}
