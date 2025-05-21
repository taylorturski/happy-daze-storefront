"use client";

import {useContext, useState} from "react";
import {BuildContext} from "./BuildContext";
import {useCart} from "@/app/context/CartContext";
import AddToCartButton from "@/components/AddToCartButton";
import BuilderSubscribeModal from "./BuilderSubscribeModal";

const REQUIRED_STEPS = [
  "material",
  "headshape",
  "finish",
  "face",
  "neck",
  "alignment",
] as const;

export default function StepCheckout() {
  const {selections, subscribed} = useContext(BuildContext);
  const {fetchCart} = useCart();

  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const missingSteps = REQUIRED_STEPS.filter((step) => !selections[step]);
  const allStepsSelected = missingSteps.length === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
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

    if (!subscribed) {
      setShowModal(true);
      return;
    }

    proceedToAddToCart(e);
  };

  const proceedToAddToCart = async (e?: React.MouseEvent) => {
    window.gtag?.("event", "builder_add_to_cart", {
      completed: true,
    });

    setLoading(true);
    setAdded(true);

    if (e) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;
      window.dispatchEvent(
        new CustomEvent("add-to-cart-feedback", {detail: {x, y}})
      );
    }

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

      await fetchCart();

      window.gtag?.("event", "builder_add_to_cart_success", {
        product_id: data.variantId,
        cart_id: data.cartId,
      });

      setTimeout(() => {
        window.gtag?.("event", "checkout_redirected", {
          cart_id: data.cartId || "unknown",
        });
        setAdded(false);
      }, 2000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unexpected error.";
      setError(errorMessage);

      window.gtag?.("event", "builder_add_to_cart_error", {
        error_message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full sm:w-auto max-w-[240px]">
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
      />

      {error && (
        <p className="text-red-500 mt-2 text-sm max-w-sm text-right">{error}</p>
      )}

      {showModal && (
        <BuilderSubscribeModal
          onClose={() => setShowModal(false)}
          onSkipConfirm={() => {
            setShowModal(false);
            proceedToAddToCart();
          }}
          onSubscribeConfirm={() => {
            setShowModal(false);
            proceedToAddToCart();
          }}
        />
      )}
    </div>
  );
}
