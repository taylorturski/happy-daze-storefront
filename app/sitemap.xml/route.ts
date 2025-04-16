import {NextResponse} from "next/server";

export async function GET() {
  const baseUrl = "https://www.happydazegolf.com";

  // Static pages to include
  const staticPaths = [
    "",
    "/about",
    "/contact",
    "/custom-shop",
    "/journal",
    "/workshop",
    "/build-your-putter",
  ];

  // Fetch products
  let productPaths: string[] = [];
  try {
    const productRes = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (productRes.ok) {
      const products = await productRes.json();
      productPaths = products.map((p: any) => `/putters/${p.handle}`);
    } else {
      console.warn("Product fetch failed:", await productRes.text());
    }
  } catch (err) {
    console.error("Error fetching products:", err);
  }

  // Fetch blog articles
  let articlePaths: string[] = [];
  try {
    const articleRes = await fetch(`${baseUrl}/api/blog`, {
      cache: "no-store",
    });

    if (articleRes.ok) {
      const articles = await articleRes.json();
      articlePaths = articles.map((a: any) => `/journal/${a.handle}`);
    } else {
      console.warn("Blog fetch failed:", await articleRes.text());
    }
  } catch (err) {
    console.error("Error fetching articles:", err);
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
