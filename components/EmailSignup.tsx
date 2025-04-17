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
    <div className="mt-5 md:pl-3 w-full">
      <p className="text-xs mb-1 uppercase">Refuse the ordinary</p>
      <h3 className="text-lg font-bold uppercase">UNDERGROUND GC</h3>
      <p className="text-sm text-blue-600">Get a discount code :)</p>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mt-2 w-full max-w-[180px]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="w-[170px] border-2 border-white px-2 py-1 text-sm bg-black text-white"
        />
        <button
          type="submit"
          className="px-2 border-2 border-white text-black bg-white text-sm font-vt lowercase">
          →
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
