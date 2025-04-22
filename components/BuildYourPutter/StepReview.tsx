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
import Image from "next/image";

const stepMap: {[key: string]: BuildOption[]} = {
  material: materials,
  headshape: headshapes,
  finish: finishes,
  face: faceOptions,
  neck: neckOptions,
  alignment: alignmentOptions,
};

export default function StepReview({onBack}: {onBack: () => void}) {
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
    <section className="h-[calc(100dvh-64px)] w-full flex flex-col font-pitch overflow-hidden">
      {/* Scrollable build preview */}
      <div className="flex-1 overflow-y-auto w-full px-3 sm:pl-[0px] sm:pr-8 pt-4 sm:pt-6">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-xl font-bold uppercase mb-4">Your Build</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
            {steps.map((step) => {
              const selection = getOption(
                step,
                selections[step] !== undefined ? String(selections[step]) : null
              );

              return selection ? (
                <div key={step} className="border-2 border-white flex flex-col">
                  <div className="w-full sm:h-[150px] overflow-hidden">
                    <Image
                      src={selection.image}
                      alt={selection.label}
                      height={300}
                      width={300}
                      priority
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-1 text-xs sm:text-sm text-center">
                    <span className="font-bold capitalize">{step}:</span>{" "}
                    {step === "finish"
                      ? selection.label.replace(/\s*\(\+\$\d+\)/g, "")
                      : selection.label}
                  </div>
                </div>
              ) : (
                <div
                  key={step}
                  className="border-2 border-white p-4 text-xs sm:text-sm text-center italic text-gray-400">
                  <p>{step} not selected</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Aligned footer buttons */}
      <div className="w-full px-3 sm:pl-[0px] sm:pr-8 py-6 bg-black">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <button
            onClick={onBack}
            className="bg-white text-black px-4 py-2 font-bold border-2 border-black">
            Back
          </button>
          <StepCheckout />
        </div>
      </div>
    </section>
  );
}
