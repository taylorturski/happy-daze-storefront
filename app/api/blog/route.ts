import {NextResponse} from "next/server";
import {getBlogArticles} from "@/lib/shopify/blog";

export async function GET() {
  try {
    const articles = await getBlogArticles();

    interface BlogArticle {
      handle: string;
      title: string;
    }

    const minimal: BlogArticle[] = articles.map(
      (a: {handle: string; title: string}) => ({
        handle: a.handle,
        title: a.title,
      })
    );

    return NextResponse.json(minimal);
  } catch (err) {
    console.error("[API] Error fetching blog articles:", err);
    return new NextResponse("Server error", {status: 500});
  }
}
