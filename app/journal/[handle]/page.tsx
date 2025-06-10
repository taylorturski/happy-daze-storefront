import {getBlogArticles, getBlogArticleByHandle} from "@/lib/shopify/blog";
import {notFound} from "next/navigation";
import Image from "next/image";

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
export default async function JournalArticlePage(props: Params) {
  const params = await Promise.resolve(props.params); // satisfies Next.js static analyzer
  const article = await getBlogArticleByHandle(params.handle);

  if (!article) return notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-9 text-white">
      {article.image?.url && (
        <Image
          unoptimized
          src={article.image.url}
          alt={article.image.altText || article.title}
          width={800}
          height={600}
          className="w-full h-auto mb-2"
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
