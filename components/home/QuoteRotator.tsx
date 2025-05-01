"use client";

import dynamic from "next/dynamic";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  {ssr: false}
);
const MotionSpan = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.span),
  {ssr: false}
);

const baseQuote = "Refuse the ordinary.";
const repeated = Array(20).fill(baseQuote).join(" ");

export default function QuoteRotator() {
  const renderText = (text: string) =>
    text.split("").map((char, i) => {
      const displayChar = char === " " ? "\u00A0" : char;

      return (
        <MotionSpan
          key={i}
          className="inline-block mr-0.5 text-xl sm:text-3xl font-pitch uppercase tracking-widest">
          {displayChar}
        </MotionSpan>
      );
    });

  return (
    <section className="w-full bg-black text-white text-opacity-20 font-pitch py-5 overflow-hidden">
      <div className="flex w-full overflow-hidden whitespace-nowrap">
        {[0, 1].map((i) => (
          <MotionDiv
            key={i}
            className="inline-block whitespace-nowrap"
            animate={{x: ["0%", "-100%"]}}
            transition={{repeat: Infinity, duration: 120, ease: "linear"}}>
            {renderText(repeated)}
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
