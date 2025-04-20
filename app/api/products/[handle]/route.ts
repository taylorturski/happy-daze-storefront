import {NextResponse} from "next/server";
import {getProductByHandle} from "@/lib/shopify/product";

interface Context {
  params: {
    handle: string;
  };
}

export async function GET(_: Request, context: Context) {
  const {handle} = context.params;
  const product = await getProductByHandle(handle);
  return NextResponse.json(product);
}
