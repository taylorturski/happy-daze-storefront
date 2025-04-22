import {getProductsByTag} from "@/lib/shopify/product";
import ProductGrid from "@/components/ProductGrid";

export const revalidate = 3600; // ISR cache for 1 hour

export default async function MerchPage() {
  const products = await getProductsByTag("hats");

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold uppercase mb-6">Merch</h1>
      <ProductGrid products={products} />
    </section>
  );
}
