"use client";

import {useContext} from "react";
import {BuildOption} from "./types";
import {materials} from "./data/materials";
import {headshapes} from "./data/headshapes";
import {finishes} from "./data/finishOptions";
import {BuildContext} from "./BuildContext";
import {faceOptions} from "./data/face";
import {neckOptions} from "./data/neckOptions";
import {alignmentOptions} from "./data/alignmentOptions";

type StepSelectorProps = {
  step: "material" | "headshape" | "finish" | "face" | "neck" | "alignment";
};

export default function StepSelector({step}: StepSelectorProps) {
  const {selections, setSelection} = useContext(BuildContext);

  let options: BuildOption[] = [];

  switch (step) {
    case "material":
      options = materials;
      break;
    case "headshape":
      options = headshapes;
      break;
    case "finish":
      const material = selections.material;
      if (material === "carbon") {
        options = finishes.filter((f) => f.material === "carbon");
      } else if (material === "stainless") {
        options = finishes.filter((f) => f.material === "stainless");
      }
      break;
    case "face":
      options = faceOptions;
      break;
    case "neck":
      options = neckOptions;
      break;
    case "alignment":
      options = alignmentOptions;
      break;
    default:
      options = [];
  }

  const selected = selections[step] || null;

  const handleSelect = (id: string) => {
    setSelection(step, id);
  };

  // Determine dynamic grid column count
  const getGridClass = () => {
    const count = options.length;
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    if (count === 4) return "grid-cols-2";
    if (count >= 5) return "grid-cols-4";
    return "grid-cols-1";
  };

  const gridColsClass = getGridClass();

  return (
    <section className="p-8 border-t border-white o">
      <h2 className="text-xl font-bold uppercase mb-4">{step}</h2>
      <div className={`grid gap-6 w-full ${gridColsClass}`}>
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
