import {NextRequest, NextResponse} from "next/server";
import {getProductByHandle} from "@/lib/shopify/product";

export async function GET(
  req: NextRequest,
  context: {params: {handle: string}}
) {
  const {handle} = context.params;
  const product = await getProductByHandle(handle);

  return NextResponse.json(product);
}
