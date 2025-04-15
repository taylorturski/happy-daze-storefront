"use client";

import {useState} from "react";
import {BuildOption} from "./types";
import {headshapes} from "./data/headshapes";

type StepSelectorProps = {
  step: "headshape" | "finish" | "face" | "neck" | "alignment";
};

export default function StepSelector({step}: StepSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const options: BuildOption[] = (() => {
    switch (step) {
      case "headshape":
        return headshapes;
      default:
        return [];
    }
  })();

  return (
    <section className="p-8 border-t border-white">
      <h2 className="text-xl font-bold uppercase mb-4">Step: {step}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`cursor-pointer p-4 border-2 ${
              selected === option.id ? "border-green-500" : "border-white"
            }`}>
            <img
              src={option.image}
              alt={option.label}
              className="w-full h-auto mb-2"
            />
            <p className="text-center text-sm">{option.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
