import {getProductsByTag} from "@/lib/shopify/product";
import {Product} from "@/types/product";
import Link from "next/link";
import PageSection from "@/components/PageSection";

export async function generateMetadata() {
  return {
    title: "Custom Shop | Happy Daze Golf",
    description:
      "This is where it starts. Choose your blank. Choose your story. Hand-stamped putters built with intention — no performance gimmicks.",
    openGraph: {
      title: "Custom Shop | Happy Daze Golf",
      description:
        "This is where it starts. Choose your blank. Choose your story. Hand-stamped putters built with intention — no performance gimmicks.",
      url: "https://www.happydazegolf.com/custom-shop",
      images: [
        {
          url: "/og/custom-shop.jpg",
          width: 1200,
          height: 630,
          alt: "Custom Shop - Happy Daze Golf",
        },
      ],
    },
  };
}

export default async function CustomShopPage() {
  const products = await getProductsByTag("blanks");

  return (
    <PageSection title="Custom Shop">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 font-mono">
        {products.map((product: Product) => {
          const firstImage = product.images?.[0];
          return (
            <div key={product.id} className="border-2 border-black p-4">
              {firstImage ? (
                <img
                  src={firstImage.url}
                  alt={firstImage.altText || product.title}
                  className="w-full h-auto mb-4"
                />
              ) : (
                <div className="h-[300px] bg-gray-300 mb-4" />
              )}
              <h2 className="text-lg font-bold">{product.title}</h2>
              <p className="text-sm">Starting at ${product.price}</p>
              <Link
                href={`/build-your-putter?headshape=${encodeURIComponent(
                  product.title
                )}`}
                className="underline">
                Customize →
              </Link>
            </div>
          );
        })}
      </div>
    </PageSection>
  );
}
