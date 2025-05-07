"use client";

import {useContext, useState} from "react";
import {BuildContext} from "./BuildContext";
import StepSelector from "./StepSelector";
import StepCheckout from "./StepCheckout";
import StepReview from "./StepReview";
import Overview from "./Overview";
import {Step} from "./BuildContext";
import "./build-your-putter.css";

const steps: Step[] = [
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
    step !== "overview" && step !== "review" && !selections[step];

  return (
    <div className="builder-wrapper">
      <div className="builder-scroll pt-[20px] sm:pt-0">
        <div className="w-full max-w-[1000px] mx-auto">
          {step === "overview" && <Overview />}
          {step !== "overview" && step !== "review" && (
            <StepSelector step={step} />
          )}
          {step === "review" && <StepReview onBack={handleBack} />}
        </div>
      </div>

      <div className="builder-footer">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          {!isFirst ? (
            <button
              onClick={handleBack}
              className="bg-white text-md font-vt uppercase tracking-wider text-black px-4 py-2 font-bold border-2 border-black">
              Back
            </button>
          ) : (
            <div />
          )}

          {step === "review" ? (
            <StepCheckout />
          ) : (
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`px-4 py-2 text-md font-vt uppercase tracking-wider border-2 ${
                isNextDisabled
                  ? "border-white text-white opacity-30 cursor-not-allowed"
                  : "bg-[#ACFF9B] text-black border-black"
              }`}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
