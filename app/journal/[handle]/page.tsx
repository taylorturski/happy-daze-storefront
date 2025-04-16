import {getBlogArticleByHandle} from "@/lib/shopify/blog";
import {Metadata} from "next";
import {notFound} from "next/navigation";

type Props = {
  params: {handle: string};
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
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
