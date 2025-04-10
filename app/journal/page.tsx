// app/journal/page.tsx
import {getBlogArticles} from "@/lib/shopify";
import {Article} from "@/types/article";

export default async function JournalPage() {
  const articles: Article[] = await getBlogArticles();

  return (
    <div>
      <h1>Journal</h1>
      {articles.map((article) => (
        <div key={article.id} style={{marginBottom: "2rem"}}>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
          <p style={{fontSize: "0.9rem", color: "#666"}}>
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
