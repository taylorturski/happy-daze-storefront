import {getProductsByTag} from "@/lib/shopify/product";
import ProductGrid from "@/components/ProductGrid";
import type {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Merch | Happy Daze Golf",
    description:
      "Hats, stickers, headcovers, and lifestyle drops from the Happy Daze garage.",
    openGraph: {
      title: "Merch | Happy Daze Golf",
      description:
        "Hats, stickers, headcovers, and lifestyle drops from the Happy Daze garage.",
      images: [
        {
          url: "https://www.happydaze.golf/og/merch.png",
          width: 1200,
          height: 630,
          alt: "Merch - Happy Daze Golf",
        },
      ],
      url: "https://www.happydaze.golf/merch",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Merch | Happy Daze Golf",
      description:
        "Hats, stickers, headcovers, and lifestyle drops from the Happy Daze garage.",
      images: ["https://www.happydaze.golf/og/merch.png"],
    },
  };
}

export const revalidate = 3600; // ISR cache for 1 hour

export default async function MerchPage() {
  const products = await getProductsByTag("hats");

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold uppercase mb-6">Merch</h1>
      <ProductGrid products={products} />
    </section>
  );
}
