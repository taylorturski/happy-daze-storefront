export const runtime = "edge";

import {NextResponse} from "next/server";
import {getProductByHandle} from "@/lib/shopify/product";

const cacheHeaders = {
  "Cache-Control": "public, s-maxage=600, stale-while-revalidate=30",
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const handle = url.pathname.split("/").pop();
  if (!handle) {
    return NextResponse.json(
      {error: "Missing handle"},
      {status: 400, headers: cacheHeaders}
    );
  }

  try {
    const product = await getProductByHandle(handle);
    return NextResponse.json(product, {status: 200, headers: cacheHeaders});
  } catch {
    return NextResponse.json(
      {error: "Failed to fetch product"},
      {status: 500, headers: cacheHeaders}
    );
  }
}
