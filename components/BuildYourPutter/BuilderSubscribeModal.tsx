"use client";

import {useContext, useState} from "react";
import {BuildContext} from "./BuildContext";

export default function BuilderSubscribeModal({
  onClose,
  onSkipConfirm,
  onSubscribeConfirm,
}: {
  onClose: () => void;
  onSkipConfirm: () => void;
  onSubscribeConfirm: () => void; // 👈 ADD THIS
}) {
  const {selections, setSubscribed} = useContext(BuildContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    setError("");
    if (!email.includes("@") || !firstName || !lastName) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, firstName, lastName, selections}),
      });

      if (!res.ok) throw new Error("Subscription failed");

      window.gtag?.("event", "builder_email_collected", {
        email,
        firstName,
        lastName,
        headshape: selections.headshape || "none",
        step: "post-cart",
      });

      setSubscribed(true);
      localStorage.setItem("emailSubscribed", "true");
      localStorage.setItem("happyDazeDiscount", "HAPPY10");
      onClose();
      onSubscribeConfirm();
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white text-black p-6 w-full max-w-md border-2 border-black font-pitch mx-4 sm:mx-0 rounded-2xl">
        <h2 className="text-xl font-bold mb-3">Before you check out…</h2>
        <p className="mb-4 text-sm">
          Get 10% off just by subscribing. We’ll send early drops and exclusive
          access too.
        </p>

        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          className="w-full mb-2 border-2 px-3 py-2"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          className="w-full mb-2 border-2 px-3 py-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-2 border-2 px-3 py-2"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="bg-black text-white px-4 py-2 border-2 border-black text-sm uppercase">
            {loading ? "Subscribing..." : "Claim 10% Off"}
          </button>
          <button
            onClick={() => {
              onClose();
              onSkipConfirm();
            }}
            className="text-xs text-gray-600 hover:text-black text-right block self-end"
            style={{
              justifyContent: "flex-end",
              lineHeight: 1.2,
              paddingTop: 0,
              paddingBottom: 0,
              marginTop: 0,
              marginBottom: 0,
            }}>
            <span
              className="underline"
              style={{display: "inline-block", lineHeight: 1.2}}>
              No, thanks.
              <br />
              I’ll pay full price.
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
