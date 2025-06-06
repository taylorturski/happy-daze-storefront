import Image from "next/image";
import React from "react";

export default function StoryBlock() {
  return (
    <section className="relative w-full bg-black text-white overflow-hidden pt-8 pb-8">
      <Image
        src="/images/story-block-bg.jpg"
        alt="Happy Daze origin story"
        fill
        loading="lazy"
        quality={100}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 flex items-center justify-center px-3">
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
