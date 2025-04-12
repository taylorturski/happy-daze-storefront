import {NextResponse} from "next/server";
import {getProductByHandle} from "@/lib/shopify";

export async function GET(
  _req: Request,
  context: Promise<{params: {handle: string}}>
) {
  const {params} = await context;
  const {handle} = params;

  const product = await getProductByHandle(handle);
  return NextResponse.json(product);
}
