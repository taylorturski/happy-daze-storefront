import Link from "next/link";
import {getBlogArticles} from "@/lib/shopify/blog";
import {BlogArticle} from "@/types/blogs";
import PageSection from "@/components/PageSection";

export async function generateMetadata() {
  return {
    title: "Journal | Happy Daze Golf",
    description:
      "Stories from the bench, experiments in the shop, and honest thoughts on modern golf culture. No hype. Just real.",
    openGraph: {
      title: "Journal | Happy Daze Golf",
      description:
        "Stories from the bench, experiments in the shop, and honest thoughts on modern golf culture. No hype. Just real.",
      url: "https://www.happydazegolf.com/journal",
      images: [
        {
          url: "/og/journal.jpg",
          width: 1200,
          height: 630,
          alt: "Journal - Happy Daze Golf",
        },
      ],
    },
  };
}

export default async function JournalPage() {
  const articles: BlogArticle[] = await getBlogArticles();

  return (
    <PageSection title="Journal">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.handle}
            href={`/journal/${article.handle}`}
            className="border-2 border-black p-4 no-underline text-white hover:text-black font-mono hover:bg-gray-100 transition">
            {article.image ? (
              <img
                src={article.image.url}
                alt={article.image.altText || article.title}
                className="w-full h-auto mb-4"
              />
            ) : (
              <div className="h-[200px] bg-gray-300 mb-4" />
            )}
            <h2 className="mb-2 text-lg font-bold">{article.title}</h2>
            <p className="text-sm">{article.excerpt}</p>
            <p className="font-bold mt-4">Read More →</p>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
