"use client";

import {useEffect, useState} from "react";
import Image from "next/image";

export default function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("popupShown");
    if (!alreadyShown) {
      setTimeout(() => setVisible(true), 3000);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email}),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Error subscribing");

      setSubmitted(true);
      sessionStorage.setItem("popupShown", "true");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem("popupShown", "true");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white text-black w-full max-w-2xl flex rounded shadow-xl relative font-pitch overflow-hidden">
        {/* Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-black">
          <Image
            src="/email-modal-img.JPG"
            alt="Happy Daze Golf"
            width={300}
            height={300}
            className="object-cover [object-position:center_20%] h-64 w-full"
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black">
            &times;
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h2 className="text-xl font-pitch font-semibold uppercase">
                Get 10% Off
              </h2>
              <p className="text-sm font-pitch font-medium">
                Sign up to get 10% off your first custom order.
              </p>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border text-white border-black px-3 py-2 font-pitch font-medium"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 font-bold border-2 border-black font-pitch font-semibold">
                Claim Discount
              </button>
              {error && (
                <p className="text-red-600 text-sm font-pitch font-medium">
                  {error}
                </p>
              )}
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-pitch font-semibold uppercase mb-2">
                You're in!
              </h2>
              <p className="text-sm mb-2 font-pitch font-medium">
                Use code <span className="font-mono font-bold">HAPPY10</span> at
                checkout.
              </p>
              <p className="text-xs text-gray-600 font-pitch font-medium">
                Thanks for joining the Happy Daze underground.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
