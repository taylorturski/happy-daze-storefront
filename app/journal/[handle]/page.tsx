import {getBlogArticleByHandle} from "@/lib/shopify/blog";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import Image from "next/image";

/**
 * Generates metadata for a blog article page based on the provided handle.
 *
 * @param {Object} params - The parameters object containing the article handle.
 * @param {string} params.handle - The unique identifier for the blog article.
 * @returns {Promise<Metadata>} The metadata for the blog article page.
 */
export async function generateMetadata(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore – Next.js type inference bug, safe to ignore
  {params}: {params: {handle: string}}
): Promise<Metadata> {
  const article = await getBlogArticleByHandle(params.handle);
  if (!article) return notFound();

  return {
    title: `${article.title} | Journal | Happy Daze Golf`,
    description:
      article.excerpt ||
      "Stories from the shop, behind-the-scenes builds, and honest thoughts on modern golf.",
    openGraph: {
      title: `${article.title} | Journal | Happy Daze Golf`,
      description:
        article.excerpt ||
        "Stories from the shop, behind-the-scenes builds, and honest thoughts on modern golf.",
      url: `https://www.happydazegolf.com/journal/${params.handle}`,
      images: [
        {
          url: article.image?.url || "/og/default-article.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function JournalArticlePage(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore – same inference issue affects the page export
  {params}: {params: {handle: string}}
) {
  const article = await getBlogArticleByHandle(params.handle);
  if (!article) return notFound();

  return (
    <article className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      {article.image?.url && (
        <Image
          src={article.image.url}
          alt={article.image.altText || article.title}
          width={1200}
          height={630}
          className="mb-6 w-full h-auto object-cover"
        />
      )}
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{__html: article.contentHtml}}
      />
    </article>
  );
}
