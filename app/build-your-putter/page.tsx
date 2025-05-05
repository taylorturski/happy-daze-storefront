// import Overview from "@/components/BuildYourPutter/Overview";
// import MaterialSection from "@/components/BuildYourPutter/MaterialSection";
// import StepSelector from "@/components/BuildYourPutter/StepSelector";
// import StepReview from "@/components/BuildYourPutter/StepReview";
// import StepCheckout from "@/components/BuildYourPutter/StepCheckout";
import {BuildProvider} from "@/components/BuildYourPutter/BuildContext";
import "@/components/BuildYourPutter/build-your-putter.css";
import WizardBuilder from "@/components/BuildYourPutter/WizardBuilder";
import {Suspense} from "react";

export default function BuildYourPutterPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
      <BuildProvider>
        <WizardBuilder />
      </BuildProvider>
    </Suspense>
  );
}
