import {getProductsByTag} from "@/lib/shopify";
import ProductGrid from "@/components/ProductGrid";

export default async function HomePage() {
  const blanks = await getProductsByTag("blanks");

  return (
    <main style={{padding: "2rem"}}>
      <h1 style={{fontFamily: "monospace"}}>Happy Daze Golf</h1>
      {blanks.length > 0 ? (
        <ProductGrid products={blanks} />
      ) : (
        <p>No blank putters found.</p>
      )}
    </main>
  );
}
