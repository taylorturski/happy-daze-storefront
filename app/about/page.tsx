import {getPageByHandle} from "@/lib/shopify/pages";
import PageSection from "@/components/PageSection";

import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About | Happy Daze Golf",
    description:
      "Happy Daze didn’t start with a business plan. It started with a feeling — and a putter. A new kind of golf brand, built from scratch.",
    openGraph: {
      title: "About | Happy Daze Golf",
      description:
        "Happy Daze didn’t start with a business plan. It started with a feeling — and a putter. A new kind of golf brand, built from scratch.",
      images: [
        {
          url: "https://www.happydaze.golf/og/about.png",
          width: 1200,
          height: 630,
          alt: "About - Happy Daze Golf",
        },
      ],
      url: "https://www.happydaze.golf/about",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "About | Happy Daze Golf",
      description:
        "Happy Daze didn’t start with a business plan. It started with a feeling — and a putter. A new kind of golf brand, built from scratch.",
      images: ["https://www.happydaze.golf/og/about.png"],
    },
  };
}

export default async function AboutPage() {
  const page = await getPageByHandle("about");

  if (!page) {
    return <p>About page not found.</p>;
  }

  return (
    <PageSection title={page.title}>
      <div
        className="max-w-5xl font-pitch"
        dangerouslySetInnerHTML={{__html: page.body}}
      />
    </PageSection>
  );
}
