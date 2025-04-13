import {getProductsByTag} from "@/lib/shopify/product";
import {Product} from "@/types/product";
import Link from "next/link";
import PageSection from "@/components/PageSection";

export default async function CustomShopPage() {
  const products = await getProductsByTag("blanks");

  return (
    <PageSection title="Custom Shop">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 font-mono">
        {products.map((product: Product) => (
          <div key={product.id} className="border-2 border-black p-4">
            {product.image ? (
              <img
                src={product.image.url}
                alt={product.image.altText || product.title}
                className="w-full h-auto mb-4"
              />
            ) : (
              <div className="h-[300px] bg-gray-300 mb-4" />
            )}
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-sm">{product.price}</p>
            <Link href={`/putters/${product.handle}`} className="underline">
              Customize →
            </Link>
          </div>
        ))}
      </div>
    </PageSection>
  );
}
