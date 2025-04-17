"use client";

import {useContext, useState} from "react";
import {BuildContext} from "./BuildContext";
import {useCart} from "@/app/context/CartContext";
import {useRouter} from "next/navigation";

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
  const {addToCart} = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const missingSteps = REQUIRED_STEPS.filter((step) => !selections[step]);

  const handleAddToCart = async () => {
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

    console.log("[BUILD] Sending selections to /api/checkout:", selections);

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(selections),
      });

      const data = await res.json();
      console.log("[BUILD] Response from /api/checkout:", data);

      if (!res.ok || !data?.variantId) {
        throw new Error(data?.error || "Failed to match product.");
      }

      await addToCart({
        id: data.variantId,
        title: data.title,
        price: parseFloat(data.price),
        image: data.image,
        quantity: 1,
        properties: selections,
      });

      router.push("/");
    } catch (err: any) {
      console.error("[BUILD] Add to cart error:", err);
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
        onClick={handleAddToCart}
        className={`px-6 font-vt lowercase py-3 mb-3 border-2 text-sm uppercase font-bold ${
          allStepsSelected
            ? "border-white text-white"
            : "border-gray-500 text-gray-500"
        }`}>
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </section>
  );
}
