import {getProductByHandle} from "@/lib/shopify";

export default async function PutterPage(props: {params: {handle: string}}) {
  const {handle} = await props.params; // ✅ Await the whole `params` object

  const product = await getProductByHandle(handle);

  if (!product) {
    return <div style={{padding: "2rem"}}>Product not found.</div>;
  }

  return (
    <div style={{padding: "2rem", fontFamily: "monospace"}}>
      <h1>{product.title}</h1>
      {product.image ? (
        <img
          src={
            typeof product.image === "string"
              ? product.image
              : product.image?.url || ""
          }
          alt={product.title}
          style={{width: "100%", maxWidth: "600px", marginBottom: "1rem"}}
        />
      ) : (
        <div style={{height: "300px", background: "#ccc"}} />
      )}
      <p>{product.price}</p>
      <p>[Customization form goes here]</p>
    </div>
  );
}
// Note: The customization form is a placeholder.
