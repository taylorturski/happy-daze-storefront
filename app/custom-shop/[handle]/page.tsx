import {getAllProducts} from "@/lib/shopify";

type Product = {
  id: string;
  title: string;
  handle: string;
  price: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
};

interface ProductPageProps {
  params: {handle: string};
}

export default async function ProductPage({params}: ProductPageProps) {
  // Fetch all products (this will run on the server)
  const allProducts = await getAllProducts();

  // Find the specific product by handle
  const product = allProducts.find(
    (prod: Product) => prod.handle === params.handle
  );

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img
        src={product.image?.url || ""}
        alt={product.image?.altText || product.title}
        style={{width: "100%", height: "auto"}}
      />
      <p>{product.price}</p>
      {/* Add more details like description, customization options, etc. */}
    </div>
  );
}
