import {getProductsByTag} from "@/lib/shopify/product";
import PageSection from "@/components/PageSection";
import ProductGrid from "@/components/ProductGrid";

export async function generateMetadata() {
  return {
    title: "Custom Putters | Happy Daze Golf",
    description:
      "This is where it starts. Choose your blank. Choose your story. Hand-stamped putters built with intention — no performance gimmicks.",
    openGraph: {
      title: "Custom Putters | Happy Daze Golf",
      description:
        "This is where it starts. Choose your blank. Choose your story. Hand-stamped putters built with intention — no performance gimmicks.",
      url: "https://www.happydaze.golf/custom-putters",
      images: [
        {
          url: "/og/custom-shop.jpg",
          width: 1200,
          height: 630,
          alt: "Custom Putters - Happy Daze Golf",
        },
      ],
    },
  };
}

export default async function CustomShopPage() {
  const products = await getProductsByTag("blanks");

  return (
    <PageSection title="Custom Putters">
      <p className="text-md mb-8 font-pitch">
        No pressure. Pick the head shape. We’ll take care of the rest.
      </p>
      <ProductGrid products={products} />
    </PageSection>
  );
}
