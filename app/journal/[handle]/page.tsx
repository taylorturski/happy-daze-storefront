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
    <article className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      {article.image?.url && (
        <Image
          src={article.image.url}
          alt={article.image.altText || article.title}
          width={1200}
          height={630}
          className="mb-6 w-full h-auto object-cover"
          priority
        />
      )}
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{__html: article.contentHtml}}
      />
    </article>
  );
}
