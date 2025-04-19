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
    if (!isLast) {
      setCurrentStepIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (!isFirst) {
      setCurrentStepIndex((i) => i - 1);
    }
  };

  const isNextDisabled =
    typeof step === "string" &&
    step !== "overview" &&
    step !== "review" &&
    !selections[step];

  return (
    <section className="h-[calc(100svh-64px)] flex flex-col justify-between overflow-hidden">
      {/* Step Content */}
      {step === "review" ? (
        <div className="flex-grow overflow-hidden flex flex-col justify-between">
          <StepReview />
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-hidden">
            {step === "overview" && <Overview />}
            {step !== "overview" && <StepSelector step={step} />}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center px-6 py-4">
            {!isFirst ? (
              <button
                onClick={handleBack}
                className="bg-white text-black px-4 py-2 font-bold">
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
        </>
      )}
    </section>
  );
}
