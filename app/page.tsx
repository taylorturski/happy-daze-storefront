import {getProductsByTag} from "@/lib/shopify/product";
import ProductGrid from "@/components/ProductGrid";
import PageSection from "@/components/PageSection";

export async function generateMetadata() {
  return {
    title: "Build Your Own Putter | Happy Daze Golf",
    description:
      "Happy Daze putters start as raw blanks — you choose the shape, finish, and feel. Built one-at-a-time. Stamped by hand. No two are alike.",
    openGraph: {
      title: "Build Your Own Putter | Happy Daze Golf",
      description:
        "Happy Daze putters start as raw blanks — you choose the shape, finish, and feel. Built one-at-a-time. Stamped by hand. No two are alike.",
      url: "https://www.happydazegolf.com/",
      images: [
        {
          url: "/og/home.jpg",
          width: 1200,
          height: 630,
          alt: "Custom Blanks - Happy Daze Golf",
        },
      ],
    },
  };
}

export default async function HomePage() {
  const products = await getProductsByTag("blanks");

  return (
    <PageSection title="Custom Blanks">
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p>No blank putters found.</p>
      )}
    </PageSection>
  );
}
