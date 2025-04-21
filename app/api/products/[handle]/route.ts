import {NextResponse} from "next/server";
import {getProductByHandle} from "@/lib/shopify/product";

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const handle = searchParams.get("handle");
  if (!handle) {
    return NextResponse.json({error: "Handle is required"}, {status: 400});
  }
  const product = await getProductByHandle(handle);
  return NextResponse.json(product);
}
