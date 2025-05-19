"use client";

import {useContext, useState, useEffect} from "react";
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
  const [startTime] = useState(() => Date.now());

  const step = steps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;

  // Track step views
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.gtag?.("event", "builder_step_viewed", {
        step,
      });
    }
  }, [step]);

  // Track abandonment
  useEffect(() => {
    const handleUnload = () => {
      if (step !== "review") {
        window.gtag?.("event", "builder_abandoned_midway", {
          step,
        });
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [step]);

  const handleNext = () => {
    const nextStep = steps[currentStepIndex + 1];

    if (!isLast) {
      setCurrentStepIndex((i) => i + 1);
    }

    if (nextStep === "review") {
      const duration = Math.round((Date.now() - startTime) / 1000);
      window.gtag?.("event", "builder_duration_complete", {
        duration_seconds: duration,
      });
    }
  };

  const handleBack = () => {
    if (!isFirst) {
      window.gtag?.("event", "builder_back_clicked", {
        step,
      });
      setCurrentStepIndex((i) => i - 1);
    }
  };

  const isNextDisabled =
    step !== "overview" && step !== "review" && !selections[step];

  return (
    <div className="builder-wrapper">
      <div className="builder-scroll sm:pt-0">
        <div className="w-full max-w-[1000px] mx-auto">
          {step === "overview" && <Overview />}
          {step !== "overview" && step !== "review" && (
            <StepSelector step={step} />
          )}
          {step === "review" && <StepReview onBack={handleBack} />}
        </div>
      </div>
      <div className="builder-footer">
        <div className="builder-footer-inner">
          {!isFirst ? (
            <button
              onClick={handleBack}
              onMouseEnter={() =>
                window.gtag?.("event", "builder_button_hovered", {
                  button: "Back",
                  step,
                })
              }
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
              onMouseEnter={() =>
                window.gtag?.("event", "builder_button_hovered", {
                  button: "Next",
                  step,
                })
              }
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
