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
import "./build-your-putter.css";

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
    <div className="builder-wrapper">
      <div className="builder-scroll">
        <div className="max-w-screen-lg mx-auto px-2 sm:px-8 pt-2 sm:pt-6">
          <h2 className="text-xl font-bold uppercase mb-1">Build Overview</h2>
          <p className="mb-4 text-xs sm:text-sm max-w-5xl leading-relaxed">
            Give everything one last look—make sure this putter feels like{" "}
            <em>you</em>. Each order comes with a headcover, grip, and shaft cut
            to your length. We&apos;ll get those details after checkout. :)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
            {steps.map((step) => {
              const selection = getOption(
                step,
                selections[step] !== undefined ? String(selections[step]) : null
              );

              return selection ? (
                <div
                  key={step}
                  className="border-2 border-[#ACFF9B] flex flex-col">
                  <div className="w-full aspect-[3/2] overflow-hidden bg-black">
                    <Image
                      src={selection.image}
                      alt={selection.label}
                      width={600}
                      height={400}
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
                  className="border-2 border-[#ACFF9B] p-4 text-xs sm:text-sm text-center italic text-gray-400">
                  <p>{step} not selected</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="builder-footer">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <button
            onClick={onBack}
            className="bg-white font-vt text-md tracking-wider uppercase text-black px-4 py-2 font-bold border-2 border-black">
            Back
          </button>
          <StepCheckout />
        </div>
      </div>
    </div>
  );
}
