"use client";

import {useState, useEffect} from "react";
import {useParams, useRouter} from "next/navigation";
import {useCart} from "@/app/context/CartContext";
import {Product} from "@/types/product";
import Image from "next/image";
import productDescriptions from "@/components/product/data/productDescriptions";
import parse from "html-react-parser";

function triggerCartFeedback(e: React.MouseEvent) {
  const rect = (e.target as HTMLElement).getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top;
  window.dispatchEvent(
    new CustomEvent("add-to-cart-feedback", {detail: {x, y}})
  );
}

export default function ProductPage() {
  const {handle} = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const {addToCart} = useCart();

  // Fetch product data
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

  // Analytics: view_item
  useEffect(() => {
    if (!product) return;
    window.gtag?.("event", "view_item", {
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          price: parseFloat(product.price),
          item_category: product.tags?.[0] || "Other",
        },
      ],
    });
  }, [product]);

  // Add to cart
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

  if (!product) {
    return <p className="p-8 font-pitch">Loading...</p>;
  }

  // Normalize the product title to match your description keys
  const key = product.title.trim().toLowerCase().replace(/\s+/g, "-");

  // Grab the HTML description if it exists
  const customHTML = productDescriptions[key]?.html;

  // Builder redirect for blanks
  const goToBuilder = () => {
    if (!product) return;
    const shape = encodeURIComponent(product.title);
    router.push(`/build-your-putter?headshape=${shape}`);
  };

  return (
    <div className="font-pitch px-4 py-8">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Images */}
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
              className="w-full max-w-[600px] border-2 border-black object-contain"
            />
          </div>
          <div className="flex gap-3 lg:flex-col overflow-x-auto lg:overflow-visible w-full lg:w-32">
            {product.images?.map((image, i) => (
              <Image
                key={i}
                src={image.url}
                alt={image.altText || `${product.title} ${i + 1}`}
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

        {/* Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start">
          <h1 className="text-2xl lg:text-3xl font-bold uppercase mb-1">
            {product.title}
          </h1>
          <p className="font-vt lowercase text-lg mb-4">
            <span className="text-sm font-pitch">Starting at</span> $
            {parseFloat(product.price).toFixed(2)}
          </p>

          {/* Custom description */}
          {customHTML && (
            <div className="text-sm leading-relaxed mb-6 prose prose-invert max-w-none list-disc pl-4 marker:text-white">
              {parse(customHTML)}
            </div>
          )}

          {/* Button: customize or add to cart */}
          {product.tags?.includes("blanks") ? (
            <button
              onClick={goToBuilder}
              className="border-2 font-vt uppercase tracking-wide border-black mt-3 px-4 py-2 font-bold text-black bg-white w-fit">
              Customize
            </button>
          ) : (
            <button
              onClick={(e) => {
                triggerCartFeedback(e);
                onAddToCart();
              }}
              className={`border-2 font-vt lowercase border-black mt-3 px-4 py-2 font-bold text-white bg-black w-fit ${
                added ? "bg-[#ACFF9B] text-white border-[#ACFF9B]" : ""
              }`}>
              {added ? "✓ Added" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
