"use client";

import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import {Product} from "@/types/product";
import {useCart} from "@/app/context/CartContext";

export default function PutterPage() {
  const {handle} = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);
  const {addToCart} = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${handle}`);
      const data = await res.json();
      setProduct(data);
    }

    if (handle) fetchProduct();
  }, [handle]);

  const onAdd = async () => {
    if (!product) return;
    await addToCart({
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      image:
        typeof product.image === "string"
          ? product.image
          : product.image?.url || "",
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return <p style={{padding: "2rem"}}>Loading...</p>;

  return (
    <div style={{padding: "2rem", fontFamily: "monospace"}}>
      <h1>{product.title}</h1>
      {product.image && (
        <img
          src={
            typeof product.image === "string"
              ? product.image
              : product.image.url
          }
          alt={product.title}
          style={{width: "100%", maxWidth: "600px", marginBottom: "1rem"}}
        />
      )}
      <p>{product.price}</p>
      <button
        onClick={onAdd}
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
