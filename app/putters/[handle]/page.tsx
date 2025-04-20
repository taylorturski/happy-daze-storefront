"use client";

import {useState, useEffect} from "react";
import {useParams, useRouter} from "next/navigation";
import {useCart} from "@/app/context/CartContext";
import {Product} from "@/types/product";
import Image from "next/image";

export default function ProductPage() {
  const {handle} = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const {addToCart} = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${handle}`);
      const data = await res.json();
      setProduct(data);
    }

    if (handle) fetchProduct();
  }, [handle]);

  const goToBuilder = () => {
    if (!product) return;
    const shape = encodeURIComponent(product.title);
    router.push(`/build-your-putter?headshape=${shape}`);
  };

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

  if (!product) return <p className="p-8 font-pitch">Loading...</p>;

  return (
    <main className="font-pitch px-4 py-8">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Image section */}
        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
          {/* Main image */}
          <div className="flex-1">
            <Image
              src={product.images[activeImage]?.url || product.images[0].url}
              alt={product.images[activeImage]?.altText || product.title}
              width={800}
              height={600}
              className="w-full max-w-[600px] border-2 border-black object-contain"
            />
          </div>

          {/* Thumbnails - larger on both mobile and desktop */}
          <div className="flex gap-3 lg:flex-col overflow-x-auto lg:overflow-visible w-full lg:w-32">
            {product.images.map((image, i) => (
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

        {/* Info section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start">
          <h1 className="text-2xl lg:text-3xl font-bold uppercase mb-1">
            {product.title}
          </h1>
          <p className="font-vt lowercase text-lg mb-4">
            Starting at ${parseFloat(product.price).toFixed(2)}
          </p>

          {product.description && (
            <div
              className="text-sm leading-relaxed mb-6"
              dangerouslySetInnerHTML={{__html: product.description}}
            />
          )}

          <div className="mt-5 border-t-2 border-black pt-6">
            <h2 className="uppercase text-sm font-bold mb-2">Customization</h2>
            <p className="text-sm text-gray-700">
              [Customization form goes here — coming soon.]
            </p>
          </div>

          {product.tags?.includes("blanks") ? (
            <button
              onClick={goToBuilder}
              className="border-2 font-vt lowercase border-black mt-3 px-4 py-2 font-bold text-black bg-white w-fit">
              Customize
            </button>
          ) : (
            <button
              onClick={onAddToCart}
              className="border-2 font-vt lowercase border-black mt-3 px-4 py-2 font-bold text-white bg-black w-fit">
              {added ? "✓ Added" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
