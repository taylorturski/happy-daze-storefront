import dynamic from "next/dynamic";
import FullBleedImage from "@/components/home/FullBleedImage";
import SideBySide from "@/components/home/SideBySide";
import ProductGridIntro from "@/components/home/ProductGridIntro";
import {getProductsByTag} from "@/lib/shopify/product";
import {homepageContent} from "@/lib/homepageContent";

export const revalidate = 3600; // ISR: rebuild hourly

const ProductGrid = dynamic(() => import("@/components/ProductGrid"));
const QuoteRotator = dynamic(() => import("@/components/home/QuoteRotator"));
const FeatureBlock = dynamic(() => import("@/components/home/FeatureBlock"));
const StoryBlock = dynamic(() => import("@/components/home/StoryBlock"));

export default async function HomePage() {
  const products = await getProductsByTag("blanks");
  const hats = await getProductsByTag("hats");
  const {hero, origin, productGridIntro, featureBlock} = homepageContent;

  return (
    <div className="w-full max-w-screen overflow-x-hidden">
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

      <SideBySide
        imageSrc={origin.imageSrc}
        alt={origin.alt}
        title={origin.title}
        subtitle={origin.subtitle}
      />

      <ProductGridIntro
        title={productGridIntro.title}
        body={productGridIntro.body}
        cta={productGridIntro.cta}>
        <ProductGrid products={products} />
      </ProductGridIntro>

      <FeatureBlock
        lines={featureBlock.lines}
        cta={featureBlock.cta}
        products={hats}
      />

      <StoryBlock />
    </div>
  );
}
