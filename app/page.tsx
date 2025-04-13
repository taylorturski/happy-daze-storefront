"use client";

import {getProductsByTag} from "@/lib/shopify";
import ProductGrid from "@/components/ProductGrid";
import {Product} from "@/types/product";
import {useEffect, useState} from "react";

export default function HomePage({
  handleAddToCart,
}: {
  handleAddToCart: (product: Product) => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const blanks = await getProductsByTag("blanks");
      setProducts(blanks);
    }

    load();
  }, []);

  return (
    <main style={{padding: "2rem"}}>
      <h1 style={{fontFamily: "monospace"}}>Happy Daze Golf</h1>
      {products.length > 0 ? (
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
      ) : (
        <p>No blank putters found.</p>
      )}
    </main>
  );
}
