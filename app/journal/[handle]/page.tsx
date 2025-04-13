import {getBlogArticleByHandle} from "@/lib/shopify/blog";
import {notFound} from "next/navigation";

type Props = {
  params: {
    handle: string;
  };
};

type Article = {
  title: string;
  contentHtml: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
};

export default async function BlogArticlePage({params}: Props) {
  const article: Article | null = await getBlogArticleByHandle(params.handle);

  if (!article) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-8 font-mono">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      {article.image && (
        <img
          src={article.image.url}
          alt={article.image.altText || article.title}
          className="w-full h-auto mb-4"
        />
      )}
      <div
        className="leading-7"
        dangerouslySetInnerHTML={{__html: article.contentHtml}}
      />
    </div>
  );
}
