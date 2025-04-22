"use client";

import Image from "next/image";
import React, {ReactNode} from "react";

interface FullBleedImageProps {
  imageSrc: string;
  alt?: string;
  children?: ReactNode;
  priority?: boolean;
}

export default function FullBleedImage({
  imageSrc,
  alt = "",
  children,
  priority = false,
}: FullBleedImageProps) {
  return (
    <section className="relative w-full h-[79svh] overflow-hidden">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority
        className="object-cover object-center brightness-[0.9] contrast-[1.1] saturate-[0.85] z-0"
      />

      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 tracking-tight font-bold uppercase text-2xl">
        {children}
      </div>
    </section>
  );
}
