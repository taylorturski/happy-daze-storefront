import {getBlogArticles, getBlogArticleByHandle} from "@/lib/shopify/blog";
import {notFound} from "next/navigation";
import Image from "next/image";
import type {Metadata} from "next";

type Params = {
  params: Promise<{
    handle: string;
  }>;
};

export async function generateStaticParams() {
  const articles = await getBlogArticles();
  return articles.map((article: {handle: string}) => ({
    handle: article.handle,
  }));
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const article = await getBlogArticleByHandle(params.handle);

  if (!article) return {};

  return {
    title: article.title,
    description:
      article.excerpt ||
      "Stories from the Happy Daze garage. Building putters and a brand from the ground up.",
    openGraph: {
      title: article.title,
      description:
        article.excerpt ||
        "Stories from the Happy Daze garage. Building putters and a brand from the ground up.",
      url: `https://happydaze.golf/journal/${article.handle}`,
      type: "article",
      images: [
        {
          url:
            article.image?.url || "https://happydaze.golf/og/default-blog.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description:
        article.excerpt ||
        "Stories from the Happy Daze garage. Building putters and a brand from the ground up.",
      images: [
        article.image?.url || "https://happydaze.golf/og/default-blog.png",
      ],
    },
  };
}

export default async function JournalArticlePage(props: Params) {
  const params = await props.params;
  const article = await getBlogArticleByHandle(params.handle);

  if (!article) return notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-9 text-white">
      {article.image?.url && (
        <Image
          src={article.image.url}
          alt={article.image.altText || article.title}
          width={1000}
          height={430}
          className="mb-6 w-full h-[450px] object-cover"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{__html: article.contentHtml}}
      />
    </article>
  );
}
