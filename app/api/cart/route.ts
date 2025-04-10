import {NextResponse} from "next/server";
import {Product} from "@/types/product";

export const addToCart = (product: Product) => {
  let cart: Product[] = [];
  cart.push(product);
  return cart;
};

export async function POST(req: Request) {
  const product: Product = await req.json();
  const updatedCart = addToCart(product);
  return NextResponse.json(updatedCart);
}
