import {NextResponse} from "next/server";
import {getAllProducts} from "@/lib/shopify";

export async function GET() {
  console.log("/api/products route hit");

  const products = await getAllProducts();

  console.log("Products:", products.length);

  return NextResponse.json(products);
}
