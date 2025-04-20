import FullBleedImage from "@/components/home/FullBleedImage";
import SideBySide from "@/components/home/SideBySide";
import ProductGridIntro from "@/components/home/ProductGridIntro";
import ProductGrid from "@/components/ProductGrid";
import FeatureBlock from "@/components/home/FeatureBlock";
import QuoteRotator from "@/components/home/QuoteRotator";
import StoryBlock from "@/components/home/StoryBlock";
import {getProductsByTag} from "@/lib/shopify/product";
import {homepageContent} from "@/lib/homepageContent";

export default async function HomePage() {
  const products = await getProductsByTag("blanks");
  const hats = await getProductsByTag("hats");
  const {hero, origin, productGridIntro, featureBlock} = homepageContent;

  return (
    <main className="w-full overflow-x-hidden">
      <FullBleedImage imageSrc={hero.imageSrc} alt={hero.alt}>
        {hero.lines.map((line, index) => (
          <p
            key={index}
            className="text-xl sm:text-3xl uppercase font-pitch font-medium mt-2">
            {line}
          </p>
        ))}
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
    </main>
  );
}
