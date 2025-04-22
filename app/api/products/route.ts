export const runtime = "edge";

import {NextResponse} from "next/server";
import {getAllProducts} from "@/lib/shopify/product";

const cacheHeaders = {
  "Cache-Control": "public, s-maxage=600, stale-while-revalidate=30",
};

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products, {status: 200, headers: cacheHeaders});
}
