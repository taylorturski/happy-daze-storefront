"use client";

import React from "react";
import Link from "next/link";
import {Product} from "@/types/product";
import {useCart} from "@/app/context/CartContext";
import Image from "next/image";

interface ProductGridProps {
  products: Product[];
}

function ProductGrid({products}: ProductGridProps) {
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
            <Link
              href={
                product.tags?.includes("hats")
                  ? `/merch/${product.handle}`
                  : `/putters/${product.handle}`
              }
              className="no-underline">
              {firstImage ? (
                <Image
                  src={firstImage.url}
                  alt={firstImage.altText || product.title}
                  width={600}
                  height={600}
                  className="w-full h-auto mb-4 border border-black"
                  loading="lazy"
                  quality={60}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              ) : (
                <div className="h-[300px] bg-gray-300 mb-4" />
              )}
              <h2 className="text-lg font-bold">{product.title}</h2>
              <p className="font-vt lowercase text-md">
                {product.price ? (
                  <>
                    <span className="font-pitch text-sm">Starting at</span> $
                    {parseFloat(product.price).toFixed(2)}
                  </>
                ) : (
                  "Price unavailable"
                )}
              </p>
            </Link>
            {!product.tags?.includes("blanks") && (
              <button
                onClick={() =>
                  addToCart({
                    lineId: product.variants?.[0]?.id || product.id, // fallback to product.id if no variants
                    id: product.variants?.[0]?.id || product.id,
                    title: product.title,
                    price: parseFloat(
                      product.variants?.[0]?.price.split(" ")[0] ||
                        product.price
                    ),
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

export default React.memo(ProductGrid);
