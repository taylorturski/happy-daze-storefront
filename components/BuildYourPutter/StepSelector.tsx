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

  return (
    <section className="p-8 border-t border-white">
      <h2 className="text-xl font-bold uppercase mb-4">{step}</h2>
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
