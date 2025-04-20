// app/workshop/page.tsx

import {getPageByHandle} from "@/lib/shopify/pages";
import PageSection from "@/components/PageSection";
import Image from "next/image";

export default async function WorkshopPage() {
  const page = await getPageByHandle("workshop");

  const imageUrls = Array.from(
    page.body.matchAll(/<img[^>]+src="([^">]+)"/g)
  ).map((match) => (match as RegExpMatchArray)[1]);

  return (
    <PageSection title="Workshop">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 mb-16">
        {imageUrls.map((src, idx) => (
          <div
            key={idx}
            className="relative w-full aspect-[4/3] border-2 border-black overflow-hidden">
            <Image
              src={src}
              alt={`Workshop Image ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={idx < 3}
            />
          </div>
        ))}
      </div>
    </PageSection>
  );
}
