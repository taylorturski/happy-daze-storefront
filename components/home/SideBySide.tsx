"use client";

import Image from "next/image";
import React from "react";
import {motion} from "framer-motion";

export default function SideBySide({
  imageSrc,
  alt = "",
  title,
  subtitle,
}: {
  imageSrc: string;
  alt?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="w-full bg-transparent text-white pb-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row-reverse items-center gap-12">
        <motion.div
          initial={{clipPath: "inset(0 100% 0 0)"}}
          animate={{clipPath: "inset(0 0% 0 0)"}}
          transition={{duration: 0.8, ease: "easeOut"}}
          className="pr-4 sm:px-0 w-full sm:w-1/2 text-left font-pitch">
          <h2 className="text-xl sm:text-3xl pr-1 font-bold uppercase mb-4 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base pr-4 sm:text-lg text-white/80">
              {subtitle}
            </p>
          )}
        </motion.div>
        <div className="w-full sm:w-1/2">
          <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] overflow-hidden">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
