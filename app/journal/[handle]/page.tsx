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
    <div style={{maxWidth: "700px", margin: "0 auto", fontFamily: "monospace"}}>
      <h1>{article.title}</h1>
      {article.image && (
        <img
          src={article.image.url}
          alt={article.image.altText || article.title}
          style={{width: "100%", height: "auto", marginBottom: "1rem"}}
        />
      )}
      <div
        dangerouslySetInnerHTML={{__html: article.contentHtml}}
        style={{lineHeight: "1.6rem"}}
      />
    </div>
  );
}
