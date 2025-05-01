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
    <section className="w-full bg-transparent text-white font-pitch py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          {image && (
            <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] overflow-hidden">
              <Image
                src={image.url}
                alt={image.altText || product.title}
                fill
                loading="lazy"
                quality={60}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
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
            className="inline-block mt-3 border-black px-5 py-2 bg-white text-black font-vt uppercase text-md tracking-wider text-md">
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
