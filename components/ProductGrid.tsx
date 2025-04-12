"use client";

import {Product} from "@/types/product";

export default function ProductGrid({products}: {products: Product[]}) {
  if (!products || products.length === 0) return <p>No products found.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "2rem",
      }}>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            padding: "1rem",
            fontFamily: "monospace",
          }}>
          {product.image ? (
            <img
              src={
                typeof product.image === "string"
                  ? product.image
                  : product.image?.url || ""
              }
              alt={product.title || "Product image"}
              style={{width: "100%", height: "auto", marginBottom: "1rem"}}
            />
          ) : (
            <div style={{height: "300px", background: "#ccc"}} />
          )}
          <h2>{product.title}</h2>
          <p>{product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
