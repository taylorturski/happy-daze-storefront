"use client";

import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import {useCart} from "@/app/context/CartContext";
import {Product} from "@/types/product";

export default function ProductPage() {
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

  const onAddToCart = async () => {
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

  if (!product) return <p className="p-8 font-mono">Loading...</p>;

  return (
    <div className="p-8 font-mono">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      {product.image && (
        <img
          src={
            typeof product.image === "string"
              ? product.image
              : product.image.url
          }
          alt={product.title}
          className="w-full max-w-2xl mb-4"
        />
      )}
      <p className="text-lg mb-4">{product.price}</p>

      <button
        onClick={onAddToCart}
        className="mt-4 border-2 border-black px-4 py-2 font-bold bg-black text-white">
        {added ? "✓ Added" : "Add to Cart"}
      </button>

      <p className="mt-8 text-sm">[Customization form goes here]</p>
    </div>
  );
}
