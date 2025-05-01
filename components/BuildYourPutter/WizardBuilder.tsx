"use client";

import {useContext, useState} from "react";
import {BuildContext} from "./BuildContext";
import StepSelector from "./StepSelector";
import StepReview from "./StepReview";
import Overview from "./Overview";
import {Step} from "./BuildContext";

const steps: (Step | "overview" | "review")[] = [
  "overview",
  "material",
  "headshape",
  "finish",
  "face",
  "neck",
  "alignment",
  "review",
];

export default function WizardBuilder() {
  const {selections} = useContext(BuildContext);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = steps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (!isLast) setCurrentStepIndex((i) => i + 1);
  };

  const handleBack = () => {
    if (!isFirst) setCurrentStepIndex((i) => i - 1);
  };

  const isNextDisabled =
    typeof step === "string" &&
    step !== "overview" &&
    step !== "review" &&
    !selections[step];

  return (
    <section className="fixed inset-0 z-[99] flex flex-col font-pitch bg-black builder-layout">
      {step !== "review" && (
        <button
          onClick={() => (window.location.href = "/")}
          className="fixed top-3 right-4 z-[100] text-white text-3xl font-bold px-3 py-2 hover:text-[#ACFF9B] transition select-none"
          aria-label="Close Builder">
          &times;
        </button>
      )}

      <div className="flex-1 overflow-y-auto w-full sm:pl-0 sm:pr-8 pb-32">
        <div className="max-w-screen-lg mx-auto">
          {step === "overview" && <Overview />}
          {typeof step === "string" &&
            step !== "overview" &&
            step !== "review" && <StepSelector step={step} />}
          {step === "review" && <StepReview onBack={handleBack} />}
        </div>
      </div>

      {step !== "review" && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] px-3 sm:px-8 py-3 bg-black border-t-2 border-white">
          <div className="max-w-screen-lg mx-auto flex justify-between items-center">
            {!isFirst ? (
              <button
                onClick={handleBack}
                className="bg-white text-black px-4 py-2 font-bold border-2 border-black">
                Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`px-4 py-2 font-bold border-2 ${
                isNextDisabled
                  ? "border-white text-white opacity-30 cursor-not-allowed"
                  : "bg-[#ACFF9B] text-black border-black"
              }`}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* 👇 Hidden purge-proof tailwind refs */}
      <div className="hidden builder-layout fixed inset-0 z-[99] z-[100] flex flex-col bg-black overflow-y-auto pb-32 border-t-2 border-white top-3 right-4 text-white text-3xl hover:text-[#ACFF9B] px-3 py-2 px-4 py-3 border-2 bg-[#ACFF9B] text-black opacity-30 cursor-not-allowed" />
    </section>
  );
}
