// app/workshop/page.tsx

import {getPageByHandle} from "@/lib/shopify/pages";
import PageSection from "@/components/PageSection";
import Image from "next/image";
import type {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Gallery | Happy Daze Golf",
    description:
      "Finished putters, unique stamps, and custom builds. A behind-the-scenes look at the work.",
    openGraph: {
      title: "Gallery | Happy Daze Golf",
      description:
        "Finished putters, unique stamps, and custom builds. A behind-the-scenes look at the work.",
      images: [
        {
          url: "https://www.happydaze.golf/og/gallery.png",
          width: 1200,
          height: 630,
          alt: "Gallery - Happy Daze Golf",
        },
      ],
      url: "https://www.happydaze.golf/gallery",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Gallery | Happy Daze Golf",
      description:
        "Finished putters, unique stamps, and custom builds. A behind-the-scenes look at the work.",
      images: ["https://www.happydaze.golf/og/gallery.png"],
    },
  };
}

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
