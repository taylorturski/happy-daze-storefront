"use client";

import {motion} from "framer-motion";
import {useEffect, useState} from "react";

const quote = "Refuse the ordinary.";
const flickerChars = ["F", "U", "E", "E", "D", "A", "R"]; // flicker targets

export default function QuoteRotator() {
  const [shouldFlicker, setShouldFlicker] = useState(false);

  // Trigger flicker randomly every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      const flickerNow = Math.random() > 0.5; // 50% chance
      setShouldFlicker(flickerNow);

      if (flickerNow) {
        setTimeout(() => setShouldFlicker(false), 700);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-black text-white font-pitch py-5 overflow-hidden">
      <div className="w-full overflow-x-hidden">
        <motion.div
          className="inline-block whitespace-nowrap w-full"
          animate={{x: ["100%", "-100%"]}}
          transition={{repeat: Infinity, duration: 18, ease: "linear"}}>
          {quote.split("").map((char, i) => {
            const displayChar = char === " " ? "\u00A0" : char;
            const isFlickering =
              shouldFlicker && flickerChars.includes(char.toUpperCase());

            return (
              <motion.span
                key={i}
                className="inline-block mr-0.5 text-xl sm:text-3xl font-pitch uppercase tracking-widest"
                animate={{
                  opacity: isFlickering ? [1, 0.2, 0.6, 0.4, 1] : 1,
                }}
                transition={{
                  duration: isFlickering ? 0.6 : 0,
                  ease: "easeInOut",
                }}>
                {displayChar}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
