import {getProductsByTag} from "@/lib/shopify/product";
import PageSection from "@/components/PageSection";
import ProductGrid from "@/components/ProductGrid";
import type {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Custom Putters | Happy Daze Golf",
    description:
      "Milled to order. Built by hand. Our custom putters are made for expression—not mass production.",
    openGraph: {
      title: "Custom Putters | Happy Daze Golf",
      description:
        "Milled to order. Built by hand. Our custom putters are made for expression—not mass production.",
      images: [
        {
          url: "https://www.happydaze.golf/og/custom-putters.png",
          width: 1200,
          height: 630,
          alt: "Custom Putters - Happy Daze Golf",
        },
      ],
      url: "https://www.happydaze.golf/custom-putters",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Custom Putters | Happy Daze Golf",
      description:
        "Milled to order. Built by hand. Our custom putters are made for expression—not mass production.",
      images: ["https://www.happydaze.golf/og/custom-putters.png"],
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
