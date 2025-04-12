import {getProductsByTag} from "@/lib/shopify";
import {Product} from "@/types/product";
import Link from "next/link";

export default async function CustomShopPage() {
  const products = await getProductsByTag("blanks");

  return (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        fontFamily: "monospace",
      }}>
      {products.map((product: Product) => (
        <div
          key={product.id}
          style={{border: "2px solid black", padding: "1rem"}}>
          {product.image ? (
            <img
              src={product.image.url}
              alt={product.image.altText || product.title}
              style={{width: "100%", height: "auto", marginBottom: "1rem"}}
            />
          ) : (
            <div style={{height: "300px", background: "#ccc"}} />
          )}
          <h2>{product.title}</h2>
          <p>{product.price}</p>
          <Link href={`/products/${product.handle}`}>Customize →</Link>
        </div>
      ))}
    </div>
  );
}
