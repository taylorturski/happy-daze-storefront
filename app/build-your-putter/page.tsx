import Overview from "@/components/BuildYourPutter/Overview";
import MaterialComparison from "@/components/BuildYourPutter/MaterialComparison";
import StepSelector from "@/components/BuildYourPutter/StepSelector";
import StepReview from "@/components/BuildYourPutter/StepReview";
import StepCheckout from "@/components/BuildYourPutter/StepCheckout";
import "@/components/BuildYourPutter/build-your-putter.css";

export default function BuildYourPutterPage() {
  return (
    <main className="font-mono text-white bg-black">
      <Overview />
      <MaterialComparison />
      <StepSelector step="headshape" />
      <StepSelector step="finish" />
      <StepSelector step="face" />
      <StepSelector step="neck" />
      <StepSelector step="alignment" />
      <StepReview />
      <StepCheckout />
    </main>
  );
}
