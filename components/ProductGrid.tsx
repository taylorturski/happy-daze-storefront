"use client";

import Link from "next/link";
import {Product} from "@/types/product";
import {useCart} from "@/app/context/CartContext";

export default function ProductGrid({products}: {products: Product[]}) {
  const {addToCart} = useCart();

  if (!products || products.length === 0) return <p>No products found.</p>;

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 font-pitch text-white">
      {products.map((product) => {
        const firstImage = product.images?.[0];
        return (
          <div
            key={product.id}
            className="border-2 border-black p-4 flex flex-col justify-between bg-black hover:bg-white hover:text-black transition-all duration-200 ease-in-out">
            <Link href={`/putters/${product.handle}`} className="no-underline">
              {firstImage ? (
                <img
                  src={firstImage.url}
                  alt={firstImage.altText || product.title}
                  className="w-full h-auto mb-4 border border-black"
                />
              ) : (
                <div className="h-[300px] bg-gray-300 mb-4" />
              )}
              <h2 className="text-lg font-bold">{product.title}</h2>
              <p className="text-sm">
                {product.price
                  ? `$${parseFloat(product.price).toFixed(2)}`
                  : "Price unavailable"}
              </p>
            </Link>
            {!product.tags?.includes("blanks") && (
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: parseFloat(product.price),
                    image: firstImage?.url || "",
                    quantity: 1,
                  })
                }
                className="mt-4 font-vt lowercase border-2 border-black px-3 py-1 font-bold bg-white text-black hover:bg-black hover:text-white transition-all duration-150">
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
