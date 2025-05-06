import dynamic from "next/dynamic";
import FullBleedImage from "@/components/home/FullBleedImage";
import SideBySide from "@/components/home/SideBySide";
import ProductGridIntro from "@/components/home/ProductGridIntro";
import {getProductsByTag} from "@/lib/shopify/product";
import {homepageContent} from "@/lib/homepageContent";

import type {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Home | Happy Daze Golf",
    description:
      "Refuse the ordinary. Custom putters & lifestyle gear built for expression, not performance claims.",
    openGraph: {
      title: "Home | Happy Daze Golf",
      description:
        "Refuse the ordinary. Custom putters & lifestyle gear built for expression, not performance claims.",
      images: [
        {
          url: "https://www.happydaze.golf/og/default.png",
          width: 1200,
          height: 630,
          alt: "Happy Daze Golf OG Image",
        },
      ],
      url: "https://www.happydaze.golf",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Home | Happy Daze Golf",
      description:
        "Refuse the ordinary. Custom putters & lifestyle gear built for expression, not performance claims.",
      images: ["https://www.happydaze.golf/og/default.png"],
    },
  };
}

export const revalidate = 3600;

const ProductGrid = dynamic(() => import("@/components/ProductGrid"));
const QuoteRotator = dynamic(() => import("@/components/home/QuoteRotator"));
const FeatureBlock = dynamic(() => import("@/components/home/FeatureBlock"));
const StoryBlock = dynamic(() => import("@/components/home/StoryBlock"));

export default async function HomePage() {
  const products = await getProductsByTag("blanks");
  const hats = await getProductsByTag("hats");
  const {hero, origin, productGridIntro, featureBlock} = homepageContent;

  return (
    <div className="w-full max-w-screen overflow-x-hidden mx-auto">
      <FullBleedImage imageSrc={hero.imageSrc} alt={hero.alt} priority>
        {hero.lines.map((line, index) =>
          index === 0 ? (
            <h1 key={line} className="text-2xl md:text-4xl leading-snug">
              {line}
            </h1>
          ) : (
            <p key={line} className="text-2xl md:text-4xl leading-snug">
              {line}
            </p>
          )
        )}
      </FullBleedImage>

      <QuoteRotator />
      <SideBySide {...origin} />
      <ProductGridIntro {...productGridIntro}>
        <ProductGrid products={products} />
      </ProductGridIntro>
      <FeatureBlock {...featureBlock} products={hats} />
      <StoryBlock />
    </div>
  );
}
