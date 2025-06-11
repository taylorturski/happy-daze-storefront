"use client";

import {useContext} from "react";
import Image from "next/image";
import {BuildOption} from "./types";
import {BuildContext} from "./BuildContext";
import {materials} from "./data/materials";
import {headshapes} from "./data/headshapes";
import {finishes} from "./data/finishOptions";
import {faceOptions} from "./data/face";
import {neckOptions} from "./data/neckOptions";
import {alignmentOptions} from "./data/alignmentOptions";
import {stepDescriptions} from "./data/stepDescriptions";

type StepSelectorProps = {
  step: "material" | "headshape" | "finish" | "face" | "neck" | "alignment";
};

const stepOrderMap: Record<string, number> = {
  material: 1,
  headshape: 2,
  finish: 3,
  face: 4,
  neck: 5,
  alignment: 6,
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

    const selectedOption = options.find((opt) => opt.id === id);

    window.gtag?.("event", "builder_option_selected", {
      step,
      option_id: id,
      option_label: selectedOption?.label ?? "",
      ...(step === "finish" && {
        material: selections.material ?? "unknown",
      }),
    });
  };

  const getGridClass = () => {
    const count = options.length;
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-2 sm:grid-cols-3";
    if (count === 4) return "grid-cols-2 sm:grid-cols-4";
    if (count >= 5) return "grid-cols-4";
    return "grid-cols-2";
  };

  const gridColsClass = getGridClass();
  const stepNumber = stepOrderMap[step];

  return (
    <section className="flex flex-col h-full font-pitch">
      <div className="px-3 pb-0 sm:pt-2">
        <p className="text-md text-[#ACFF9B] font-vt lowercase">
          step {stepNumber}
        </p>
        <h2 className="text-xl font-bold uppercase mb-1">{step}</h2>
        {stepDescriptions[step] && (
          <div className="mb-4 text-sm w-full leading-relaxed text-white">
            <p className="mb-2">{stepDescriptions[step].body}</p>
            {stepDescriptions[step].bullets && (
              <ul className="list-disc ml-5 space-y-1 text-white text-sm">
                {stepDescriptions[step].bullets.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="px-3 pb-3">
        <div className={`grid gap-4 ${gridColsClass} max-w-full`}>
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`cursor-pointer border-2 ${
                selected === option.id ? "border-[#ACFF9B]" : "border-white"
              }`}>
              <div className="aspect-[4/2] w-full overflow-hidden bg-black">
                <Image
                  src={option.image}
                  alt={option.label}
                  width={400}
                  height={533}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="text-center text-xs sm:text-sm font-medium py-0.5 bg-black">
                {option.label.replace(/\s*\(\+\$\d+\)/g, "")}
              </div>
            </div>
          ))}
        </div>

        {step === "headshape" && (
          <div className="px-3 mt-6 w-full">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block mb-1 text-sm text-white">
                  Putter Length (inches)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.25"
                  min="30"
                  max="37"
                  value={selections.length || ""}
                  onChange={(e) => setSelection("length", e.target.value)}
                  className="w-full px-3 py-2 border-2 border-white bg-black text-white"
                  placeholder="e.g. 33.5"
                />
              </div>

              <div className="w-full sm:w-1/2">
                <label className="block mb-1 text-sm text-white">
                  Dexterity
                </label>
                <select
                  value={selections.dexterity || ""}
                  onChange={(e) => setSelection("dexterity", e.target.value)}
                  className="w-full px-3 py-2 border-2 border-white bg-black text-white">
                  <option value="">Select</option>
                  <option value="Right">Right-handed</option>
                  <option value="Left">Left-handed</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
