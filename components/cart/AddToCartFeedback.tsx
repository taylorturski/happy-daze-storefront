"use client";

import {useEffect, useState} from "react";

export default function AddToCartFeedback() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const {x, y} = e.detail;
      setPosition({x, y});
      setVisible(true);

      setTimeout(() => setVisible(false), 1000);
    };

    window.addEventListener("add-to-cart-feedback", handler as EventListener);

    return () => {
      window.removeEventListener(
        "add-to-cart-feedback",
        handler as EventListener
      );
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed text-3xl font-bold z-50 select-none pointer-events-none animate-float-up"
      style={{
        left: position.x,
        top: position.y,
        color: "#ACFF9B",
        textShadow: "0 0 6px rgba(172, 255, 155, 0.9)",
      }}>
      +1
    </div>
  );
}
