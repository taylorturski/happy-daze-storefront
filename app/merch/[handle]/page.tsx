"use client";

import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import {useCart} from "@/app/context/CartContext";
import {Product} from "@/types/product";
import Image from "next/image";
import parse from "html-react-parser";
import AddToCartButton from "@/components/AddToCartButton";
import productDescriptions from "@/components/product/data/productDescriptions";

function triggerCartFeedback(e: React.MouseEvent) {
  const rect = (e.target as HTMLElement).getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top;
  window.dispatchEvent(
    new CustomEvent("add-to-cart-feedback", {detail: {x, y}})
  );
}

export default function MerchProductPage() {
  const {handle} = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const {addToCart} = useCart();

  // 1) Fetch the product by handle
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${handle}`);
      if (!res.ok) return;
      const data = await res.json();
      if (!data?.id) return;
      setProduct(data);
    }
    if (handle) fetchProduct();
  }, [handle]);

  // 2) Derive a description key from the product title
  //    eg. "Happy Canvas Head Cover" → "happy-canvas-head-cover"
  const descriptionKey =
    product?.title.trim().toLowerCase().replace(/\s+/g, "-") || "";
  // 3) Look up the HTML snippet
  const customHTML = productDescriptions[descriptionKey]?.html;

  // 4) Add to cart handler
  const onAddToCart = async () => {
    if (!product) return;
    const variant = product.variants?.[0];
    const id = variant?.id || product.id;
    const price = parseFloat(variant?.price?.split(" ")[0] || product.price);
    await addToCart({
      lineId: `${id}-${Date.now()}`,
      id,
      title: product.title,
      price,
      image: product.images?.[0]?.url || "",
      quantity: 1,
    });
  };

  if (!product) {
    return <p className="p-8 font-pitch">Loading...</p>;
  }

  return (
    <div className="font-pitch px-4 py-8">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Image gallery */}
        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Image
              src={
                product.images?.[activeImage]?.url ||
                product.images?.[0]?.url ||
                "/placeholder-image.jpg"
              }
              alt={
                product.images?.[activeImage]?.altText ||
                product.title ||
                "Product Image"
              }
              width={800}
              height={600}
              className="w-full border-2 border-black object-contain"
            />
          </div>
          <div className="flex gap-3 lg:flex-col overflow-x-auto lg:overflow-visible w-full lg:w-32">
            {product.images?.map((img, i) => (
              <Image
                key={i}
                src={img.url}
                alt={img.altText || `${product.title} ${i + 1}`}
                width={800}
                height={600}
                className={`w-24 h-24 lg:w-full lg:h-28 object-contain border-2 cursor-pointer transition ${
                  i === activeImage
                    ? "border-black"
                    : "border-transparent hover:border-gray-400"
                }`}
                onClick={() => setActiveImage(i)}
              />
            ))}
          </div>
        </div>

        {/* Info section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start">
          <h1 className="text-2xl lg:text-3xl font-bold uppercase mb-1">
            {product.title}
          </h1>
          <p className="font-vt uppercase text-lg mb-4">
            ${parseFloat(product.price).toFixed(2)}
          </p>

          {/* DESCRIPTION FROM CODE */}
          {customHTML && (
            <div className="text-sm leading-relaxed mb-6 prose prose-invert max-w-none list-disc pl-4 marker:text-white">
              {parse(customHTML)}
            </div>
          )}

          {/* ADD TO CART */}
          <AddToCartButton
            id={product.variants?.[0]?.id || product.id}
            title={product.title}
            price={parseFloat(
              product.variants?.[0]?.price?.split(" ")[0] || product.price
            )}
            image={product.images?.[0]?.url || ""}
            onClick={(e: React.MouseEvent) => {
              triggerCartFeedback(e);
              onAddToCart();
            }}
          />
        </div>
      </div>
    </div>
  );
}
