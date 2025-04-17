"use client";

import {useContext, useState} from "react";
import {BuildContext} from "./BuildContext";

const REQUIRED_STEPS = [
  "material",
  "headshape",
  "finish",
  "face",
  "neck",
  "alignment",
] as const;

export default function StepCheckout() {
  const {selections} = useContext(BuildContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const missingSteps = REQUIRED_STEPS.filter((step) => !selections[step]);

  const handleCheckout = async () => {
    setError("");

    if (missingSteps.length > 0) {
      const message =
        "Please complete: " +
        missingSteps
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(", ");
      setError(message);
      return;
    }

    setLoading(true);

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

  const allStepsSelected = missingSteps.length === 0;

  return (
    <section className="p-8 font-pitch text-center">
      <button
        disabled={loading}
        onClick={handleCheckout}
        className={`px-6 font-vt lowercase py-3 mb-3 border-2 text-sm uppercase font-bold ${
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
