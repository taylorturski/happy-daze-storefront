import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = "https://www.happydaze.golf";

  const staticPaths = [
    "",
    "/about",
    "/contact",
    "/custom-putters",
    "/journal",
    "/gallery",
    "/build-your-putter",
  ];

  let productPaths: string[] = [];
  let articlePaths: string[] = [];

  try {
    const productRes = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });
    if (productRes.ok) {
      const products = await productRes.json();
      productPaths = products.map(
        (p: {handle: string}) => `/putters/${p.handle}`
      );
    }
  } catch {
    // Handle error silently
  }

  try {
    const articleRes = await fetch(`${baseUrl}/api/blog`, {cache: "no-store"});
    if (articleRes.ok) {
      const articles = await articleRes.json();
      articlePaths = articles.map(
        (a: {handle: string}) => `/journal/${a.handle}`
      );
    }
  } catch {
    // Handle error silently
  }

  const allPaths = [...staticPaths, ...productPaths, ...articlePaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths.map((path) => `<url><loc>${baseUrl}${path}</loc></url>`).join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
