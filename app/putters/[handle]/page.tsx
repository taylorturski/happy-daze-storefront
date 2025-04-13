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
      image: product.images?.[0]?.url || "",
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return <p className="p-8 font-mono">Loading...</p>;

  return (
    <div className="font-mono px-4 py-8">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Image section */}
        <div className="w-full lg:w-1/2">
          {product.images.length > 0 ? (
            <div className="flex flex-col gap-4 lg:max-h-[90vh] lg:overflow-y-scroll lg:pr-2 scrollbar-hide">
              {product.images.map((image, i) => (
                <img
                  key={i}
                  src={image.url}
                  alt={image.altText || `${product.title} ${i + 1}`}
                  className="w-full max-w-[500px] border-2 border-black"
                />
              ))}
            </div>
          ) : (
            <div className="h-[500px] w-full bg-gray-300 border-2 border-black" />
          )}
        </div>

        {/* Info section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start">
          <h1 className="text-2xl lg:text-3xl font-bold uppercase mb-4">
            {product.title}
          </h1>
          <p className="text-lg mb-6">${product.price}</p>

          <button
            onClick={onAddToCart}
            className="border-2 border-black px-4 py-2 font-bold bg-black text-white hover:bg-white hover:text-black transition-all w-fit">
            {added ? "✓ Added" : "Add to Cart"}
          </button>

          <div className="mt-10 border-t-2 border-black pt-6">
            <h2 className="uppercase text-sm font-bold mb-2">Customization</h2>
            <p className="text-sm text-gray-700">
              [Customization form goes here — coming soon.]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
