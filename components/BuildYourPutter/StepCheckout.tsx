"use client";

import {useContext, useState} from "react";
import {BuildContext} from "./BuildContext";
import {useCart} from "@/app/context/CartContext";
import AddToCartButton from "@/components/AddToCartButton";

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

    window.gtag?.("event", "builder_add_to_cart", {completed: true});

    setLoading(true);
    setAdded(true);

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    window.dispatchEvent(
      new CustomEvent("add-to-cart-feedback", {detail: {x, y}})
    );

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

      if (data.cartId) localStorage.setItem("cartId", data.cartId);
      if (data.url) localStorage.setItem("checkoutUrl", data.url);

      window.gtag?.("event", "builder_add_to_cart_success", {
        product_id: data.variantId,
        cart_id: data.cartId,
      });

      await fetchCart();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unexpected error.";
      setError(errorMessage);

      window.gtag?.("event", "builder_add_to_cart_error", {
        error_message: errorMessage,
      });
    } finally {
      setTimeout(() => setAdded(false), 2000);
      setLoading(false);
    }
  };

  return (
    <div className="builder-footer-content w-full max-w-screen-lg mx-auto flex justify-end items-center">
      <AddToCartButton
        id="builder-temp-id"
        title="Custom Putter"
        price={0}
        image=""
        quantity={1}
        properties={selections}
        onClick={handleAddToCart}
        disabled={loading || !allStepsSelected}
        added={added}
        loading={loading}
        className="!mt-0"
      />
      {error && (
        <p className="text-red-500 mt-2 text-sm max-w-sm text-right">{error}</p>
      )}
    </div>
  );
}
