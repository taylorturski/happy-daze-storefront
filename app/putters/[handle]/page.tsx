import {getProductByHandle} from "@/lib/shopify";
import {notFound} from "next/navigation";

export default async function PutterPage({params}: {params: {handle: string}}) {
  const product = await getProductByHandle(params.handle);

  if (!product) return notFound();

  return (
    <main style={{padding: "2rem", fontFamily: "monospace"}}>
      <h1>{product.title}</h1>
      <img
        src={
          typeof product.image === "string"
            ? product.image
            : product.image?.url || ""
        }
        alt={product.title}
        style={{
          width: "100%",
          maxWidth: 500,
          height: "auto",
          marginBottom: "1rem",
        }}
      />
      <p>{product.price}</p>
      <p style={{marginTop: "2rem"}}>Customization options coming soon.</p>
    </main>
  );
}
