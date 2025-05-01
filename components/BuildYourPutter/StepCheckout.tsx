"use client";

import {useContext, useState} from "react";
import {BuildContext} from "./BuildContext";
import {useCart} from "@/app/context/CartContext";

const REQUIRED_STEPS = [
  "material",
  "headshape",
  "finish",
  "face",
  "neck",
  "alignment",
] as const;

function triggerCartFeedback(e: React.MouseEvent) {
  const rect = (e.target as HTMLElement).getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top;
  window.dispatchEvent(
    new CustomEvent("add-to-cart-feedback", {detail: {x, y}})
  );
}

export default function StepCheckout() {
  const {selections} = useContext(BuildContext);
  const {fetchCart} = useCart();

  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const missingSteps = REQUIRED_STEPS.filter((step) => !selections[step]);
  const allStepsSelected = missingSteps.length === 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    setError("");

    if (!allStepsSelected) {
      const message =
        "Please complete: " +
        missingSteps
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(", ");
      setError(message);
      return;
    }

    setLoading(true);
    triggerCartFeedback(e);

    try {
      const cartId = localStorage.getItem("cartId");

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cartId ? {"x-cart-id": cartId} : {}),
        },
        body: JSON.stringify(selections),
      });

      const data = await res.json();

      if (!res.ok || !data?.variantId) {
        throw new Error(data?.error || "Failed to match product.");
      }

      if (data?.cartId) localStorage.setItem("cartId", data.cartId);
      if (data?.url) localStorage.setItem("checkoutUrl", data.url);
      await fetchCart();

      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        window.location.href = "/";
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/2 sm:w-auto">
      <button
        disabled={loading || !allStepsSelected}
        onClick={handleAddToCart}
        className={`px-4 py-2 font-vt tracking-wider text-md uppercase border-2 w-full sm:w-auto transition-all duration-300
          ${
            added
              ? "bg-[#ACFF9B] text-black border-[#ACFF9B]"
              : allStepsSelected
              ? "bg-[#ACFF9B] text-black border-black"
              : "border-white text-white opacity-30 cursor-not-allowed"
          }
        `}>
        {loading ? "Adding..." : added ? "✓ Added" : "Add to Cart"}
      </button>

      {error && (
        <p className="text-red-500 mt-2 text-sm max-w-sm text-right">{error}</p>
      )}
    </div>
  );
}
