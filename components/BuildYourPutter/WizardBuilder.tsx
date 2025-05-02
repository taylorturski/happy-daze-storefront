"use client";

import {useContext, useEffect, useRef, useState} from "react";
import {BuildContext} from "./BuildContext";
import StepSelector from "./StepSelector";
import StepReview from "./StepReview";
import Overview from "./Overview";
import {Step} from "./BuildContext";
import "./build-your-putter.css";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const step = steps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (!isLast) setCurrentStepIndex((i) => i + 1);
  };

  const handleBack = () => {
    if (!isFirst) setCurrentStepIndex((i) => i - 1);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    }, 25); // slight delay for layout to stabilize
    return () => clearTimeout(timeout);
  }, [currentStepIndex]);

  const isNextDisabled =
    typeof step === "string" &&
    step !== "overview" &&
    step !== "review" &&
    !selections[step];

  return (
    <div className="builder-wrapper">
      <div className="builder-scroll" ref={scrollRef}>
        <div className="max-w-screen-lg mx-auto sm:px-8">
          {step === "overview" && <Overview />}
          {typeof step === "string" &&
            step !== "overview" &&
            step !== "review" && <StepSelector step={step} />}
          {step === "review" && <StepReview onBack={handleBack} />}
        </div>
      </div>

      {step !== "review" && (
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
          </div>
        </div>
      )}
    </div>
  );
}
