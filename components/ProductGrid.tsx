"use client";

import {useEffect, useState} from "react";
import {Product} from "@/types/product";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const addToCart = async (product: Product) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to add product to cart");
    } else {
      console.log("Product added to cart");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (!products || products.length === 0) return <p>No products found.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "2rem",
      }}>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "2px solid black",
            padding: "1rem",
            fontFamily: "monospace",
          }}>
          {product.image ? (
            <img
              src={product.image.url}
              alt={product.image.altText || product.title}
              style={{width: "100%", height: "auto", marginBottom: "1rem"}}
            />
          ) : (
            <div style={{height: "300px", background: "#ccc"}} />
          )}
          <h2>{product.title}</h2>
          <p>{product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
