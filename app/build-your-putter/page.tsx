import Overview from "@/components/BuildYourPutter/Overview";
import MaterialSection from "@/components/BuildYourPutter/MaterialSection";
import StepSelector from "@/components/BuildYourPutter/StepSelector";
import StepReview from "@/components/BuildYourPutter/StepReview";
import StepCheckout from "@/components/BuildYourPutter/StepCheckout";
import {BuildProvider} from "@/components/BuildYourPutter/BuildContext";
import "@/components/BuildYourPutter/build-your-putter.css";

export default function BuildYourPutterPage() {
  return (
    <BuildProvider>
      <main className="font-mono text-white bg-black">
        <Overview />
        <MaterialSection />
        <StepSelector step="headshape" />
        <StepSelector step="finish" />
        <StepSelector step="face" />
        <StepSelector step="neck" />
        <StepSelector step="alignment" />
        <StepReview />
        <StepCheckout />
      </main>
    </BuildProvider>
  );
}
