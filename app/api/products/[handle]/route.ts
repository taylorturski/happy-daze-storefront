import {NextRequest, NextResponse} from "next/server";
import {getProductByHandle} from "@/lib/shopify/product";

export async function GET(req: NextRequest) {
  const handle = req.nextUrl.pathname.split("/").pop();

  if (!handle) {
    return NextResponse.json({error: "Missing handle"}, {status: 400});
  }

  try {
    const product = await getProductByHandle(handle);
    return NextResponse.json(product, {status: 200});
  } catch (error) {
    console.error("Error fetching product by handle:", error);
    return NextResponse.json({error: "Failed to fetch product"}, {status: 500});
  }
}
