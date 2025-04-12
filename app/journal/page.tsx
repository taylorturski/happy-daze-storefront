import Link from "next/link";
import {getBlogArticles} from "@/lib/shopify";
import {BlogArticle} from "@/types/blogs";

export default async function JournalPage() {
  const articles: BlogArticle[] = await getBlogArticles();

  return (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      }}>
      {articles.map((article) => (
        <Link
          key={article.handle}
          href={`/journal/${article.handle}`}
          style={{
            border: "2px solid black",
            padding: "1rem",
            fontFamily: "monospace",
            color: "inherit",
            textDecoration: "none",
          }}>
          {article.image ? (
            <img
              src={article.image.url}
              alt={article.image.altText || article.title}
              style={{width: "100%", height: "auto", marginBottom: "1rem"}}
            />
          ) : (
            <div
              style={{
                height: "200px",
                background: "#ccc",
                marginBottom: "1rem",
              }}
            />
          )}
          <h2 style={{marginBottom: "0.5rem"}}>{article.title}</h2>
          <p style={{fontSize: "0.9rem"}}>{article.excerpt}</p>
          <p style={{fontWeight: "bold", marginTop: "1rem"}}>Read More →</p>
        </Link>
      ))}
    </div>
  );
}
