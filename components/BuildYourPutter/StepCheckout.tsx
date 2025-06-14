"use client";

import {useEffect, useState} from "react";
import {useContext} from "react";
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
  "length",
  "dexterity",
] as const;

export default function StepCheckout() {
  const {selections} = useContext(BuildContext);
  const {fetchCart} = useCart();

  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Mark hydration for client-only logic
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Check localStorage for subscription
  const [isSubscribed, setIsSubscribed] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSubscribed(localStorage.getItem("emailSubscribed") === "true");
    }
  }, []);

  const missingSteps = REQUIRED_STEPS.filter((s) => !selections[s]);
  const allStepsSelected = missingSteps.length === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    setError("");
    if (!allStepsSelected) {
      setError(
        "Please complete: " +
          missingSteps
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(", ")
      );
      return;
    }
    // Show modal if not subscribed
    if (hydrated && !isSubscribed) {
      setShowModal(true);
      return;
    }
    proceedToAddToCart(e);
  };

  const proceedToAddToCart = async (e?: React.MouseEvent) => {
    window.gtag?.("event", "builder_add_to_cart", {completed: true});
    setLoading(true);
    setAdded(true);

    if (e) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent("add-to-cart-feedback", {
          detail: {x: rect.left + rect.width / 2, y: rect.top},
        })
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
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(selections).filter(
              ([_, v]) => typeof v === "string" && v.trim() !== ""
            )
          )
        ),
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
      const msg = err instanceof Error ? err.message : "Unexpected error.";
      setError(msg);
      window.gtag?.("event", "builder_add_to_cart_error", {
        error_message: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!hydrated) return null;

  return (
    <div className="w-full sm:w-auto max-w-[240px]">
      <AddToCartButton
        id="builder-temp-id"
        title="Custom Putter"
        price={0}
        image=""
        properties={selections}
        onClick={handleAddToCart}
        disabled={loading || !allStepsSelected}
        added={added}
        loading={loading}
      />

      {error && <p className="text-red-500 mt-2 text-sm text-right">{error}</p>}

      {showModal && (
        <BuilderSubscribeModal
          onClose={() => setShowModal(false)}
          onSkipConfirm={() => {
            setShowModal(false);
            setIsSubscribed(false);
            proceedToAddToCart();
          }}
          onSubscribeConfirm={() => {
            setShowModal(false);
            setIsSubscribed(true);
            proceedToAddToCart();
          }}
        />
      )}
    </div>
  );
}
