import {getProductsByTag} from "@/lib/shopify";
import ProductGrid from "@/components/ProductGrid";

export default async function HomePage() {
  const products = await getProductsByTag("blanks");

  return (
    <main style={{padding: "2rem"}}>
      <h1 style={{fontFamily: "monospace"}}>Happy Daze Golf</h1>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p>No blank putters found.</p>
      )}
    </main>
  );
}
