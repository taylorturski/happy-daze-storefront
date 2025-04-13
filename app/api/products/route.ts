import {NextResponse} from "next/server";
import {getAllProducts} from "@/lib/shopify/product";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products);
}
