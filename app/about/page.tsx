import {getPageByHandle} from "@/lib/shopify/pages";
import PageSection from "@/components/PageSection";

export async function generateMetadata() {
  return {
    title: "About | Happy Daze Golf",
    description:
      "Happy Daze didn’t start with a business plan. It started with a feeling — and a putter. A new kind of golf brand, built from scratch.",
    openGraph: {
      title: "About | Happy Daze Golf",
      description:
        "Happy Daze didn’t start with a business plan. It started with a feeling — and a putter. A new kind of golf brand, built from scratch.",
      url: "https://www.happydaze.golf/about",
      images: [
        {
          url: "/og/about.jpg",
          width: 1200,
          height: 630,
          alt: "About - Happy Daze Golf",
        },
      ],
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
