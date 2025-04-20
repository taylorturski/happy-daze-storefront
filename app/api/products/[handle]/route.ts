import {NextRequest, NextResponse} from "next/server";
import {getProductByHandle} from "@/lib/shopify/product";

// Must use this exact shape
export async function GET(
  req: NextRequest,
  {params}: {params: {handle: string}}
) {
  const {handle} = params;
  const product = await getProductByHandle(handle);

  return NextResponse.json(product);
}
