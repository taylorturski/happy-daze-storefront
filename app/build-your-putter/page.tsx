import Overview from "@/components/BuildYourPutter/Overview";
// import MaterialSection from "@/components/BuildYourPutter/MaterialSection";
// import StepSelector from "@/components/BuildYourPutter/StepSelector";
import StepReview from "@/components/BuildYourPutter/StepReview";
import StepCheckout from "@/components/BuildYourPutter/StepCheckout";
import {BuildProvider} from "@/components/BuildYourPutter/BuildContext";
import "@/components/BuildYourPutter/build-your-putter.css";
import WizardBuilder from "@/components/BuildYourPutter/WizardBuilder";

export async function generateMetadata() {
  return {
    title: "Build Your Putter | Happy Daze Golf",
    description:
      "Choose every detail of your next gamer — head shape, material, finish, milling, neck, alignment. No tech gimmicks. Just personality.",
    openGraph: {
      title: "Build Your Putter | Happy Daze Golf",
      description:
        "Choose every detail of your next gamer — head shape, material, finish, milling, neck, alignment. No tech gimmicks. Just personality.",
      url: "https://www.happydazegolf.com/build-your-putter",
      images: [
        {
          url: "/og/build.jpg",
          width: 1200,
          height: 630,
          alt: "Build Your Putter - Happy Daze Golf",
        },
      ],
    },
  };
}

export default function BuildYourPutterPage() {
  return (
    <BuildProvider>
      <main className="font-pitch text-white bg-transparent px-[20px]">
        <WizardBuilder />
      </main>
    </BuildProvider>
  );
}
