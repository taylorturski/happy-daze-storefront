"use client";

import {useContext} from "react";
import {BuildContext} from "./BuildContext";
import {materials} from "./data/materials";
import {headshapes} from "./data/headshapes";
import {finishes} from "./data/finishOptions";
import {faceOptions} from "./data/face";
import {neckOptions} from "./data/neckOptions";
import {alignmentOptions} from "./data/alignmentOptions";
import {BuildOption} from "./types";

const stepMap: {[key: string]: BuildOption[]} = {
  material: materials,
  headshape: headshapes,
  finish: finishes,
  face: faceOptions,
  neck: neckOptions,
  alignment: alignmentOptions,
};

export default function StepReview() {
  const {selections} = useContext(BuildContext);

  const getOption = (step: string, id: string | null) => {
    const options = stepMap[step];
    return options?.find((opt) => opt.id === id);
  };

  const steps: (keyof typeof selections)[] = [
    "material",
    "headshape",
    "finish",
    "face",
    "neck",
    "alignment",
  ];

  return (
    <section className="p-8 border-t border-white font-pitch">
      <h2 className="text-xl font-bold uppercase mb-4">Your Build</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {steps.map((step) => {
          const selection = getOption(
            step,
            selections[step as keyof typeof selections] !== undefined
              ? String(selections[step as keyof typeof selections])
              : null
          );
          return selection ? (
            <div key={step} className="border-2 border-white p-4">
              <h3 className="text-sm font-bold uppercase mb-2">{step}</h3>
              <img
                src={selection.image}
                alt={selection.label}
                className="w-full h-auto border mb-2"
              />
              <p className="text-center text-sm">{selection.label}</p>
            </div>
          ) : (
            <div
              key={step}
              className="border-2 border-white p-4 text-sm text-center italic text-gray-400">
              <p>{step} not selected</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
