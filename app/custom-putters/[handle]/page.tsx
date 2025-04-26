"use client";

import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import {Product} from "@/types/product";
import {useCart} from "@/app/context/CartContext";
import Image from "next/image";

export default function CustomProductPage() {
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
      lineId: `${product.id}-${Date.now()}`,
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      image: product.images?.[0]?.url || "",
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return <p className="p-8 font-pitch">Loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-12 p-8 font-pitch">
      {/* Image gallery */}
      <div className="w-full lg:w-1/2">
        {product.images.length > 0 ? (
          <div className="flex flex-col gap-4">
            {product.images.map((image, i) => (
              <Image
                key={i}
                src={image.url}
                width={800}
                height={600}
                alt={image.altText || `${product.title} ${i + 1}`}
                className="w-full border-2 border-black"
              />
            ))}
          </div>
        ) : (
          <div className="h-[400px] w-full bg-gray-300 border-2 border-black" />
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
          className="border-2 font-vt lowercase border-black px-4 py-2 font-bold bg-black text-white hover:bg-white hover:text-black transition-all w-fit">
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
  );
}
