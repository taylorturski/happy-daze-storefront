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

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(selections),
      });

      const data = await res.json();
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
    <div className="flex flex-col w-1/2 sm:w-auto">
      <button
        disabled={loading || !allStepsSelected}
        onClick={handleAddToCart}
        className={`px-4 py-2 font-bold border-2 w-full ${
          allStepsSelected
            ? "bg-[#ACFF9B] text-black border-black"
            : "border-white text-white opacity-30 cursor-not-allowed"
        }`}>
        {loading ? "Adding..." : "Add to Cart"}
      </button>

      {error && (
        <p className="text-red-500 mt-2 text-sm max-w-sm text-right">{error}</p>
      )}
    </div>
  );
}
