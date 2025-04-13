import {getProductsByTag} from "@/lib/shopify/product";
import ProductGrid from "@/components/ProductGrid";
import PageSection from "@/components/PageSection";

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
