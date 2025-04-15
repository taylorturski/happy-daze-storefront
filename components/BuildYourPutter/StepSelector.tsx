"use client";

import {useState, useEffect} from "react";
import {BuildOption} from "./types";
import {headshapes} from "./data/headshapes";
import {finishes} from "./data/finishOptions";
import {materials} from "./data/materials";

type StepSelectorProps = {
  step: "material" | "headshape" | "finish" | "face" | "neck" | "alignment";
};

export default function StepSelector({step}: StepSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [materialChoice, setMaterialChoice] = useState<string | null>(null); // controls finish filtering

  useEffect(() => {
    // Clear selected if step is material (ensures reset)
    if (step === "material") {
      setSelected(null);
    }
  }, [step]);

  let options: BuildOption[] = [];

  switch (step) {
    case "material":
      options = materials;
      break;
    case "headshape":
      options = headshapes;
      break;
    case "finish":
      if (materialChoice === "carbon") {
        options = finishes.filter((f) => f.material === "carbon");
      } else if (materialChoice === "stainless") {
        options = finishes.filter((f) => f.material === "stainless");
      }
      break;
    default:
      options = [];
  }

  const handleSelect = (id: string) => {
    setSelected(id);
    if (step === "material") {
      setMaterialChoice(id);
    }
  };

  return (
    <section className="p-8 border-t border-white">
      <h2 className="text-xl font-bold uppercase mb-4">Step: {step}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelect(option.id)}
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
