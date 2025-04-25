"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  {ssr: false}
);
const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  {ssr: false}
);

export default function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const hasSubscribed = localStorage.getItem("emailSubscribed");
    const alreadyDismissed = sessionStorage.getItem("popupDismissed");

    if (!hasSubscribed && !alreadyDismissed) {
      setTimeout(() => setVisible(true), 3000);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email}),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Error subscribing");

      localStorage.setItem("emailSubscribed", "true");
      localStorage.setItem("happyDazeDiscount", "HAPPY10");
      sessionStorage.removeItem("popupDismissed");
      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong.");
    }
  };

  const handleClose = () => {
    sessionStorage.setItem("popupDismissed", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <MotionDiv
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 overflow-x-hidden">
          <MotionDiv
            initial={{scale: 0.85, rotate: -10, opacity: 0, y: 100}}
            animate={{scale: 1, rotate: 0, opacity: 1, y: 0}}
            exit={{scale: 0.3, rotate: 360, opacity: 0, y: 300}}
            transition={{duration: 0.5, ease: "anticipate"}}
            className="bg-white text-black w-full max-w-2xl mx-auto box-border overflow-hidden flex flex-col md:flex-row rounded shadow-xl relative font-pitch">
            <div className="w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center bg-black overflow-hidden">
              <Image
                src="/email-modal-img-2.jpg"
                alt="Happy Daze Golf"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="w-full md:w-1/2 p-4 md:p-6 relative">
              <button
                onClick={handleClose}
                className="absolute font-vt lowercase top-2 right-3 text-xl font-bold text-gray-500 hover:text-black">
                &times;
              </button>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h2 className="text-xl font-pitch font-semibold uppercase">
                    Get 10% Off
                  </h2>
                  <p className="text-sm mt-0 font-pitch font-medium">
                    Sign up to get 10% off your first custom order.
                  </p>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-black bg-black text-white px-3 py-2 font-pitch font-medium"
                  />
                  <button
                    type="submit"
                    className="bg-black text-white text-lg px-4 py-2 font-vt border-2 lowercase border-black">
                    Claim Discount :)
                  </button>
                  {error && (
                    <p className="text-red-600 text-sm font-pitch font-medium">
                      {error}
                    </p>
                  )}
                </form>
              ) : (
                <div className="text-center">
                  <h2 className="text-xl font-pitch font-semibold uppercase mb-2">
                    You’re in!
                  </h2>
                  <p className="text-green-600 text-sm font-medium mb-2">
                    Discount will be automatically applied at checkout!
                  </p>
                  <p className="text-xs text-gray-600 font-pitch font-medium">
                    Thanks for joining the Happy Daze underground.
                  </p>
                </div>
              )}
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}
