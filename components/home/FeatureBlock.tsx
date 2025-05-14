import Link from "next/link";
import Image from "next/image";
import {Product} from "@/types/product";

type FeatureBlockProps = {
  lines: string[];
  cta: {
    label: string;
    href: string;
  };
  products: Product[];
};

export default function FeatureBlock({
  lines,
  cta,
  products,
}: FeatureBlockProps) {
  const product = products[0];
  if (!product) return null;

  const image = product.images?.[0];

  return (
    <section className="w-full bg-transparent text-white font-pitch py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex justify-center">
          {image && (
            <div className="w-[350px] h-[350px] flex justify-center items-center">
              <Image
                src={image.url}
                alt={image.altText || product.title}
                width={400}
                height={400}
                loading="lazy"
                quality={100}
                className="object-center object-contain"
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-6 text-center lg:text-left">
          {lines.map((line, i) => (
            <p
              key={i}
              className="text-xl sm:text-3xl font-bold uppercase tracking-tight mb-2">
              {line}
            </p>
          ))}

          <p className="text-base sm:text-lg text-white mb-2">
            {product.title}
          </p>

          <Link
            href={cta.href}
            className="inline-block mt-3 border-black px-5 py-2 bg-white text-black font-vt uppercase text-md tracking-wider">
            {cta.label}
          </Link>

          <div className="mt-4">
            <p className="text-base sm:text-lg lg:text-sm text-white">
              ${product.price}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
