// import Overview from "@/components/BuildYourPutter/Overview";
// import MaterialSection from "@/components/BuildYourPutter/MaterialSection";
// import StepSelector from "@/components/BuildYourPutter/StepSelector";
// import StepReview from "@/components/BuildYourPutter/StepReview";
// import StepCheckout from "@/components/BuildYourPutter/StepCheckout";
import {BuildProvider} from "@/components/BuildYourPutter/BuildContext";
import "@/components/BuildYourPutter/build-your-putter.css";
import WizardBuilder from "@/components/BuildYourPutter/WizardBuilder";
import {Suspense} from "react";
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Build Your Putter | Happy Daze Golf",
    description:
      "Start from scratch and design your own custom putter. Choose headshape, finish, milling, neck, and stamping options.",
    openGraph: {
      title: "Build Your Putter | Happy Daze Golf",
      description:
        "Start from scratch and design your own custom putter. Choose headshape, finish, milling, neck, and stamping options.",
      images: [
        {
          url: "https://www.happydaze.golf/og/build.png",
          width: 1200,
          height: 630,
          alt: "Build Your Putter - Happy Daze Golf",
        },
      ],
      url: "https://www.happydaze.golf/build-your-putter",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Build Your Putter | Happy Daze Golf",
      description:
        "Start from scratch and design your own custom putter. Choose headshape, finish, milling, neck, and stamping options.",
      images: ["https://www.happydaze.golf/og/build.png"],
    },
  };
}

export default function BuildYourPutterPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
      <BuildProvider>
        <WizardBuilder />
      </BuildProvider>
    </Suspense>
  );
}
