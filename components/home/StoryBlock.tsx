"use client";

import Image from "next/image";

export default function StoryBlock() {
  return (
    <section className="relative w-full h-[80svh] bg-black text-white overflow-hidden">
      <Image
        src="/images/story-block-bg.jpg"
        alt="Happy Daze origin story"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="relative z-20 h-full flex items-center justify-center px-6">
        <div className="max-w-3xl text-center space-y-4 leading-relaxed text-base sm:text-lg font-pitch">
          <p>
            You know that feeling when something just fits? Not too flashy. Not
            too loud. Just right.
          </p>
          <p>
            That’s how it started. One putter in a garage. Built to feel
            personal. Intentional.
          </p>
          <p>
            We never wanted to out-tech anyone. We just wanted to make gear that
            meant something. A club you’d never sell or trade in. A hat that
            works at both the local CC and a night out.
          </p>
          <p>We’re not chasing what’s next. We’re holding onto what matters.</p>
        </div>
      </div>
    </section>
  );
}
