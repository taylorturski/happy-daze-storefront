"use client";

import Image from "next/image";
import React from "react";

export default function FullBleedImage({
  imageSrc,
  alt = "",
  children,
}: {
  imageSrc: string;
  alt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative w-full h-[79svh] overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority
        className="object-cover object-center brightness-[0.9] contrast-[1.1] saturate-[0.85] z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Foreground text */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 tracking-tight font-bold text-2xl">
        {children}
      </div>
    </section>
  );
}
