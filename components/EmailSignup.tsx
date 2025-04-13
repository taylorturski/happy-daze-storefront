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
      setMessage("Thanks for signing up!");
      setEmail("");
    } else {
      const data = await res.json();
      setMessage(data.error || "Something went wrong.");
    }
  };

  return (
    <div className="mt-6">
      <p className="text-xs mb-1 uppercase">Refuse the ordinary</p>
      <h3 className="text-lg font-bold uppercase">UNDERGROUND GC</h3>
      <p className="text-sm text-blue-600">Get a discount code :)</p>
      <form onSubmit={handleSubmit} className="flex mt-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="flex-1 border border-black px-2 py-1 text-sm bg-black text-white"
        />
        <button
          type="submit"
          className="ml-2 px-2 border border-black text-white bg-black">
          →
        </button>
      </form>
      {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
    </div>
  );
}
