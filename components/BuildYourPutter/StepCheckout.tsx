"use client";

import {useContext, useState} from "react";
import {BuildContext} from "./BuildContext";

export default function StepCheckout() {
  const {selections} = useContext(BuildContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(selections),
      });

      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Checkout failed.");
      }

      window.location.href = data.url;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  const allStepsSelected = (
    ["material", "headshape", "finish", "face", "neck", "alignment"] as const
  ).every((key) => selections[key]);

  return (
    <section className="p-8 font-mono text-center">
      <button
        disabled={!allStepsSelected || loading}
        onClick={handleCheckout}
        className={`px-6 py-3 border-2 text-sm uppercase font-bold ${
          allStepsSelected
            ? "border-white text-white"
            : "border-gray-500 text-gray-500"
        }`}>
        {loading ? "Redirecting..." : "Start Order"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </section>
  );
}
