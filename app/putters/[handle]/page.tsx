"use client";

import {useState} from "react";
import {useParams} from "next/navigation";
import {Product} from "@/types/product";
import {useEffect} from "react";

export default function PutterPage() {
  const {handle} = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);

  // fetch product client-side (since we're using useParams here)
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${handle}`);
      const data = await res.json();
      setProduct(data);
    }

    if (handle) fetchProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;

    const payload = {
      id: product.id,
      title: product.title,
      price: product.price,
      image:
        typeof product.image === "string"
          ? product.image
          : product.image?.url || "",
    };

    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (!product) return <p style={{padding: "2rem"}}>Loading...</p>;

  return (
    <div style={{padding: "2rem", fontFamily: "monospace"}}>
      <h1>{product.title}</h1>
      {product.image ? (
        <img
          src={
            typeof product.image === "string"
              ? product.image
              : product.image?.url || ""
          }
          alt={product.title}
          style={{width: "100%", maxWidth: "600px", marginBottom: "1rem"}}
        />
      ) : (
        <div style={{height: "300px", background: "#ccc"}} />
      )}
      <p>{product.price}</p>

      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          fontWeight: "bold",
          backgroundColor: "#000",
          color: "#fff",
          border: "2px solid black",
        }}>
        {added ? "✓ Added" : "Add to Cart"}
      </button>

      <p style={{marginTop: "2rem"}}>[Customization form goes here]</p>
    </div>
  );
}
