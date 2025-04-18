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
import StepCheckout from "./StepCheckout";

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
    <section className="h-full flex flex-col justify-between font-pitch">
      <div className="p-3 sm:p-6">
        <h2 className="text-xl font-bold uppercase mb-4">Your Build</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step) => {
            const selection = getOption(
              step,
              selections[step as keyof typeof selections] !== undefined
                ? String(selections[step as keyof typeof selections])
                : null
            );

            return selection ? (
              <div key={step} className="border-2 border-white flex flex-col">
                <div className="w-full h-[140px] sm:h-[160px] overflow-hidden">
                  <img
                    src={selection.image}
                    alt={selection.label}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-2 sm:p-3 flex flex-col items-center justify-center text-center">
                  <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wide mb-1">
                    {step}
                  </h3>
                  <p className="text-[12px] sm:text-sm leading-tight">
                    {selection.label}
                  </p>
                </div>
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
      </div>

      {/* ⬇️ Identical layout to WizardBuilder step buttons */}
      <div className="flex justify-between items-center px-6 py-4">
        <button
          onClick={() => window.history.back()}
          className="bg-white text-black px-4 py-2 font-bold border-2 border-black">
          Back
        </button>
        <StepCheckout />
      </div>
    </section>
  );
}
